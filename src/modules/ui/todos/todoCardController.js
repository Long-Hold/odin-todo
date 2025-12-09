import { triggerCustomEvent } from "../../events/eventProducer";
import { EVENTS } from "../../events/events";

const TODO_CARD_DISPLAY = document.getElementById('todo-card-display');

export function initializeTodoCardListeners() {
    TODO_CARD_DISPLAY.addEventListener('click', (event) => {
        
        const card = event.target.closest('article');
        if (!card) { return; }

        const cardId = card.dataset.todoId;

        if (isChecklistItem(event.target)) {
            const parentDiv = event.target.closest('div');
            const itemId = parentDiv.dataset.itemId;
            handleChecklistClick(cardId, itemId, parentDiv);
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

function handleChecklistClick(cardId, itemId, parentContainer) {
    if (parentContainer.classList.contains('completed')) { return; }
    
    parentContainer.classList.add('completed');
    const identifiers = {
        todoId: cardId,
        checklistId: itemId,
    }

    triggerCustomEvent(document, EVENTS.TODO_CHECKLIST_CLICKED, identifiers);
}