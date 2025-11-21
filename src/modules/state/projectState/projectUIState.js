import { triggerCustomEvent } from "../../events/eventProducer";
import { EVENTS } from "../../events/events";
import { PROJECT_OBJECT_MANAGER } from "../../objects/projects/projectObjectManager";
import { initializeProjectTabListeners, PROJECTS_LIST, renderProjectTabs } from "../../ui/projects/projectsTabHandler";

export function initializeProjectUIState() {
    listenForNewProjects();
    initializeProjectTabListeners();
    listenForProjectTabFiltering();
}

function listenForNewProjects() {
    document.addEventListener(EVENTS.PROJECT_CREATED, (event) => { renderProjectTabs(event.detail.data); });
}

function listenForProjectTabFiltering() {
    PROJECTS_LIST.addEventListener(EVENTS.PROJECT_TAB_CLICKED, (event) => {
        const projectId = event.detail.data;
        const projectObject = PROJECT_OBJECT_MANAGER.getProject(projectId);
        const todoIdsArray = Array.from(projectObject.linkedIds);
        triggerCustomEvent(document, EVENTS.TODO_FILTER_REQUESTED, todoIdsArray);
    });
}