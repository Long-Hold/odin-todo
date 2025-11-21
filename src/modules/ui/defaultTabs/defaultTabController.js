import { triggerCustomEvent } from "../../events/eventProducer";
import { EVENTS } from "../../events/events";

const GENERAL_CATEGORIES = document.getElementById('general-categories');

export function initializeDefaultTabListener() {
    GENERAL_CATEGORIES.addEventListener('click', (event) => {
        if (event.target.classList.contains('category-btn') === false) { return; }

        const filterDisplay = event.target.dataset.filterDisplay;
        triggerCustomEvent(GENERAL_CATEGORIES, EVENTS.TAB_GENERAL_CLICKED, filterDisplay);
    });
}