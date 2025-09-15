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
    const headerbtn = document.getElementById('add-task');
    const formNode = document.getElementById('new-task');
    const dialog = document.querySelector('dialog');
    const checkListContainer = document.getElementById('checklist-container');
    let stepCounter = 1;

    headerbtn.addEventListener('click', () => {
        checkListContainer.querySelector('section').innerHTML = '';
        dialog.showModal()
    });

    checkListContainer.addEventListener('click', (event) => {
        if (event.target.type === 'button') {
            addChecklistStep(checkListContainer, stepCounter);
            ++stepCounter;
        }
    })

    formNode.addEventListener('submit', (event) => {
        event.preventDefault();
        stepCounter = 1;

        const formData = new FormData(event.target);
        formNode.reset();
        dialog.close();

        const formSubmitted = new CustomEvent('onSubmit', {
            detail: { formData }
        });

        document.dispatchEvent(formSubmitted);
    })
}