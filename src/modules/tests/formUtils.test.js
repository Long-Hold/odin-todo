import { objectifySubmission, bundleKeys, removeEmptyFields } from "../forms/formUtils";

// jest.setup.js
global.structuredClone = global.structuredClone || ((obj) => {
  return JSON.parse(JSON.stringify(obj));
});

describe('objectifySubmission', () => {
    describe('when passed invalid parameters', () => {
        test.each([
            {description: 'Number() constructor', input: new Number()},
            {description: 'number', input: 0},
            {description: 'String constructor', input: new String()},
            {description: 'string', input: 'Hello, world!'},
            {description: 'Array() constructor', input: new Array()},
            {description: 'array', input: []},
            {description: 'Object() constructor', input: new Object()},
            {description: 'object literal', input: {}},
        ])('throws TypeError when passed $description as parameter', ({description, input}) => {
            expect(() => objectifySubmission(input)).toThrow(TypeError);
        });
    });

    describe('when passed a FormData object', () => {
        const formData = new FormData();

        // Add some typical form fields
        formData.append('username', 'testuser123');
        formData.append('email', 'test@example.com');
        formData.append('password', 'SecurePass123!');
        formData.append('age', '25');
        formData.append('country', 'United States');
        formData.append('subscribe', 'true');
        formData.append('bio', 'This is a test bio for form submission testing.');

        test.each([
            {description: 'empty FormData object', input: new FormData()},
            {description: 'populated formData object', input: formData}
        ])('returns an Object when given $description', ({description, input}) => {
            const result = objectifySubmission(input);

            expect(result).toBeInstanceOf(Object);
        });

        test('returned object retains all FormData fields', () => {
            const formObj = objectifySubmission(formData);
            for (const [key, value] of formData.entries()) {
                expect(formObj).toHaveProperty(key, value);
            }
        });

        test('returns object with correct number of keys', () => {
            const formObj = objectifySubmission(formData);
            const formLen = Array.from(formData.keys()).length;
            expect(Object.keys(formObj)).toHaveLength(formLen);
        });

        test('returns an empty object when passed empty FromData', () => {
            const formObj = objectifySubmission(new FormData());
            expect(formObj).toEqual({});
        });
    });
});

describe('bundleKeys', () => {
    describe('when passed invalid parameters', () => {
        test.each([
            {description: 'FormData Object', input: new FormData()},
            {description: 'String object constructor', input: new String()},
            {description: 'string', input: 'test string'},
            {description: 'Number object constructor', input: new Number()},
            {description: 'number', input: 0},
            {descrtiption: 'Array object constructor', input: new Array()},
            {description: 'array', input: []},
        ])('throws TypeError when passed $description as dataObject parameter', ({description, input}) => {
            expect(() => bundleKeys(input, 'test', 'tests')).toThrow(TypeError);
        });

        test.each([
            {description: 'number', input: 1},
            {description: 'array', input: []},
            {description: 'object', input: {}},
        ])('throws TypeError when substring and/or bundledKey receive $description', ({description, input}) => {
            // Invalid substring
            expect(() => bundleKeys({}, input, 'test')).toThrow(TypeError);

            // Invalid bunldedKey
            expect(() => bundleKeys({}, 'test', input)).toThrow(TypeError);

            // Invalid substring & bundledKey
            expect(() => bundleKeys({}, input, input)).toThrow(TypeError);
        });
    });

    describe('when passed valid parameters', () => {
        let formObj;
        let formObjLen;
        beforeEach(() =>{
            formObj = {};
            formObj.title = 'some title';
            formObj.priority = 'low';

            formObjLen = Object.keys(formObj).length;
        });

        test('returns an Object', () => {
            const result = bundleKeys(formObj, 'title', 'titles');
            expect(result).toBeInstanceOf(Object);
        });

        test.each([
            {description: 'step + steps parameters', input: ['step', 'steps']},
            {description: 'type + types parameters', input: ['type', 'types']},
            {description: 'knife + knives paramters', input: ['knife', 'knives']},
        ])('returns an object containing $description as fields', ({description, input})=> {
            const [subStr, bundleKey] = input;

            for (let i = 0; i < 3; ++i) {
                const keyName = `${subStr}${i}`
                formObj[keyName] = 'generic text';
            }

            const result = bundleKeys(formObj, subStr, bundleKey);
            const bundledKeys = {...result.bundleKey};

            expect(result).toHaveProperty(bundleKey);
            
            for (const key of Object.keys(bundledKeys)) {
                expect(key).toContain(subStr);
            }
        });

        test.each([
            {description: '1 empty field', emptyCount: 1},
            {description: '5 empty fields', emptyCount: 5},
            {description: 'Many empty fields', emptyCount: 100},
        ])('filters out $description from bundled result', ({description, emptyCount}) => {
            formObj.key0 = 'valid content';
            formObj.key1 = 'more content';
            formObj.key2 = 'you guessed it, more content';

            for (let i = 0; i < emptyCount; ++i) {
                formObj[`key${emptyCount + 3}`] = '     ';
            }

            const result = bundleKeys(formObj, 'key', 'keys');

            expect(Object.keys(result)).toHaveLength(formObjLen + 1);

            const bundledKeys = result.keys;
            expect(Object.keys(bundledKeys)).toHaveLength(3);

            for (const value of Object.values(bundledKeys)) {
                expect(value.trim()).not.toBe('');
            }
        })
    });
});

describe('removeEmptyFields', () => {
    describe('when passed a non FormData parameter', () => {
        test.each([
            {description: 'Object constructor', input: new Object()},
            {description: 'object', input: {}},
            {description: 'Array constructor', input: new Array()},
            {description: 'array', input: []},
            {description: 'String constructor', input: new String()},
            {description: 'string', input: 'Hello, world'},
            {description: 'Number constructor', input: new Number()},
            {description: 'number', input: 123},
            {description: 'whitespace', input: '    '},
            {description: 'empty string', input: ''},
        ])('throw TypeError when passed $description input', ({description, input}) => {
            expect(() => removeEmptyFields(input)).toThrow(TypeError);
        });
    });

    describe('when passed valid FormData parameter', () => {
        let formData;

        beforeEach(() => {
            formData = new FormData();
            formData.append('Title', 'Some title');
            formData.append('Priority', 'Urgent');
            formData.append('Empty Field', '');
            formData.append('Date', 'Today!');
            formData.append('Whitespace field', '    ');
        });

        test('returns FormData object without empty or whitespace only fields', () => {
            const cleanedFormData = removeEmptyFields(formData);

            for (const [key, value] of formData.entries()) {
                if (!value.trim()) {
                    expect(cleanedFormData.get(key)).toBe(null);
                }

                // Expect the retained keys in cleanedFormData to contain the original forms' value
                else {
                    expect(cleanedFormData.get(key)).not.toBe(null);
                    expect(cleanedFormData.get(key)).toBe(value);
                }
            }
        })
    });
});