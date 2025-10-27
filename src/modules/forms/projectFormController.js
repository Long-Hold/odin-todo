import { EVENTS } from "../events/events";
import { triggerCustomEvent } from "../events/eventProducer";
import { objectifySubmission, removeEmptyFields } from "./formUtils";

const ADD_PROJECT_BTN = document.getElementById('add-project-btn');
const NEW_PROJECT_DIALOG = document.getElementById('new-project-dialog');
const NEW_PROJECT_FORM = document.getElementById('new-project-form');

export function initializeProjectFormControl() {
    initializeAddProjectBtnListener();
    initializeFormListeners();
}

function initializeAddProjectBtnListener() {
    ADD_PROJECT_BTN.addEventListener('click', () => { NEW_PROJECT_DIALOG.show(); });
}

function initializeFormListeners() {
    NEW_PROJECT_FORM.addEventListener('click', (event) => {
        if (event.target.dataset.action === 'cancel') {
            resetAndClose();
        }
    })

    NEW_PROJECT_FORM.addEventListener('submit', (event) => {
        event.preventDefault();

        let formData;
        try {
            formData = removeEmptyFields(new FormData(event.target));
        } catch (error) {
            console.error(`${removeEmptyFields.name} has encountered an Error: ${error}`);
            resetAndClose();
            return null;
        }
        if (formData.entries().next().done) {
            console.error('Cannot submit blank project');
            resetAndClose();
            return null;
        }

        let formObject;
        try {
            formObject = objectifySubmission(new FormData(event.target));
        } catch (error) {
            console.log(`${objectifySubmission.name} has encountered an Error: ${error}`);
            resetAndClose();
            return null;
        }

        triggerCustomEvent(NEW_PROJECT_FORM, EVENTS.PROJECT_SUBMITTED, formObject);
        resetAndClose();
    })
}

function resetAndClose() {
    NEW_PROJECT_FORM.reset();
    NEW_PROJECT_DIALOG.close();
}