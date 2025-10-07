import { experiments } from "webpack";
import { objectifySubmission, bundleKeys } from "../formController";

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
        let formObj = {};
        beforeEach(() =>{
            formObj.title = 'some title';
            formObj.priority = 'low';
            formObj.step1 = 'lorem ipsum';
            formObj.step2 = 'banana and apple';
            formObj.step3 = 'cinco de mayo';
        });

        test('returns an object', () => {
            const result = bundleKeys(formObj, 'step', 'steps');

            expect(result).toBeInstanceOf(Object);
        });
    });
});