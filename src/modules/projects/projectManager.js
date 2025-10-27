import { createObjectManager } from "../objectManagers/createObjManager";

export const {
    addObject: addProject,
    getAllObjects: getAllProjects,
    getObject: getProject,
    deleteObject: deleteProject,
} = createObjectManager();