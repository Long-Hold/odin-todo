import { triggerCustomEvent } from "../../events/eventProducer";
import { EVENTS } from "../../events/events";
import { PROJECT_FORM } from "../../forms/projectForm/projectFormController";
import { Project } from "../../objects/projects/projectClass";
import { createProjectFromFormData, createProjectFromLocalStorage } from "../../objects/projects/projectObjectController";
import { PROJECT_OBJECT_MANAGER } from "../../objects/projects/projectObjectManager";
import { getAllPrefixedItems } from "../../storage/localStorageUtils";

export function initializeProjectObjectState() {
    loadProjectsFromLocalStorage();
    PROJECT_FORM.addEventListener(EVENTS.PROJECT_FORM_SUBMITTED, (event) => {
        const projectObj = createProjectFromFormData(event.detail.data);
        PROJECT_OBJECT_MANAGER.addProject(projectObj.id, projectObj);
        triggerCustomEvent(document, EVENTS.PROJECT_CREATED, PROJECT_OBJECT_MANAGER.getAllProjects());
    });
}

function loadProjectsFromLocalStorage() {
    const projectsArray = getAllPrefixedItems(Project.ID_PREFIX);
    if (projectsArray.length === 0) {
        console.log('No project objects to load from localStorage.');
        return null;
    }

    projectsArray.forEach(jsonProj => {
        const project = createProjectFromLocalStorage(jsonProj);
        PROJECT_OBJECT_MANAGER.addProject(project.id, project);
    });

    triggerCustomEvent(document, EVENTS.PROJECT_CREATED, PROJECT_OBJECT_MANAGER.getAllProjects());
    return PROJECT_OBJECT_MANAGER.getAllProjects();
}