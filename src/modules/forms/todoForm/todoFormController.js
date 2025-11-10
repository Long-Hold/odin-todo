const TODO_FORM = document.getElementById('todo-form');
const ADD_TODO_BTN = document.getElementById('add-todo');
const TODO_DIALOG = document.getElementById('todo-dialog');
const FORM_BUTTONS = document.getElementById('form-control-btns');

export function initializeTodoFormListeners() {
    ADD_TODO_BTN.addEventListener('click', () => { TODO_DIALOG.show(); });

    FORM_BUTTONS.addEventListener('click', (event) => {
        const controlBtn = event.target;

        if (controlBtn.dataset.action === 'reset') {
            // TODO: Reset checklist steps
            TODO_FORM.reset();
        }

        if (controlBtn.dataset.action === 'cancel') {
            // TODO: Reset checklist steps
            TODO_DIALOG.close();
        }
    })

    TODO_FORM.addEventListener('submit', (event) => { 
        event.preventDefault();
        const formData = new FormData(event.target);
        //TODO: Emit custom event that todoForm was submitted
    });
}