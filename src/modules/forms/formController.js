import { objectifySubmission, bundleKeys, removeEmptyFields } from "./formUtils";
import { createChecklistManager } from "./createFormChecklistManager";

const BUNDLE = {substring: 'step', key: 'steps'};

const DIALOG = document.querySelector('dialog');
const TODO_FORM = document.getElementById('new-todo-form');

export function initializeFormControl() {
    initializeNewTodoListener();
    initializeFormChecklistListeners();
}

export function processSubmit(event) {
    event.preventDefault();

    let formData;
    try {
        formData = removeEmptyFields(new FormData(event.target));
    } catch (error) {
        console.error(`${removeEmptyFields.name} has encountered an Error: ${error}`);
        return null;
    }

    let formObject;
    try {
        formObject = objectifySubmission(formData);
    } catch (error) {
        console.error(`${objectifySubmission.name} has encountered an Error: ${error}`);
        return null;
    }

    if (Object.keys(formObject).some(key => key.startsWith('step'))) {
        try {
            formObject = bundleKeys(formObject, BUNDLE.substring, BUNDLE.key);
        } catch (error) {
            console.error(`${bundleKeys.name} has encountered an Error: ${error}`);
            return null;
        }
    }

    return formObject;
}

function initializeNewTodoListener() {
    const newTodoBtn = document.getElementById('add-task');
    newTodoBtn.addEventListener('click', () => DIALOG.show());
}

function initializeFormChecklistListeners() {
    const stepsContainer = TODO_FORM.querySelector('#input-steps-container');
    const stepTemplate = document.getElementById('checklist-step-template');
    const checklistManager = createChecklistManager(stepsContainer, stepTemplate);

    TODO_FORM.addEventListener('click', (event) => {
        const clickedBtn = event.target;
        if (clickedBtn.id === 'add-step') { checklistManager.addInputField(); }

        if (clickedBtn.type === 'reset') { checklistManager.deleteAllInputFields(); }

        if (clickedBtn.dataset.action === 'delete') {
            try {
                checklistManager.deleteInputField(clickedBtn.parentElement);
            } catch (error) {
                console.error(`${checklistManager.deleteInputField.name} has encountered an Error: ${error}`);
            } finally {
                checklistManager.renumberInputFields();
            }
        }

        if (clickedBtn.dataset.action === 'cancel') {
            checklistManager.deleteAllInputFields();
            TODO_FORM.reset();
            DIALOG.close();
        }
    });
}