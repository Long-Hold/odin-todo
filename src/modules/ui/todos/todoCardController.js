import { triggerCustomEvent } from "../../events/eventProducer";
import { EVENTS } from "../../events/events";

const TODO_CARD_DISPLAY = document.getElementById('todo-card-display');

export function initializeTodoCardListeners() {
    TODO_CARD_DISPLAY.addEventListener('click', (event) => {
        const cardId = event.target.closest('article').dataset.todoId;

        if (isChecklistItem(event.target)) {
            //TODO: Emit event to signal checklist item deletion
        }

        if (event.target.tagName !== 'BUTTON') { return null; }

        const buttonAction = event.target.dataset.action;

        if (buttonAction === 'delete') {
            triggerCustomEvent(document, EVENTS.TODO_DELETE_REQUESTED, cardId);
        }

        if (buttonAction === 'edit') {
            triggerCustomEvent(document, EVENTS.TODO_EDIT_REQUESTED, cardId);
        }
    });
}

function isChecklistItem(element) {
    const isInChecklist = element.closest('.todo-checklist');
    const isValidTag = element.tagName === 'INPUT' || element.tagName === 'LABEL';
    return isInChecklist && isValidTag;
}