export class FormControl {
    static #classInvoked = false;
    static #formNode = document.getElementById('new-todo-form');
    static #dialog = document.querySelector('dialog');
    static #checkListContainer = document.getElementById('checklist-container');

    static #processSubmit(event) {
        /**This method takes a submit event, creates a formData object,
         * parses it, and repacks it.
         * 
         * If the user adds checklist steps to their Todo task,
         * we parse the formData and bundle the steps into their own object.
         * 
         * This "checklist" object is then added as a property to the proccessed data.
         */
        const formData = new FormData(event.target);

        const data = {};
        const steps = {};

        for (const [key, value] of formData.entries()) {
            if (key.startsWith('step') && value.trim()) {
                steps[key] = value;
            }

            else if (value.trim()) {
                data[key] = value;
            }
        }

        if (Object.keys(steps).length > 0) {
            data.steps = {...steps};
        }
        const formSubmitted = new CustomEvent('todoSubmitted', { detail: {data} });
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

    static #deleteChecklistStep(selectedContainer) {
        selectedContainer.parentElement.remove();
    }

    static #renumberChecklistSteps() {
        const stepsContainer = FormControl.#checkListContainer.querySelector('section');
        const childNodes = stepsContainer.children;
        let stepCounter = 1;

        for (const node of childNodes) {
            const stepLabel = node.children[0];
            const stepInput = node.children[1];

            stepLabel.htmlFor = `step${stepCounter}`;
            stepLabel.textContent = `Step ${stepCounter}: `;

            stepInput.setAttribute('name', `step${stepCounter}`);
            stepInput.id = `step${stepCounter}`;

            ++stepCounter;
        };
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

            if (event.target.dataset.action === 'delete') {
                FormControl.#deleteChecklistStep(event.target);
                FormControl.#renumberChecklistSteps();
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