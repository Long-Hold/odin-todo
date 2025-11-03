import { createObjectManager } from "../objectManagers/createObjManager";
import { createProjectObject, Project } from "./createProject";

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

export function storeJSONProjectObj(object) {
    try {
        const project = Project.fromJSON(object);
        PROJECT_MANAGER.addProject(project.projectName, project);
    } catch (error) {
        console.error(`${storeProjectObj.name} has caught an error: ${error}`);
        return null;
    }
}

export function getAllProjectNames() {
    const projectNamesArray = PROJECT_MANAGER.getAllProjects().map(project => project.projectName);
    return projectNamesArray;
}