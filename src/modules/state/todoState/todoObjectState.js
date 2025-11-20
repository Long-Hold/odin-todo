import { triggerCustomEvent } from "../../events/eventProducer";
import { EVENTS } from "../../events/events";
import { TODO_FORM } from "../../forms/todoForm/todoFormController";
import { PROJECT_OBJECT_MANAGER } from "../../objects/projects/projectObjectManager";
import { Todo } from "../../objects/todos/todoClass";
import { createTodoFromFormData, createTodoFromLocalStorage } from "../../objects/todos/todoObjectController";
import { TODO_OBJECT_MANAGER } from "../../objects/todos/todoObjectManager";
import { getAllPrefixedItems } from "../../storage/localStorageUtils";

export function initializeTodoObjState() {
    loadLocalStorageToManager();
    listenForTodoSubmissionEvent();
    listenForProjectDeleteEvent();
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

function listenForTodoSubmissionEvent() {
    TODO_FORM.addEventListener(EVENTS.TODO_FORM_SUBMITTED, (event) => {
        const todoObject = createTodoFromFormData(event.detail.data);
        TODO_OBJECT_MANAGER.addTodo(todoObject.id, todoObject);

        if (todoObject.project !== null) { emitProjectLinkEvent(todoObject); }
        broadcastTodos();
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

    broadcastTodos();
}

export function broadcastTodos() {
    /**Enriches todo object data before broadcasting them in an event.
     * 
     * This is because todo objects store a project's unique ID rather than the name of the project.
     * This is primarily done for rendering them onto the DOM to make referencing to the project object faster
     * when a todo is edited or deleted
     */
    const rawTodos = TODO_OBJECT_MANAGER.getAllTodos();
    const enrichedTodos = rawTodos.map((todo) => ({
        ...todo,
        project: todo.project ? PROJECT_OBJECT_MANAGER.getProject(todo.project)?.name : null,
        projectId: todo.project,
    }));
    triggerCustomEvent(document, EVENTS.TODO_CREATED, enrichedTodos);
}