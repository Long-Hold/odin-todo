import { PROJECT_MANAGER, createAndSaveProjectObject } from "../projects/projectController";
import { NEW_PROJECT_FORM } from "../forms/projectFormController";
import { EVENTS } from "../events/events";
import { saveProject } from "../storage/projectStorageService";

export function initializeProjectState() {
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
    
    saveSuccess = saveProject(projectObj.projectName, projectObj);
    if (!saveSuccess) {
        console.error('An error occured while saving project to localStorage. Aborting process');
        PROJECT_MANAGER.deleteProject(projectObj.projectName);
        return null;
    }
}