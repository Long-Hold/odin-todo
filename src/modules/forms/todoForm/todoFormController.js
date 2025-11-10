const TODO_FORM = document.getElementById('todo-form');
const ADD_TODO_BTN = document.getElementById('add-todo');
const TODO_DIALOG = document.getElementById('todo-dialog');

export function initializeTodoFormListeners() {
    ADD_TODO_BTN.addEventListener('click', () => { TODO_DIALOG.show(); });

    TODO_FORM.addEventListener('submit', (event) => { 
        event.preventDefault();
        const formData = new FormData(event.target);
        //TODO: Emit custom event that todoForm was submitted
    });
}