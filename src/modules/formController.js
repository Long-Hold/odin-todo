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

// function addChecklistStep(containerNode, stepCounter) {
//         const inputField = document.createElement('input');
//         inputField.type = 'text';
//         inputField.name = `step${stepCounter}`;
//         inputField.maxLength = 64;

//         const label = document.createElement('label');
//         label.textContent = `Step ${stepCounter}: `;

//         label.appendChild(inputField);

//         const stepDivContainer = document.createElement('div');
//         stepDivContainer.appendChild(label);

//         containerNode.querySelector('section').appendChild(stepDivContainer);
// }

// export function formController() {
//     const headerbtn = document.getElementById('add-task');
//     const formNode = document.getElementById('new-todo-form');
//     const dialog = document.querySelector('dialog');
//     const checkListContainer = document.getElementById('checklist-container');
//     let stepCounter = 1;

//     headerbtn.addEventListener('click', () => {
//         checkListContainer.querySelector('section').innerHTML = '';
//         dialog.showModal()
//     });

//     checkListContainer.addEventListener('click', (event) => {
//         if (event.target.type === 'button') {
//             addChecklistStep(checkListContainer, stepCounter);
//             ++stepCounter;
//         }
//     })

//     formNode.addEventListener('submit', (event) => {
//         event.preventDefault();
//         stepCounter = 1;

//         const formData = new FormData(event.target);
//         formNode.reset();
//         dialog.close();

//         const formSubmitted = new CustomEvent('onSubmit', {
//             detail: { formData }
//         });

//         document.dispatchEvent(formSubmitted);
//     })
// }