import { displayNewCardNode, renderAllCards } from "../renderCards";

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

        test('throws Error when passed node missing required class', () => {
            const div = document.createElement('div');
            expect(() => displayNewCardNode(div)).toThrow(Error);
        });
    });

    describe('when passed valid input', () => {
        test.each([
            {description: 'appends single child element', input: 1},
            {description: 'appends 3 child elements', input: 3},
            {description: 'appends an unknown number of child elements', input: Math.floor(Math.random() * 100) + 1},
        ])('function $description', ({description, input}) => {
            let result;

            for (let i = 0; i < input; ++i) {
                const simulatedCard = document.createElement('article');
                simulatedCard.className = 'todo-card';
                result = displayNewCardNode(simulatedCard);
            }

            expect(result.children.length).toBe(input);
        });
    });
});

describe('renderAllCards', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <section class="display-box">
            </section>
        `;
    });
});