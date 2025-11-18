import { EVENTS } from "../../events/events";
import { PROJECT_OBJECT_MANAGER } from "../../objects/projects/projectObjectManager";
import { renderProjectTabs } from "../../ui/projects/projectsTabRenderer";

export function initializeProjectUIState() {
    listenForNewProjects();
}

function listenForNewProjects() {
    document.addEventListener(EVENTS.PROJECT_CREATED, (event) => { renderProjectTabs(event.detail.data); });
}