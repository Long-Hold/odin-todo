export class FormControl {
    static #classInvoked = false;
    static #formNode = document.getElementById('new-todo-form');
    static #dialog = document.querySelector('dialog');
    static #checkListContainer = document.getElementById('checklist-container');

    static #processSubmit(event) {
        const formData = new FormData(event.target);
        const formSubmitted = new CustomEvent('todoSubmitted', { detail: {formData} });
        document.dispatchEvent(formSubmitted);
    }

    static #deleteAllChecklistSteps() {
        FormControl.#checkListContainer.querySelector('section').innerHTML = '';
    }

    static #resetAndClose() {
        FormControl.#deleteAllChecklistSteps();
        FormControl.#formNode.reset();
        FormControl.#dialog.close();
    }

    static #addChecklistStep() {
        const checkListInputTemplate = document.getElementById('checklist-step-input');
        const templateContent = checkListInputTemplate.content.cloneNode(true);

        const checkListStepsSection = FormControl.#checkListContainer.querySelector('section')
        const currentStep = checkListStepsSection.childElementCount + 1

        templateContent.querySelector('label').htmlFor = `step${currentStep}`;
        templateContent.querySelector('label').textContent = `Step ${currentStep}: `;

        templateContent.querySelector('input').setAttribute('name', `step${currentStep}`);
        templateContent.querySelector('input').id = `step${currentStep}`;

        checkListStepsSection.appendChild(templateContent);
    }

    static #eventDelegator() {
        FormControl.#formNode.addEventListener('submit', (event) => {
            event.preventDefault();
            FormControl.#processSubmit(event);
            FormControl.#resetAndClose();
        })

        FormControl.#formNode.addEventListener('click', (event) => {
            if (event.target.id === 'add-step') {
                FormControl.#addChecklistStep();
            }

            if (event.target.dataset.action === 'cancel') {
                FormControl.#resetAndClose();
            }

            // Reset button will not delete the checklist step fields, so we need to do it manually
            if (event.target.dataset.action === 'reset') {
                FormControl.#deleteAllChecklistSteps();
            }
        })
    }

    static initializeEventListeners() {
        if (FormControl.#classInvoked) {
            console.error('FormControl class already invoked');
            return;
        }

        FormControl.#classInvoked = true;
        FormControl.#eventDelegator();
    }
}
