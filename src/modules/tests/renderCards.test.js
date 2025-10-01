import { displayNewCardNode } from "../renderCards";

describe('displayNewCardNode', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <section class="display-box">
            </section>
        `;
    });

    describe('when passed invalid input', () => {
        test.each([
            {description: 'number', input: 1},
            {description: 'array', input: []},
            {description: 'object literal', input: {}},
            {description: 'empty string', input: ''},
            {description: 'whitespace string', input: '   '},
            {description: 'string', input: 'Hello, world'}
        ])('throws TypeError for $description input', ({description, input}) => {
            expect(() => displayNewCardNode(input)).toThrow(TypeError);
        });
    });
})