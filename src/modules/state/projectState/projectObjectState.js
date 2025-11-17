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
    });
}

function loadProjectsFromLocalStorage() {
    const projectsArray = getAllPrefixedItems(Project.ID_PREFIX);
    projectsArray.forEach(jsonProj => {
        const project = createProjectFromLocalStorage(jsonProj);
        PROJECT_OBJECT_MANAGER.addProject(project.id, project);
    });

    return PROJECT_OBJECT_MANAGER.getAllProjects();
}