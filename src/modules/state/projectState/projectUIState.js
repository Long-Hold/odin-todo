import { EVENTS } from "../../events/events";
import { PROJECT_OBJECT_MANAGER } from "../../objects/projects/projectObjectManager";
import { appendNewProject, initializeProjectTabListeners, renderProjectTabs, updateTodoCounter } from "../../ui/projects/projectsTabHandler";

export function initializeProjectUIState() {
    listenForDisplayUpdates();
    initializeProjectTabListeners();
}

function listenForDisplayUpdates() {
    document.addEventListener(EVENTS.UPDATE_DISPLAY, () => {
        renderProjectTabs(PROJECT_OBJECT_MANAGER.getAllProjects());
    });

    document.addEventListener(EVENTS.PROJECT_CREATED, (event) => {
        const projectObj = event.detail.data;
        appendNewProject(projectObj);
    });

    document.addEventListener(EVENTS.PROJECT_SET_MUTATED, (event) => {
        const { projectId, setLength } = event.detail.data;
        updateTodoCounter(projectId, setLength);
    });
}