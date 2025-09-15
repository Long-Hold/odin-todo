function addChecklistStep(containerNode, stepCounter) {
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.name = `step${stepCounter}`;
        inputField.maxLength = 64;

        const label = document.createElement('label');
        label.textContent = `Step ${stepCounter}: `;

        label.appendChild(inputField);

        const stepDivContainer = document.createElement('div');
        stepDivContainer.appendChild(label);

        containerNode.querySelector('section').appendChild(stepDivContainer);
}

export function formController() {
    const formNode = document.getElementById('new-task');
    const dialog = document.querySelector('dialog');
    const checkListContainer = document.getElementById('checklist-container');
    let stepCounter = 1;

    checkListContainer.addEventListener('click', (event) => {
        if (event.target.type === 'button') {
            addChecklistStep(checkListContainer, stepCounter);
            ++stepCounter;
        }
    })

    return new Promise((resolve) => {
        formNode.addEventListener('submit', (event) => {
            event.preventDefault();
            stepCounter = 1;
            dialog.close();

            const formData = new FormData(event.target);
            resolve(formData);
        })
    })
}