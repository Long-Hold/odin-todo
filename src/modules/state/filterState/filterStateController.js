import { triggerCustomEvent } from "../../events/eventProducer";
import { EVENTS } from "../../events/events";

const GENERAL_TABS = document.getElementById('general-categories');
const PROJECT_TABS = document.getElementById('projects-list');

const FILTER_STATE = {
    type: 'general',
    display: 'all',
}

export function initializeFilterTabListeners() {
    GENERAL_TABS.addEventListener('click', (event) => {
        if (event.target.classList.contains('category-btn') === false) { return; }

        const filterType = event.target.dataset.filterType;
        const filterDisplay = event.target.dataset.filterDisplay;

        updateFilterState(filterType, filterDisplay);
    });

    PROJECT_TABS.addEventListener('click', (event) => {
        if (event.target.dataset.action !== 'filter') { return; }

        const filterType = event.target.dataset.filterType;
        const projectId = event.target.dataset.projectId;

        updateFilterState(filterType, projectId);
    });

    document.addEventListener(EVENTS.PROJECT_DELETED, () => {
        FILTER_STATE.type = 'general';
        FILTER_STATE.display = 'all';
    });
}

export function getFilterState() {
    return structuredClone(FILTER_STATE);
}

/**Updates the FILTER_STATE to track the last clicked filter button.
 * 
 * Emits an event for the render states to listen for to display the relevant todo objects.
 */
function updateFilterState(type, display) {
    FILTER_STATE.type = type;
    FILTER_STATE.display = display;
    triggerCustomEvent(document, EVENTS.FILTER_CHANGED);
}