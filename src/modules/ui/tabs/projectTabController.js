import { triggerCustomEvent } from "../../events/eventProducer";
import { EVENTS } from "../../events/events";

export const PROJECTS_TAB_CONTAINER = document.getElementById('projects-tab-container');

export function initializeTabsListener() {
    PROJECTS_TAB_CONTAINER.addEventListener('click', (event) => {
        if (event.target.classList.contains('project-btn')) {
            const projectName = event.target.dataset.projectName;
            triggerCustomEvent(PROJECTS_TAB_CONTAINER, EVENTS.PROJECT_TABBED, projectName);
        }
    })
}