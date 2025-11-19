import { EVENTS } from "../../events/events";
import { renderTodoCards } from "../../ui/todos/renderTodoCards";

export function initializeTodoUIState() {
    listenForNewTodos();
}

function listenForNewTodos() {
    document.addEventListener(EVENTS.PROJECT_CREATED, (event) => {
        const todoObjArray = event.detail.data;
        renderTodoCards(todoObjArray);
    });
}