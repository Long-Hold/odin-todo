const ADD_PROJECT_BTN = document.getElementById('add-project-btn');
const PROJECT_DIALOG = document.getElementById('project-dialog');

export const PROJECT_FORM = document.getElementById('project-form');

export function initializeProjectFormListeners() {
    ADD_PROJECT_BTN.addEventListener('click', () => { PROJECT_DIALOG.show(); });
}