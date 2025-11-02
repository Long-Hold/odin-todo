import { PROJECT_MANAGER, createAndSaveProjectObject, storeJSONProjectObj } from "../projects/projectController";
import { NEW_PROJECT_FORM } from "../forms/projectFormController";
import { EVENTS } from "../events/events";
import { saveProject, getAllProjects } from "../storage/projectStorageService";
import { renderProjectTabButton } from "../ui/projects/projectsUIController";

export function initializeProjectState() {
    loadProjects();
    NEW_PROJECT_FORM.addEventListener(EVENTS.PROJECT_SUBMITTED, (event) => {
        handleNewProject(event.detail.data)
    });
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