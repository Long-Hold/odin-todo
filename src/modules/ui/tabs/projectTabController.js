const PROJECTS_TAB_CONTAINER = document.getElementById('projects-tab-container');

export function initializeTabsListener() {
    PROJECTS_TAB_CONTAINER.addEventListener('click', (event) => {
        if (event.target.classList.contains('project-btn') === false) {
            console.log('ignore');
        }
    })
}