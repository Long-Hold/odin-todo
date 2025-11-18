import { triggerCustomEvent } from "../../events/eventProducer";
import { EVENTS } from "../../events/events";
import { TODO_FORM } from "../../forms/todoForm/todoFormController";
import { Todo } from "../../objects/todos/todoClass";
import { createTodoFromFormData, createTodoFromLocalStorage } from "../../objects/todos/todoObjectController";
import { TODO_OBJECT_MANAGER } from "../../objects/todos/todoObjectManager";
import { getAllPrefixedItems } from "../../storage/localStorageUtils";

export function initializeTodoObjState() {
    loadLocalStorageToManager();
    TODO_FORM.addEventListener(EVENTS.TODO_FORM_SUBMITTED, (event) => {
        const todoObject = createTodoFromFormData(event.detail.data);
        TODO_OBJECT_MANAGER.addTodo(todoObject.id, todoObject);

        //TODO: Check if project was selected, if so, emit custom event containing the todoID and project value
        if (todoObject.project !== null) { emitProjectLinkEvent(todoObject); }
        //TODO: Then, in project State, listen for the event and add the todo ID to the selected project
    })
}

function loadLocalStorageToManager() {
    const todoObjectArray = getAllPrefixedItems(Todo.ID_PREFIX);
    if (todoObjectArray.length === 0) {
        console.log('No Todo objects to load from localStorage.');
        return null;
    }

    todoObjectArray.forEach(jsonTodo => {
        const todo = createTodoFromLocalStorage(jsonTodo);
        TODO_OBJECT_MANAGER.addTodo(todo.id, todo)
    });
    
    return TODO_OBJECT_MANAGER.getAllTodos();
}

function emitProjectLinkEvent(todoObject) {
    const identifierIds = { 
        projectId: todoObject.project,
        todoId: todoObject.id,
    } 

    triggerCustomEvent(document, EVENTS.PROJECT_ASSIGNED, identifierIds);
}