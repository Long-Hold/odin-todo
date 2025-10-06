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
    })
})