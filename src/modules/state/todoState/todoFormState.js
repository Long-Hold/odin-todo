import { EVENTS } from "../../events/events";
const PROJECTS_DROPDOWN_MENU = document.getElementById('projects-dropdown');

export function initializeTodoFormState() {
    document.addEventListener(EVENTS.PROJECT_CREATED, (event) => {
        const projectsArray = event.detail.data;
        updateProjectOptions(projectsArray);
    })
}

// TODO: Move this function into the forms UI module for the todo form
function updateProjectOptions(projectsArray) {
    projectsArray.forEach(project => {
        const option = document.createElement('option');
        option.value = project.id;
        option.textContent = project.name;
        PROJECTS_DROPDOWN_MENU.appendChild(option);
    });

    return PROJECTS_DROPDOWN_MENU;
}