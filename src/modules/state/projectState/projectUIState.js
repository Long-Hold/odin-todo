import { EVENTS } from "../../events/events";
import { initializeProjectTabListeners, renderProjectTabs } from "../../ui/projects/projectsTabHandler";

export function initializeProjectUIState() {
    listenForNewProjects();
    initializeProjectTabListeners();
}

function listenForNewProjects() {
    document.addEventListener(EVENTS.PROJECT_CREATED, (event) => { renderProjectTabs(event.detail.data); });
}