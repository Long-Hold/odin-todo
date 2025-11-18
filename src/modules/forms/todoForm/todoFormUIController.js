import { addSelectOption, clearParentContainer } from "../formUIUtils";
import { addStep, clearChecklistContainer, deleteStep } from "./checklistManager";

const TODO_FORM = document.getElementById('todo-form');

const ADD_TODO_BTN = document.getElementById('add-todo');
const TODO_DIALOG = document.getElementById('todo-dialog');
const FORM_BUTTONS = document.getElementById('form-control-btns');

const CHECKLIST_CONTAINER = document.getElementById('checklist-container');
const CHECKLIST_INPUT_CONTAINER = document.getElementById('checklist-input-container');

export function initializeTodoFormUIButtons() {
    ADD_TODO_BTN.addEventListener('click', () => { TODO_DIALOG.show(); });

    FORM_BUTTONS.addEventListener('click', (event) => {
        const controlBtn = event.target.dataset.action;

        if (controlBtn === 'reset') {
            resetForm();
        }

        if (controlBtn === 'cancel') {
            resetForm();
            TODO_DIALOG.close();
        }
    });

    CHECKLIST_CONTAINER.addEventListener('click', (event) => {
        if (event.target.type !== 'button') { return; }

        const clickedAction = event.target.dataset.action;

        if (clickedAction === 'add-step') { 
            const checklist_template = document.getElementById('checklist-template');
            addStep(CHECKLIST_INPUT_CONTAINER, checklist_template);
        }

        if (clickedAction === 'delete') {
            const stepDivContainer = event.target.parentElement;
            deleteStep(stepDivContainer);
        }
    });
}

export function renderProjectOptions(projectsArray) {
    const selectElement = document.getElementById('projects-dropdown');
    clearParentContainer(selectElement);
   
    // Adds a default option
    addSelectOption(selectElement, '', 'None');

    projectsArray.forEach(project => addSelectOption(selectElement, project.id, project.name));

    return selectElement;
}

export function resetForm() {
    clearChecklistContainer(CHECKLIST_INPUT_CONTAINER);
    TODO_FORM.reset();
}