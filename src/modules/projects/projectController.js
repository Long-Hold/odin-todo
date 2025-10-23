const NEW_PROJECT_BUTTON = document.getElementById('add-project-btn');
const NEW_PROJECT_DIALOG = document.getElementById('new-project-dialog');
const NEW_PROJECT_FORM = document.getElementById('new-project-form');

export function initializeNewProjectListeners() {
    showNewProjectForm();
}

function showNewProjectForm() {
    NEW_PROJECT_BUTTON.addEventListener('click', NEW_PROJECT_DIALOG.show());
}