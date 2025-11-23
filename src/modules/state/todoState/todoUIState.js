import { EVENTS } from "../../events/events";
import { TODO_OBJECT_MANAGER } from "../../objects/todos/todoObjectManager";
import { GENERAL_CATEGORIES, initializeDefaultTabListener } from "../../ui/defaultTabs/defaultTabController";
import { renderTodoCards } from "../../ui/todos/renderTodoCards";
import { initializeTodoCardListeners } from "../../ui/todos/todoCardController";
import { enrichTodos, filterTodosByDate } from "./todoStateUtils";

export function initializeTodoUIState() {
    listenForNewTodos();
    listenForTodoFilterEvents();
    initializeDefaultTabListener();
    initializeTodoCardListeners();
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

    GENERAL_CATEGORIES.addEventListener(EVENTS.TAB_GENERAL_CLICKED, (event) => {
        const dateString = event.detail.data;
        const filteredRawTodos = filterTodosByDate(TODO_OBJECT_MANAGER.getAllTodos(), dateString);
        const enrichedTodos = enrichTodos(filteredRawTodos);
        renderTodoCards(enrichedTodos);
    });
}