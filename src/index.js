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

    const addTodoObj = (todoObj) => { activeTodos[todoObj.taskID] = structuredClone(todoObj); };
    
    const getAllTodoObjs = () => activeTodos;

    const getTodoObj = (taskID) => { return structuredClone(activeTodos[taskID])} ;

    const deleteTodoObj = (taskID) => delete activeTodos[taskID];

    return {addTodoObj, getAllTodoObjs, getTodoObj, deleteTodoObj};
})();

window.todoObjManager = todoObjManager;

function formEventDelegator() {
    const form = document.getElementById('new-todo-form');
    const dialog = form.closest('dialog');

    const checklistInputContainer = form.querySelector('#input-steps-container');
    const checklistInputTemplate = document.getElementById('checklist-step-input');
    const checklistManager = createChecklistManager(checklistInputContainer, checklistInputTemplate);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const newTodoObj = processSubmit(event);

        if (newTodoObj) {
            todoObjManager.addTodoObj(newTodoObj);

            const taskId = newTodoObj.taskID;
            const todoCard = customizeTodoCard(todoObjManager.getTodoObj(taskId));
            displayNewCardNode(todoCard);
        }

        checklistManager.deleteAllInputFields();
        form.reset();
        dialog.close();
    })

    form.addEventListener('click', (event) => {
        if (event.target.id === 'add-step') {
            checklistManager.addInputField();
        }

        if (event.target.dataset.action === 'delete') {
            try {
                checklistManager.deleteInputField(event.target.parentElement);
            } catch (error) {
                console.error(`${error}. Selected container could not be deleted.`);
            } finally {
                checklistManager.renumberInputFields();
            }
        }

        if (event.target.type === 'reset') {
            checklistManager.deleteAllInputFields();
        }

        if (event.target.dataset.action === 'cancel') {
            checklistManager.deleteAllInputFields();
            form.reset();
            dialog.close();
        }
    });
}

function processSubmit(event) {
    try {
        const formData = removeEmptyFields(new FormData(event.target));
        let formObject = objectifySubmission(formData);

        if (Object.keys(formObject).some(key => key.startsWith('step'))) {
            formObject = bundleKeys(formObject, 'step', 'steps');
        }

        const todoObject = createTodoObject(formObject);
        return todoObject;
    } catch (error) {
        console.error(`An error occured during form submission processing: ${error}`);
        return null;
    }
}

formEventDelegator();