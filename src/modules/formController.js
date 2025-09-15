const formManipulator = (function() {
    const todoStepsContainer = document.getElementById('checklist-container');
    let stepCounter = 1;

    todoStepsContainer.addEventListener('click', (event) => {
        if (event.target.type === 'button') {
            createChecklistNode();
        }
    })

    const createChecklistNode = () => {
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.name = `step${stepCounter}`;
        inputField.maxLength = 64;

        const label = document.createElement('label');
        label.textContent = `Step ${stepCounter}: `;

        label.appendChild(inputField);
        ++stepCounter;

        const stepDivContainer = document.createElement('div');
        stepDivContainer.appendChild(label);

        todoStepsContainer.querySelector('section').appendChild(stepDivContainer);
    }
})();

export function formController() {
    const formNode = document.getElementById('new-task');
    const dialog = document.querySelector('dialog');

    return new Promise((resolve) => {
        formNode.addEventListener('submit', (event) => {
            event.preventDefault();
            dialog.close();

            const formData = new FormData(event.target);
            resolve(formData);
        })
    })
}