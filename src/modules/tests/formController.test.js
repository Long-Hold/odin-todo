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
        })
    })
})