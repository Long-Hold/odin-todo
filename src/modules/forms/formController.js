import { objectifySubmission, bundleKeys, removeEmptyFields } from "./formUtils";
import { createChecklistManager } from "./createFormChecklistManager";

const newTodoForm = document.getElementById('new-todo-form');
const dialog = document.querySelector('dialog');

function initializeNewTodoListener() {
    const newTodoBtn = document.getElementById('add-task');
    newTodoBtn.addEventListener('click', () => {
        dialog.show();
    })
}

export function initializeFormControl() {
    initializeNewTodoListener();
}