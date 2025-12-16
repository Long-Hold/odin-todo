import { EVENTS } from "../../events/events";
import { PROJECT_OBJECT_MANAGER } from "../../objects/projects/projectObjectManager";
import { TODO_OBJECT_MANAGER } from "../../objects/todos/todoObjectManager";
import { renderTodoCards, updateExistingCard } from "../../ui/todos/renderTodoCards";
import { initializeTodoCardListeners } from "../../ui/todos/todoCardController";
import { getFilterState, resetFilterStateToDefault } from "../filterState/filterStateController";
import { enrichTodos, filterCompletedTodos, filterTodosByDate } from "./todoStateUtils";

export function initializeTodoUIState() {
    listenForDisplayUpdates();
    initializeTodoCardListeners();
}

/**Renders Todo Objects to the display depending on the last filter condition.
 * 
 * Retrieves the last filter state from getFilterState(), and then parses the Project and Todo object managers
 * depending on the type of filter, and the display condition.
 */
export function renderAllTodos() {
    const {type, display} = getFilterState();
    if (type === 'general') {
        let rawTodos;

        if (display === 'completed') {
            rawTodos = filterCompletedTodos(TODO_OBJECT_MANAGER.getAllTodos());
        }

        else {
            rawTodos = filterTodosByDate(TODO_OBJECT_MANAGER.getAllTodos(), display);
        }
        
        const enrichedTodos = enrichTodos(rawTodos);
        renderTodoCards(enrichedTodos);
    }

    if (type === 'project') {
        const projectObject = PROJECT_OBJECT_MANAGER.getProject(display);
        if (!projectObject) {
            resetFilterStateToDefault();
            return renderAllTodos();
        }
        const todoIdsArray = Array.from(projectObject.linkedIds);
        const rawTodos = todoIdsArray.map(id => TODO_OBJECT_MANAGER.getTodo(id));
        const enrichedTodos = enrichTodos(rawTodos);
        renderTodoCards(enrichedTodos);
    }
}

function listenForDisplayUpdates() {
    document.addEventListener(EVENTS.UPDATE_DISPLAY, () => {
        renderAllTodos();
    });

    document.addEventListener(EVENTS.TODO_OBJECT_EDITED, (event) => {
        const todoId = event.detail.data;
        const todoObject = TODO_OBJECT_MANAGER.getTodo(todoId);
        const [enrichedTodo] = enrichTodos([todoObject]);
        updateExistingCard(todoId, enrichedTodo);
    });
}