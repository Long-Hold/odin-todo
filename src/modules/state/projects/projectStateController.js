import { PROJECT_MANAGER, createAndSaveProjectObject, storeJSONProjectObj } from "../../projects/projectController";
import { NEW_PROJECT_FORM } from "../../forms/newProjectForm/projectFormController";
import { EVENTS } from "../../events/events";
import { saveProject, getAllProjects } from "../../storage/projectStorageService";
import { renderProjectTabButton } from "../../ui/projects/projectsUIController";
import { PROJECTS_TAB_CONTAINER } from "../../ui/tabs/projectTabController";

export function initializeProjectState() {
    loadProjects();
    synchUIToState();
    
    NEW_PROJECT_FORM.addEventListener(EVENTS.PROJECT_SUBMITTED, (event) => {
        handleNewProject(event.detail.data)
    });

    PROJECTS_TAB_CONTAINER.addEventListener(EVENTS.PROJECT_TABBED, (event) => { filterTodosByProject(event); });
}

export function linktTodoToProject(projectName, taskID) {
    const projectObject = PROJECT_MANAGER.getProject(projectName);
    if (!projectObject) {
        console.log(`${linktTodoToProject.name} could not find ${projectName}.`);
        return null;
    }

    projectObject.addTaskId(taskID);
    const saveSuccess = saveProject(projectObject.projectName, projectObject);

    if (!saveSuccess) {
        console.error('An error occured while adding task to project category. Aborting process');
        projectObject.removeTask(taskID);
        return null;
    }

    return projectObject.getAllLinkedTasks();
}

function handleNewProject(formObject) {
    const projectObj = createAndSaveProjectObject(formObject);
    if (projectObj === null) {
        console.error(`${createAndSaveProjectObject.name} returned with null. Aborting process`);
        return null;
    }
    
    const saveSuccess = saveProject(projectObj.projectName, projectObj);
    if (!saveSuccess) {
        console.error('An error occured while saving project to localStorage. Aborting process');
        PROJECT_MANAGER.deleteProject(projectObj.projectName);
        return null;
    }

    renderProjectTabButton(projectObj);
}

function loadProjects() {
    const projectsArray = getAllProjects();

    if (projectsArray.length === 0) {
        console.log('No saved projects found.');
        return;
    }

    projectsArray.forEach((project) => { storeJSONProjectObj(project); });
}

function synchUIToState() {
    const projectsArray = PROJECT_MANAGER.getAllProjects();
    if (projectsArray.length === 0) {
        console.log('No stored projects found to render.');
        return;
    }

    projectsArray.forEach((project) => renderProjectTabButton(project));
}

function filterTodosByProject(projectName) {
    // TODO
}