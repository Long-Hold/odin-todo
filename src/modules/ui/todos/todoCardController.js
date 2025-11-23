import { triggerCustomEvent } from "../../events/eventProducer";
import { EVENTS } from "../../events/events";

const TODO_CARD_DISPLAY = document.getElementById('todo-card-display');

export function initializeTodoCardListeners() {
    TODO_CARD_DISPLAY.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON') { return null; }

        const cardId = event.target.closest('article').dataset.todoId;
        const buttonAction = event.target.dataset.action;

        if (buttonAction === 'delete') {
            triggerCustomEvent(TODO_CARD_DISPLAY, EVENTS.TODO_DELETE_REQUESTED, cardId);
        }
    });
}