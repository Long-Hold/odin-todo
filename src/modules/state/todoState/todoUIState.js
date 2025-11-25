import { EVENTS } from "../../events/events";
import { PROJECT_OBJECT_MANAGER } from "../../objects/projects/projectObjectManager";
import { TODO_OBJECT_MANAGER } from "../../objects/todos/todoObjectManager";
import { renderTodoCards } from "../../ui/todos/renderTodoCards";
import { initializeTodoCardListeners } from "../../ui/todos/todoCardController";
import { getFilterState } from "../filterState/filterStateController";
import { enrichTodos, filterTodosByDate } from "./todoStateUtils";

export function initializeTodoUIState() {
    listenForNewTodos();
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
    document.addEventListener(EVENTS.TODO_CREATED, () => {
        renderAllTodos();
    });
}

function listenForFilterEvent() {
    document.addEventListener(EVENTS.FILTER_CHANGED, () => {
        renderAllTodos();
    });
}