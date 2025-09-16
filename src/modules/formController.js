export class formControl {
    static #classInvoked = false;
    static #formNode = document.getElementById('new-todo-form');
    static #dialog = document.querySelector('dialog');
    static #checkListContainer = document.getElementById('checklist-container');
    static #cancelBtn = document.getElementById('form-control-btns').lastElementChild;

    static #processSubmit(event) {
        const formData = new FormData(event.target);
        const formSubmitted = new CustomEvent('todoSubmitted', { detail: {formData} });
        document.dispatchEvent(formSubmitted);
    }

    static #eventDelegator() {
        formControl.#cancelBtn.addEventListener('click', () => formControl.#dialog.close())
        formControl.#formNode.addEventListener('submit', (event) => {
            event.preventDefault();
            formControl.#processSubmit(event);
            formControl.#formNode.reset();
            formControl.#dialog.close();
        })
    }

    static initializeEventListeners() {
        if (formControl.#classInvoked) {
            console.error('formControl class already invoked');
            return;
        }

        formControl.#classInvoked = true;
        formControl.#eventDelegator();
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