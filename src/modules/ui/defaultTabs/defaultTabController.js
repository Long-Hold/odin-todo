const GENERAL_CATEGORIES = document.getElementById('general-categories');

export function initializeDefaultTabListener() {
    GENERAL_CATEGORIES.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON') { return null; }

        const filterDisplay = event.target.dataset.filterDisplay;

        if (filterDisplay === 'all') { 
            //todo
        }

        if (filterDisplay === 'today') {
            //todo
        }

        if (filterDisplay === 'week') {
            //todo
        }
    });
}