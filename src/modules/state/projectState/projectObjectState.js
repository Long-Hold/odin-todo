import { triggerCustomEvent } from "../../events/eventProducer";
import { EVENTS } from "../../events/events";
import { PROJECT_FORM } from "../../forms/projectForm/projectFormController";
import { Project } from "../../objects/projects/projectClass";
import { createProjectFromFormData, createProjectFromLocalStorage } from "../../objects/projects/projectObjectController";
import { PROJECT_OBJECT_MANAGER } from "../../objects/projects/projectObjectManager";
import { getAllPrefixedItems } from "../../storage/localStorageUtils";
import { PROJECTS_LIST } from "../../ui/projects/projectsTabHandler";

export function initializeProjectObjectState() {
    loadProjectsFromLocalStorage();
    listenForProjectSubmitEvent();
    listenForProjectLinkEvents();
    listenForProjectDeleteRequestEvent();
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

function listenForProjectSubmitEvent() {
    PROJECT_FORM.addEventListener(EVENTS.PROJECT_FORM_SUBMITTED, (event) => {
        const projectObj = createProjectFromFormData(event.detail.data);
        PROJECT_OBJECT_MANAGER.addProject(projectObj.id, projectObj);
        triggerCustomEvent(document, EVENTS.PROJECT_CREATED, PROJECT_OBJECT_MANAGER.getAllProjects());
    });
}

function listenForProjectLinkEvents() {
    document.addEventListener(EVENTS.PROJECT_ASSIGNED, (event) => {
        const {projectId, todoId} = event.detail.data;
        const project = PROJECT_OBJECT_MANAGER.getProject(projectId);

        /**After modifying the object, I add it back to it's respective object manager
         * to synch the changes in both memory and localStorage, since the object manager
         * will save added items to localStorage, and overwrite existing data with the same key.
         */
        project.addLinkedId(todoId);
        PROJECT_OBJECT_MANAGER.addProject(projectId, project);
    });
}

function listenForProjectDeleteRequestEvent() {
    PROJECTS_LIST.addEventListener(EVENTS.PROJECT_DELETE_REQUESTED, (event) => {
        const projectId = event.detail.data;
        const projectObject = PROJECT_OBJECT_MANAGER.getProject(projectId);
        const linkedTodos = Array.from(projectObject.linkedIds);

        PROJECT_OBJECT_MANAGER.deleteProject(projectId);
        if (linkedTodos.length === 0) {
            return null;
        }
        triggerCustomEvent(document, EVENTS.PROJECT_DELETED, linkedTodos);
    });
}

export function broadcastProjects() {
    triggerCustomEvent(document, EVENTS.PROJECT_CREATED, PROJECT_OBJECT_MANAGER.getAllProjects());
}