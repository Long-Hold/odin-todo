import { addStep } from "./checklistManager";

const TODO_FORM = document.getElementById('todo-form');
const ADD_TODO_BTN = document.getElementById('add-todo');
const TODO_DIALOG = document.getElementById('todo-dialog');
const FORM_BUTTONS = document.getElementById('form-control-btns');
const CHECKLIST_CONTAINER = document.getElementById('checklist-container');

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

    CHECKLIST_CONTAINER.addEventListener('click', (event) => {
        if (event.target.type !== 'button') { return; }

        const clickedAction = event.target.dataset.action;
        if (clickedAction === 'add-step') { 
            const checklist_input_container = document.getElementById('checklist-input-container');
            const checklist_template = document.getElementById('checklist-template');
            addStep(checklist_input_container, checklist_template);
        }

        if (clickedAction === 'delete') {
            //TODO: Call delete function
        }
    })
}