import { triggerCustomEvent } from "../../events/eventProducer";
import { EVENTS } from "../../events/events";
import { getFilterState, resetFilterStateToDefault } from "../../state/filterState/filterStateController";

const PROJECT_TAB_TEMPLATE = document.getElementById('project-tab-template');
export const PROJECTS_LIST = document.getElementById('projects-list');

export function initializeProjectTabListeners() {
    PROJECTS_LIST.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON') { return null; }

        const buttonAction = event.target.dataset.action;
        const projectId = event.target.dataset.projectId;

        if (buttonAction === 'delete') {
            /**If we are deleting the project we are currently filtering by,
             * then we need to reset the filterState() back to a default value,
             * otherwise it will try to filter the UI by a condition that no longer exists.
             */
            const {display} = getFilterState();
            if (display === projectId) { resetFilterStateToDefault(); }

            event.target.parentElement.remove();
            triggerCustomEvent(PROJECTS_LIST, EVENTS.PROJECT_DELETE_REQUESTED, projectId);
        }
    });
}

export function renderProjectTabs(projectsArray) {
    PROJECTS_LIST.replaceChildren();

    // Sorts projects by name, in alphabetical order
    const sortedProjects = [...projectsArray].sort((a, b) => a.name.localeCompare(b.name));
    sortedProjects.forEach((project) => {
        const clonedTemplate = PROJECT_TAB_TEMPLATE.content.cloneNode(true);
        const tabButton = clonedTemplate.querySelector('.project-btn');
        const deleteButton = clonedTemplate.querySelector('.delete-project-btn');

        tabButton.dataset.projectId = project.id;
        tabButton.textContent = project.name;
        deleteButton.dataset.projectId = project.id;

        PROJECTS_LIST.appendChild(clonedTemplate);
    });
}