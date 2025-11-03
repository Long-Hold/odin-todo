import { objectifySubmission, bundleKeys, removeEmptyFields, setMinDateToCurrentDate } from "../formUtils";
import { createChecklistManager } from "./createFormChecklistManager";
import { triggerCustomEvent } from "../../events/eventProducer";
import { EVENTS } from "../../events/events";
import { getAllProjectNames } from "../../projects/projectController";
import { createOptions } from "./projectsDropdownUtils";

const BUNDLE = {substring: 'step', key: 'steps'};

const DIALOG = document.getElementById('new-todo-dialog');
export const TODO_FORM = document.getElementById('new-todo-form');
const PROJECT_SELECT_ELEMENT = document.getElementById('projects');

const STEPS_CONTAINER = document.getElementById('input-steps-container');
const STEP_TEMPLATE = document.getElementById('checklist-step-template');
const CHECKLIST_MANAGER = createChecklistManager(STEPS_CONTAINER, STEP_TEMPLATE);

export function initializeTodoFormControl() {
    initializeNewTodoListener();
    initializeFormChecklistListeners();
    initializeSubmitListener();

    // Allow this to silently fail in the event the function throws an error
    // The application can still function as intended in the event this happens
    try {
        setMinDateToCurrentDate(TODO_FORM.querySelector('#deadline'));
    } catch(error) {
        console.error(`${setMinDateToCurrentDate.name} ${error}`);
    }
}

function processSubmit(event) {
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

function resetAndCloseForm() {
    CHECKLIST_MANAGER.deleteAllInputFields();
    TODO_FORM.reset();
    DIALOG.close();
}

function initializeNewTodoListener() {
    const newTodoBtn = document.getElementById('add-task');
    newTodoBtn.addEventListener('click', () => {
        /**Update the projects dropdown menu
         * everytime the dialog is opened
         */
        const projects = getAllProjectNames();
        createOptions(projects, PROJECT_SELECT_ELEMENT);
        DIALOG.show()
    });
}

function initializeFormChecklistListeners() {
    TODO_FORM.addEventListener('click', (event) => {
        const clickedBtn = event.target;
        if (clickedBtn.id === 'add-step') { CHECKLIST_MANAGER.addInputField(); }

        if (clickedBtn.type === 'reset') { CHECKLIST_MANAGER.deleteAllInputFields(); }

        if (clickedBtn.dataset.action === 'delete') {
            try {
                CHECKLIST_MANAGER.deleteInputField(clickedBtn.parentElement);
            } catch (error) {
                console.error(`${CHECKLIST_MANAGER.deleteInputField.name} has encountered an Error: ${error}`);
            } finally {
                CHECKLIST_MANAGER.renumberInputFields();
            }
        }

        if (clickedBtn.dataset.action === 'cancel') {
            resetAndCloseForm();
        }
    });
}

function initializeSubmitListener() {
    TODO_FORM.addEventListener('submit', (event) => {
        const formObject = processSubmit(event);
        if (formObject === null) {
            console.error('formObject returned with null. Aborting task creation.');
            resetAndCloseForm();
            return null;
        }

        triggerCustomEvent(TODO_FORM, EVENTS.FORM_SUBMITTED, formObject);
        resetAndCloseForm();
    })
}