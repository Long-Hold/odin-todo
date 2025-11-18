import { EVENTS } from "../../events/events";
import { renderProjectTabs } from "../../ui/projects/projectsTabRenderer";

export function initializeProjectUIState() {
    listenForNewProjects();
}

function listenForNewProjects() {
    document.addEventListener(EVENTS.PROJECT_CREATED, (event) => { renderProjectTabs(event.detail.data); });
}