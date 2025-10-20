import { createTodoObject } from "./createTodoObj";
import { createTodoManager } from "./todoManager";

export const TODO_OBJECT_MANAGER = createTodoManager();

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