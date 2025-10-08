import "./styles/styles.css";
import { createTodoObject } from "./modules/createTodoObj";
import { FormControl, objectifySubmission, bundleKeys } from "./modules/formController";
import { createCardCreator } from "./modules/createTodoCard";
import { displayNewCardNode, clearDisplayBox } from "./modules/renderCards";

// FormControl.initializeEventListeners();

// document.addEventListener('todoSubmitted', (event) => {
//     /**Upon form submission, initiate a transaction with try catch.
//      * 
//      * Transaction order of events:
//      *  1. Destructure and store form data
//      *  2. Create a todoCard Object from form data
//      *  3. Construct todoCard Node from Object's property values
//      *  4. Display todoCard Node to the DOM
//      *  5. Save the created object
//      * 
//      * If any of these steps fail, the entire process is aborted. No data is saved
//      * to the manager or local storage, and any temporary DOM changes are cleaned up automatically
//      * by garbage collection.
//      * 
//      * This ensures visual state and internal state remained synchronized.
//      */
//     try {
//         const {data} = event.detail;
//         const newCard = createTodoObject(data);

//         const cardNode = customizeTodoCard(newCard);
//         displayNewCardNode(cardNode);

//         todoObjManager.addTodoObj(newCard);
//     } catch (error) {
//         console.error('Error: ', error.message);
//     }
// })

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
    const form = document.getElementById('new-todo-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(event.target);
        let formObject = objectifySubmission(new FormData(event.target));

        if (Object.keys(formObject).includes('step')) {
            formObject = bundleKeys(formObject, 'step', 'steps');
        }

        const todoObject = createTodoObject(formObject);
        const todoCard = customizeTodoCard(todoObject);

        displayNewCardNode(todoCard);
        todoObjManager.addTodoObj(todoCard);
    })
}

formTransactor();