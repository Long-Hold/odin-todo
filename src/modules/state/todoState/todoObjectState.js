import { triggerCustomEvent } from "../../events/eventProducer";
import { EVENTS } from "../../events/events";
import { TODO_FORM } from "../../forms/todoForm/todoFormController";

import { Todo } from "../../objects/todos/todoClass";
import { createTodoFromFormData, createTodoFromLocalStorage } from "../../objects/todos/todoObjectController";
import { TODO_OBJECT_MANAGER } from "../../objects/todos/todoObjectManager";
import { getAllPrefixedItems } from "../../storage/localStorageUtils";
import { isExistingTodo, projectFieldEdited } from "./todoStateUtils";


export function initializeTodoObjState() {
    loadLocalStorageToManager();
    listenForTodoSubmissionEvent();
    listenForProjectDeleteEvent();
    listenForTodoDeleteRequestEvent();
}

function loadLocalStorageToManager() {
    const todoObjectArray = getAllPrefixedItems(Todo.ID_PREFIX);
    if (todoObjectArray.length === 0) {
        console.log('No Todo objects to load from localStorage.');
    }

    else {
        todoObjectArray.forEach(jsonTodo => {
            const todo = createTodoFromLocalStorage(jsonTodo);
            TODO_OBJECT_MANAGER.addTodo(todo.id, todo)
        });
    }

    triggerCustomEvent(document, EVENTS.UPDATE_DISPLAY);
    
    return TODO_OBJECT_MANAGER.getAllTodos();
}

function listenForTodoSubmissionEvent() {
    TODO_FORM.addEventListener(EVENTS.TODO_FORM_SUBMITTED, (event) => {
        const todoObject = createTodoFromFormData(event.detail.data);
        
        /**I check if the todo object already exists in the manager.
         * If it does, then that means it is being edited (overwritten) with new data.
         */
        if (isExistingTodo(todoObject.id)) {
            const originalTodo = TODO_OBJECT_MANAGER.getTodo(todoObject.id);

            /**If the originalTodo (unedited version) was linked to a project previously and
             * that object property has changed, then we need to notify the project state manager
             * to unlink that todo's ID from it's linked storage structure.
             */
            if (originalTodo.project && projectFieldEdited(originalTodo.id, todoObject.project)) {
                const identifierIds = {
                    projectId : originalTodo.project,
                    todoId: todoObject.id,
                }

                triggerCustomEvent(document, EVENTS.PROJECT_UNASSIGNED, identifierIds);
            }
        }

        TODO_OBJECT_MANAGER.addTodo(todoObject.id, todoObject);

        if (todoObject.project !== null) { emitProjectLinkEvent(todoObject); }
        triggerCustomEvent(document, EVENTS.UPDATE_DISPLAY);
    });
}

function emitProjectLinkEvent(todoObject) {
    const identifierIds = { 
        projectId: todoObject.project,
        todoId: todoObject.id,
    } 

    triggerCustomEvent(document, EVENTS.PROJECT_ASSIGNED, identifierIds);
}

function listenForProjectDeleteEvent() {
    document.addEventListener(EVENTS.PROJECT_DELETED, (event) => { cascadeUnlinkTodosFromProject(event.detail.data); });
}

function cascadeUnlinkTodosFromProject(idArray) {
    idArray.forEach((todoId) => {
        const todo = TODO_OBJECT_MANAGER.getTodo(todoId);
        todo.project = null;
        TODO_OBJECT_MANAGER.addTodo(todo.id, todo);
    });

    triggerCustomEvent(document, EVENTS.UPDATE_DISPLAY);
}

function listenForTodoDeleteRequestEvent() {
    document.addEventListener(EVENTS.TODO_DELETE_REQUESTED, (event) => {
        const todoId = event.detail.data;
        const todoObj = TODO_OBJECT_MANAGER.getTodo(todoId);

        TODO_OBJECT_MANAGER.deleteTodo(todoId);

        const todoIdAndProjectId = { 
            todoId: todoId,
            projectId: todoObj.project,
        }

        triggerCustomEvent(document, EVENTS.TODO_DELETED, todoIdAndProjectId);
        triggerCustomEvent(document, EVENTS.UPDATE_DISPLAY);
    });
}