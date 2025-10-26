import { triggerCustomEvent } from "../events/eventProducer";
import { EVENTS } from "../events/events";

const NEW_PROJECT_BUTTON = document.getElementById('add-project-btn');
const NEW_PROJECT_DIALOG = document.getElementById('new-project-dialog');
const NEW_PROJECT_FORM = document.getElementById('new-project-form');

export function initializeNewProjectListeners() {
    showNewProjectForm();
}

function showNewProjectForm() {
    NEW_PROJECT_BUTTON.addEventListener('click', () => NEW_PROJECT_DIALOG.show());
}

function handleProjectFormSubmit() {
    NEW_PROJECT_FORM.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        triggerCustomEvent(NEW_PROJECT_FORM, EVENTS.PROJECT_SUBMITTED, formData);
        resetAndClose();
    })
}

function resetAndClose() {
    NEW_PROJECT_FORM.reset();
    NEW_PROJECT_DIALOG.close();
}