import { EVENTS } from "../../events/events";
import { TODO_OBJECT_MANAGER } from "../../objects/todos/todoObjectManager";
import { renderTodoCards } from "../../ui/todos/renderTodoCards";
import { enrichTodos } from "./todoStateUtils";

export function initializeTodoUIState() {
    listenForNewTodos();
    listenForTodoFilterEvents();
}

function listenForNewTodos() {
    document.addEventListener(EVENTS.TODO_CREATED, (event) => {
        const todoObjArray = event.detail.data;
        renderTodoCards(todoObjArray);
    });
}

function listenForTodoFilterEvents() {
    document.addEventListener(EVENTS.TODO_FILTER_REQUESTED, (event) => {
        const todoIdsArray = event.detail.data;
        const rawTodos = todoIdsArray.map(id => TODO_OBJECT_MANAGER.getTodo(id));
        const enrichedTodos = enrichTodos(rawTodos);

        renderTodoCards(enrichedTodos);
    });
}