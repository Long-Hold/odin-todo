import "./styles/styles.css";
import { createTodoObject } from "./modules/createTodoObj";
import { objectifySubmission, bundleKeys, removeEmptyFields } from "./modules/formController";
import { createCardCreator } from "./modules/createTodoCard";
import { displayNewCardNode, clearDisplayBox } from "./modules/renderCards";
import { createChecklistManager } from "./modules/createFormChecklistManager";

function customizeTodoCard(todoCardObj) {
    const cardCreator = createCardCreator();
    for (const property in todoCardObj) {
        switch (property) {
            case ('taskID'):
                cardCreator.setCardID(todoCardObj[property]);
                break;
            
            case ('title'):
                cardCreator.setTitle(todoCardObj[property]);
                break;

            case ('priority'):
                cardCreator.setPriority(todoCardObj[property]);
                break;
            
            case('projects'):
                cardCreator.setProject(todoCardObj[property]);
                break;
            
            case('deadline'):
                cardCreator.setDeadline(new Date(todoCardObj[property]));
                break;
            
            case('description'):
                cardCreator.setDescription(todoCardObj[property]);
                break;
            
            case('steps'):
                cardCreator.setChecklistSteps(todoCardObj[property])
                break;
        }
    }

    return cardCreator.getTodoCard();
}

const todoObjManager = (function() {
    const activeTodos = {};

    const addTodoObj = (todoObj) => activeTodos[todoObj.taskID] = todoObj;
    
    const getAllTodoObjs = () => activeTodos;

    const getTodoObj = (taskID) => activeTodos[taskID];

    const deleteTodoObj = (taskID) => delete activeTodos[taskID];

    return {addTodoObj, getAllTodoObjs, getTodoObj, deleteTodoObj};
})();

window.todoObjManager = todoObjManager;

function formTransactor() {
    const newTask = document.getElementById('add-task');

    const dialog = document.querySelector('dialog');

    const form = document.getElementById('new-todo-form');

    const checklistInputContainer = form.querySelector('#input-steps-container');
    const checklistInputTemplate = document.getElementById('checklist-step-input');
    const checklistManager = createChecklistManager(checklistInputContainer, checklistInputTemplate);

    newTask.addEventListener('click', () => dialog.show() );

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        try {
            const cleanedFormData = removeEmptyFields(new FormData(event.target));
            let formObject = objectifySubmission(cleanedFormData);

            if (Object.keys(formObject).some(key => key.startsWith('step'))) {
                formObject = bundleKeys(formObject, 'step', 'steps');
            }

            const todoObject = createTodoObject(formObject);
            const todoCard = customizeTodoCard(todoObject);

            displayNewCardNode(todoCard);
            todoObjManager.addTodoObj(todoObject);
        } catch (error) {
            console.error(`An Error occured during Form Transaction: ${error}`);
        } finally {
            checklistManager.deleteAllInputFields();
            form.reset();
            dialog.close();
        }
    })

    form.addEventListener('click', (event) => {
        if (event.target.id === 'add-step') {
            checklistManager.addInputField();
        }

        if (event.target.dataset.action === 'delete') {
            /**If the delete button was selected, we pass the parent div container
             * that encapsulates the checklist label, input, and button itself to the
             * deletion function.
              */
            checklistManager.deleteInputField(event.target.parentElement);
            checklistManager.renumberInputFields();
        }

        if (event.target.type === 'reset') {
            checklistManager.deleteAllInputFields();
        }

        if (event.target.dataset.action === 'cancel') {
            checklistManager.deleteAllInputFields();
            form.reset();
            dialog.close();
        }
    })
}

formTransactor();