import { EVENTS } from "../../events/events";
import { PROJECT_OBJECT_MANAGER } from "../../objects/projects/projectObjectManager";
import { initializeProjectTabListeners, renderProjectTabs } from "../../ui/projects/projectsTabHandler";

export function initializeProjectUIState() {
    listenForDisplayUpdates();
    initializeProjectTabListeners();
}

function listenForDisplayUpdates() {
    document.addEventListener(EVENTS.UPDATE_DISPLAY, () => {
        renderProjectTabs(PROJECT_OBJECT_MANAGER.getAllProjects());
    });
}