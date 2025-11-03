import { createChecklistManager } from "../../forms/newTodoForm/createFormChecklistManager";

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

    describe('returned public methods', () => {
        let checklistManager;
        beforeEach(() => {
            checklistManager = createChecklistManager(validChecklistNode, validTemplate);
        });

        describe('addInputField', () => {
            test('created child has expected markdown structure', () => {
                const result = checklistManager.addInputField();

                expect(result.querySelector('label')).toBeTruthy();
                expect(result.querySelector('input')).toBeTruthy();
                expect(result.querySelector('button')).toBeTruthy();
            });

            test.each([
                {description: 'one child', children: 1},
                {description: '5 children', children: 5},
                {description: '25 children', children: 25},
            ])('appends $description to parent container', ({description, children}) => {
                expect(validChecklistNode.children).toHaveLength(0);

                for (let i = 0; i < children; ++i) {
                    checklistManager.addInputField();
                }

                expect(validChecklistNode.children).toHaveLength(children);
            });

            test.each([
                {description: 'one child', children: 1},
                {description: '5 children', children: 5},
                {description: '10 children', children: 10},
            ])('children properties have expected values when $description is appended', ({description, children}) => {
                for (let i = 0; i < children; ++i) {
                    checklistManager.addInputField();
                }

                let counter = 1;
                for(const child of validChecklistNode.children) {
                    const propertyValue = `step${counter}`;
                    const text = `Step ${counter}`;

                    const label = child.querySelector('label');
                    const input = child.querySelector('input');

                    expect(label.htmlFor).toMatch(propertyValue);
                    expect(label.textContent).toMatch(text);

                    expect(input.name).toMatch(propertyValue);
                    expect(input.id).toMatch(propertyValue);

                    ++counter;
                }
            });
        });

        describe('deleteInputField', () => {
            describe('when passed invalid input', () => {
                test.each([
                    {description: 'array', input: []},
                    {description: 'object', input: {}},
                    {description: 'string', input: 'Hello, world!'},
                    {description: 'number', input: 123},
                ])('throws TypeError when passed $description parameter', ({description, input}) => {
                    expect(() => checklistManager.deleteInputField(input)).toThrow(TypeError);
                });

                describe('when passed an element that is not a child of checklist contaianer', () => {
                    test.each([
                        {description: 'div', input: document.createElement('div')},
                        {description: 'input', input: document.createElement('input')},
                        {description: 'section', input: document.createElement('section')},
                    ])('throws Error when passed $description input', ({description, input}) => {
                        expect(() => checklistManager.deleteInputField(input)).toThrow(Error);
                    });
                });

                describe('when passed an element that is a sibling of checklist container', () => {
                    test.each([
                        {description: 'div', toAppend: document.createElement('div')},
                        {description: 'input', toAppend: document.createElement('input')},
                        {description: 'section', toAppend: document.createElement('section')},
                    ])('throws Error when $description sibling is passed', ({description, toAppend}) => {
                        validTemplate.appendChild(toAppend);

                        expect(() => checklistManager.deleteInputField(toAppend)).toThrow(Error);
                    });
                });

                describe('when passed a child element that does not contain an input element', () => {
                    test.each([
                        {description: 'div', toAppend: document.createElement('div')},
                        {description: 'section', toAppend: document.createElement('section')},
                        {description: 'article', toAppend: document.createElement('article')},
                    ])('throws Error for $description without input',({description, toAppend}) => {
                        validChecklistNode.appendChild(toAppend);

                        expect(() => checklistManager.deleteInputField(toAppend)).toThrow(Error);
                    });
                });
            });

            describe('when passed valid input', () => {
                test.each([
                    {description: '1 container', containersToAppend: 1},
                    {description: '5 containers', containersToAppend: 5},
                    {description: '50 containers', containersToAppend: 50},
                ])('deletes the selected $description', ({description, containersToAppend}) => {
                    for (let i = 0; i < containersToAppend; ++i) {
                        checklistManager.addInputField();
                    }
                    
                    expect(validChecklistNode.children).toHaveLength(containersToAppend);

                    // Convert the HTML COllection to an array because using a 
                    // for... of loop while deleting the nodes will terminate the loop halfway
                    const childrenArray = Array.from(validChecklistNode.children);
                    childrenArray.forEach((child) => checklistManager.deleteInputField(child));

                    expect(validChecklistNode.children).toHaveLength(0);
                });

                test.each([
                    {description: 'first container', selectedCntnr: 1, totalCntnrs: 2},
                    {description: 'third container', selectedCntnr: 3, totalCntnrs: 5},
                    {description: 'tenth container', selectedCntnr: 10, totalCntnrs: 35},
                ])('deletes the $description when selected', ({description, selectedCntnr, totalCntnrs}) => {
                    for (let i = 0; i < totalCntnrs; ++i) {
                        checklistManager.addInputField();
                    }
                    expect(validChecklistNode.children).toHaveLength(totalCntnrs);

                    // subtract 1 to match zero-indexing of array
                    const selectedChild = validChecklistNode.children[selectedCntnr - 1];
                    checklistManager.deleteInputField(selectedChild);

                    expect(validChecklistNode.children).toHaveLength(totalCntnrs - 1);

                    // Check to make sure the selected child is not part of the parent container
                    // I do this by comparing the text content of the labels, as they consist of
                    // 'step' + a number
                    const selectedLabel = selectedChild.querySelector('label');
                    for (const child of validChecklistNode.children) {
                        const label = child.querySelector('label');

                        expect(label.textContent).not.toBe(selectedLabel.textContent);
                    }
                });
            });
        });

        describe('deleteAllInputFields', () => {
            test.each([
                {description: '1 container', totalCntnrs: 1},
                {description: '5 containers', totalCntnrs: 5},
                {description: '20 containers', totalCntnrs: 20},
                {description: '100 containers', totalCntnrs: 100},
            ])('deletes all $description when called', ({description, totalCntnrs}) => {
                for (let i = 0; i < totalCntnrs; ++i) {
                    checklistManager.addInputField();
                }

                expect(validChecklistNode.children).toHaveLength(totalCntnrs);
                checklistManager.deleteAllInputFields();
                expect(validChecklistNode.children).toHaveLength(0);
            });
        });

        describe('renumberInputFields', () => {
            const numOfChildren = 10;
            beforeEach(() => {
                for (let i = 0; i < numOfChildren; ++i) {
                    checklistManager.addInputField();
                }
            });

            test.each([
                {description: 'first container', indexToDelete: 0},
                {description: 'third container', indexToDelete: 2},
                {description: 'eighth container', indexToDelete: 8},
            ])('renumbers to ascending, consecutive order after the $description is deleted', ({description, indexToDelete}) => {
                const childToDelete = validChecklistNode.children[indexToDelete];
                checklistManager.deleteInputField(childToDelete);

                const checklistChildren = validChecklistNode.children;

                const successorNodeText = checklistChildren[indexToDelete].querySelector('label').textContent;
                const deletedNodeText = childToDelete.textContent;

                expect(successorNodeText).not.toBe(deletedNodeText);
                expect(checklistChildren).toHaveLength(numOfChildren - 1);

                checklistManager.renumberInputFields();

                let stepCounter = 1;
                for (const child of checklistChildren) {
                    const expectedText = `Step ${stepCounter}`;
                    const childText = child.querySelector('label').textContent;

                    expect(childText).toBe(expectedText);
                    ++stepCounter;
                }
            });
        });
    });
});