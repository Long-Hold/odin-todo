const ADD_PROJECT_BTN = document.getElementById('add-project-btn');
const NEW_PROJECT_DIALOG = document.getElementById('new-project-dialog');
const NEW_PROJECT_FORM = document.getElementById('new-project-form');

export function initializeProjectFormControl() {
    initializeAddProjectBtnListener();
    initializeFormListeners();
}

function initializeAddProjectBtnListener() {
    ADD_PROJECT_BTN.addEventListener('click', () => { NEW_PROJECT_DIALOG.show(); });
}

function initializeFormListeners() {
    NEW_PROJECT_FORM.addEventListener('click', (event) => {
        if (event.target.dataset.action === 'cancel') {
            resetAndClose();
        }
    })

    NEW_PROJECT_FORM.addEventListener('submit', (event) => {
        //TODO: Process Submit
        //TODO: Emit Project Submit event
        resetAndClose();
    })
}

function resetAndClose() {
    NEW_PROJECT_FORM.reset();
    NEW_PROJECT_DIALOG.close();
}