import { objectifySubmission, bundleKeys, removeEmptyFields } from "./formUtils";
import { createChecklistManager } from "./createFormChecklistManager";

const dialog = document.querySelector('dialog');

export function initializeFormControl() {
    initializeNewTodoListener();
}

function initializeNewTodoListener() {
    const newTodoBtn = document.getElementById('add-task');
    newTodoBtn.addEventListener('click', () => {
        dialog.show();
    })
}

function initializeFormEventListeners() {
    const newTodoForm = document.getElementById('new-todo-form');

    newTodoForm.addEventListener('submit', processSubmit);
}

function processSubmit(event) {
    event.preventDefault();

    //TODO
}