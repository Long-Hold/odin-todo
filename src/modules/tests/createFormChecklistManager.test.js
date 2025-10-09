import { createChecklistManager } from "../createFormChecklistManager";

describe('createChecklistManager', () => {
    let validChecklistNode;
    let validTemplate;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="checklist-container">
                <!-- User can add checkboxes with a brief desc -->
                <!-- Eachtime they click the button -->
                    <span>Checklist (Optional):</span>

                    <!-- Dynamically populate with input fields representing checklist steps -->
                    <section id="input-steps-container"></section>
                <button type="button" id="add-step">Add Step</button>
            </div>
            
            <template id="checklist-step-input">
                <!-- Template for an input field that is added to the form when the user -->
                <!-- wants to add checklist steps. -->
                <!-- The '#' are replaced with the respective step number -->
                <div>
                    <label for="step#">Step #:
                    </label>
                    <input type="text" name="step#" id="step#" maxlength="64">
                    <button type="button" data-action="delete">X</button>
                </div>
            </template>
        `;

        validChecklistNode = document.getElementById('input-steps-container');
        validTemplate = document.getElementById('checklist-step-input');
    });

    describe('when passed invalid parameters', () => {
        describe('to checklistNode parameter', () => {
            test.each([
                {description: 'number', input: 1},
                {description: 'string', input: 'Hello, world!'},
                {description: 'array', input: []},
                {description: 'object', input: {}},
            ])('throws TypeError for $description input', ({description, input}) => {
                expect(() => createChecklistManager(input, validTemplate)).toThrow(TypeError);
            });
        });

        describe('to template parameter', () => {
            test.each([
                {description: 'div element', input: document.createElement('div')},
                {description: 'checklist node', input: validChecklistNode},
                {description: 'number', input: 12},
                {description: 'string', input: 'Hello, world'},
                {description: 'array', input: []},
                {description: 'object', input: {}},
            ])('throws TypeError when passed $description input', ({description, input}) => {
                expect(() => createChecklistManager(validChecklistNode, input)).toThrow(TypeError);
            });
        });
    });

    describe('when passed valid input', () => {
        test('returns an object', () => {
            const result = createChecklistManager(validChecklistNode, validTemplate);
            expect(typeof(result)).toBe('object');
            expect(result).not.toBeNull();
        });
    });
});