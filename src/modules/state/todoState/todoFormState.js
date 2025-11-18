import { EVENTS } from "../../events/events";
import { renderProjectOptions } from "../../forms/todoForm/todoFormUIController";

export function initializeTodoFormState() {
    document.addEventListener(EVENTS.PROJECT_CREATED, (event) => {
        const projectsArray = event.detail.data;
        renderProjectOptions(projectsArray);
    });
}