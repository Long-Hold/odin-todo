import { experiments } from "webpack";
import { objectifySubmission, bundleKeys } from "../formController";

// jest.setup.js
global.structuredClone = global.structuredClone || ((obj) => {
  return JSON.parse(JSON.stringify(obj));
});

describe('objectifySubmission', () => {
    describe('when passed non FormData parameter', () => {
        test.each([
            {description: 'number', input: 142},
            {description: 'array', input: ['array', 'array two']},
            {description: 'object-literal', input: {date: 'today'}},
            {description: 'string', input: 'some string'},
        ])('throws TypeError for $description input', ({description, input}) => {
            expect(() => objectifySubmission(input)).toThrow(TypeError);
        })
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
    describe('when passed valid parameters', () => {
        let formObj;
        beforeEach(() =>{
            formObj = {};
            formObj.title = 'some title';
            formObj.priority = 'low';
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
    });
});