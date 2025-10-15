import { objectifySubmission, bundleKeys, removeEmptyFields } from "./formUtils";
import { createChecklistManager } from "./createFormChecklistManager";

const dialog = document.querySelector('dialog');

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

export function initializeFormControl() {
    initializeNewTodoListener();
}

function processSubmit(event) {
    event.preventDefault();

    //TODO
}