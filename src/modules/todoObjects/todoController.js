import { createTodoObject } from "./createTodoObj";
import { createTodoManager } from "./todoManager";

import { TODO_FORM, processSubmit, resetAndCloseForm } from "../forms/formController";

export const TODO_OBJECT_MANAGER = createTodoManager();

export function initializeTodoController() {
    initializeFormSubmissionListener();
}

function initializeFormSubmissionListener() {
    TODO_FORM.addEventListener('submit', (event) => {
        const formObject = processSubmit(event);
        
        if (formObject !== null) {
            transactTodoObjectCreation(formObject);
        }

        resetAndCloseForm();
    });
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