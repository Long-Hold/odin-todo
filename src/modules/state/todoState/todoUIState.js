import { EVENTS } from "../../events/events";
import { PROJECT_OBJECT_MANAGER } from "../../objects/projects/projectObjectManager";
import { TODO_OBJECT_MANAGER } from "../../objects/todos/todoObjectManager";
import { GENERAL_CATEGORIES, initializeDefaultTabListener } from "../../ui/defaultTabs/defaultTabController";
import { renderTodoCards } from "../../ui/todos/renderTodoCards";
import { initializeTodoCardListeners } from "../../ui/todos/todoCardController";
import { getFilterState } from "../filterState/filterStateController";
import { enrichTodos, filterTodosByDate } from "./todoStateUtils";

export function initializeTodoUIState() {
    listenForNewTodos();
    // listenForTodoFilterEvents();
    // initializeDefaultTabListener();
    initializeTodoCardListeners();
    listenForFilterEvent();
}

/**Renders Todo Objects to the display depending on the last filter condition.
 * 
 * Retrieves the last filter state from getFilterState(), and then parses the Project and Todo object managers
 * depending on the type of filter, and the display condition.
 */
export function renderAllTodos() {
    const {type, display} = getFilterState();
    if (type === 'general') {
        const rawTodos = filterTodosByDate(TODO_OBJECT_MANAGER.getAllTodos(), display);
        const enrichedTodos = enrichTodos(rawTodos);
        renderTodoCards(enrichedTodos);
    }

    if (type === 'project') {
        const projectObject = PROJECT_OBJECT_MANAGER.getProject(display);
        const todoIdsArray = Array.from(projectObject.linkedIds);
        const rawTodos = todoIdsArray.map(id => TODO_OBJECT_MANAGER.getTodo(id));
        const enrichedTodos = enrichTodos(rawTodos);
        renderTodoCards(enrichedTodos);
    }
}

function listenForNewTodos() {
    document.addEventListener(EVENTS.TODO_CREATED, (event) => {
        renderAllTodos();
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

function listenForFilterEvent() {
    document.addEventListener(EVENTS.FILTER_CHANGED, () => {
        renderAllTodos();
    });
}