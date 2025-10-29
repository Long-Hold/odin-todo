import { createObjectManager } from "../objectManagers/createObjManager";
import { createProjectObject } from "./createProject";

// Destructure factory for custom aliasing of methods
const { 
    addObject: addProject,
    getAllObjects: getAllProjects,
    getObject: getProject,
    deleteObject: deleteProject,
} = createObjectManager();

export const PROJECT_MANAGER = { 
    addProject, 
    getAllProjects, 
    getProject, 
    deleteProject,
};

export function createAndSaveProjectObject(formObject) {
   const newProjObj = createProjectObject(formObject);
   
    try {
        PROJECT_MANAGER.addProject(newProjObj.projectName, newProjObj);
    } catch (error) {
        console.error(`${handleNewProject.name} caught an error: ${error}`);
        return null;
    } 

    return newProjObj;
}