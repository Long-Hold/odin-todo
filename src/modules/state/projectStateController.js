import { Project } from "../projects/createProject";
import { PROJECT_MANAGER } from "../projects/projectController";
import { NEW_PROJECT_FORM } from "../forms/projectFormController";
import { EVENTS } from "../events/events";

export function initializeProjectState() {
    NEW_PROJECT_FORM.addEventListener(EVENTS.PROJECT_SUBMITTED, (event) => {
        handleNewProject(event.detail.data)
    });
}

function handleNewProject(formObject) {
    console.log(formObject);
}