import { triggerCustomEvent } from "../../events/eventProducer";
import { EVENTS } from "../../events/events";

const PROJECT_TAB_TEMPLATE = document.getElementById('project-tab-template');
export const PROJECTS_LIST = document.getElementById('projects-list');
/**TODO:
 * - Listen for project tab button clicks, and emit an event to trigger filtering logic
 */
export function initializeProjectTabListeners() {
    PROJECTS_LIST.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON') { return null; }

        const buttonAction = event.target.dataset.action;
        const projectId = event.target.dataset.projectId;

        if (buttonAction === 'delete') {
            event.target.parentElement.remove();
            triggerCustomEvent(PROJECTS_LIST, EVENTS.PROJECT_DELETE_REQUESTED, projectId);
        }

        if (buttonAction === "filter") {
            //TODO
        }
    });
}

export function renderProjectTabs(projectsArray) {
    PROJECTS_LIST.replaceChildren();
    projectsArray.forEach((project) => {
        const clonedTemplate = PROJECT_TAB_TEMPLATE.content.cloneNode(true);
        const tabButton = clonedTemplate.querySelector('.project-btn');
        const deleteButton = clonedTemplate.querySelector('.delete-project-btn');

        tabButton.dataset.projectId = project.id;
        tabButton.textContent = project.name;
        deleteButton.dataset.projectId = project.id;

        PROJECTS_LIST.appendChild(clonedTemplate);
    });
}