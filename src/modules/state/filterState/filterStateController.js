import { triggerCustomEvent } from "../../events/eventProducer";
import { EVENTS } from "../../events/events";

const GENERAL_TABS = document.getElementById('general-categories');
const PROJECT_TABS = document.getElementById('projects-list');

const DEFAULT_TYPE = 'general';
const DEFAULT_DISPLAY = 'all';

const FILTER_STATE = {
    type: DEFAULT_TYPE,
    display: DEFAULT_DISPLAY,
}

const CSS_CURRENT_TAB = "current-tab";
const DEFAULT_BUTTON = document.querySelector(`[data-filter-type="${FILTER_STATE.type}"][data-filter-display="${FILTER_STATE.display}"]`);

export function initializeFilterTabListeners() {
    assignCurrentTabColor();
    GENERAL_TABS.addEventListener('click', (event) => {
        if (event.target.classList.contains('category-btn') === false) { return; }

        const filterType = event.target.dataset.filterType;
        const filterDisplay = event.target.dataset.filterDisplay;

        updateFilterState(filterType, filterDisplay);
        assignCurrentTabColor(event.target);
    });

    PROJECT_TABS.addEventListener('click', (event) => {
        if (event.target.dataset.action !== 'filter') { return; }

        const filterType = event.target.dataset.filterType;
        const projectId = event.target.dataset.projectId;

        updateFilterState(filterType, projectId);
    });
}

export function getFilterState() {
    return structuredClone(FILTER_STATE);
}

export function resetFilterStateToDefault() {
    FILTER_STATE.type = DEFAULT_TYPE;
    FILTER_STATE.display = DEFAULT_DISPLAY;
}

/**Updates the FILTER_STATE to track the last clicked filter button.
 * 
 * Emits an event for the render states to listen for to display the relevant todo objects.
 */
function updateFilterState(type, display) {
    FILTER_STATE.type = type;
    FILTER_STATE.display = display;
    triggerCustomEvent(document, EVENTS.UPDATE_DISPLAY);
}

function assignCurrentTabColor(currentButton = DEFAULT_BUTTON) {
    document.querySelectorAll(`.${CSS_CURRENT_TAB}`).forEach(btn => {
        btn.classList.remove(CSS_CURRENT_TAB);
    });

    currentButton.classList.add(CSS_CURRENT_TAB);
}