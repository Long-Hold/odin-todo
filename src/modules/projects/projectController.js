import { createObjectManager } from "../objectManagers/createObjManager";

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