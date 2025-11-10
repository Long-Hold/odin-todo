import { createTodoObject } from "./createTodoObj";
import { createObjectManager } from "../objectManagers/createObjManager";

const {
    addObject: addTodo,
    getAllObjects: getAllTodos,
    getObject: getTodoObject,
    deleteObject: deleteTodoObject,
} = createObjectManager();

export const TODO_OBJECT_MANAGER = {
    addTodo,
    getAllTodos,
    getTodoObject,
    deleteTodoObject,
};

TODO_OBJECT_MANAGER.removeProperty = function (taskId, property) {
    const todoObj = getTodoObject(taskId);
    if (todoObj === undefined) {
        console.error(`${removeProperty.name} could not locate object.`);
        return null;
    }

    delete todoObj[property];
    return structuredClone(todoObj);
}

export function createAndSaveTodoObj(formObject) {
    const todoObject = createTodoObject(formObject);

    try {
        TODO_OBJECT_MANAGER.addTodo(todoObject.taskID, todoObject);
    } catch(error) {
        console.error(`${transactTodoObjectCreation.name} -> ${TODO_OBJECT_MANAGER.addTodo.name}: ${error}`);
        return null;
    }

    return todoObject;
}

export function storeTodoObj(todoObject) {
    try {
        TODO_OBJECT_MANAGER.addTodo(todoObject.taskID, todoObject);
    } catch(error) {
        console.error(`${storeTodoObj.name} -> ${TODO_OBJECT_MANAGER.addTodo.name}: ${error}`);
        return null;
    }
}