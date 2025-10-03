import "./styles/styles.css";
import { createTodoObject } from "./modules/createTodoObj";
import { FormControl } from "./modules/formController";
import { createCardCreator } from "./modules/createTodoCard";
import { displayNewCardNode, clearDisplayBox } from "./modules/renderCards";

FormControl.initializeEventListeners();

document.addEventListener('todoSubmitted', (event) => {
    /**Upon form submission, initiate a transaction with try catch.
     * 
     * Transaction order of events:
     *  1. Destructure and store form data
     *  2. Create a todoCard Object from form data
     *  3. Construct todoCard Node from Object's property values
     *  4. Display todoCard Node to the DOM
     *  5. Save the created object
     * 
     * If any of these steps fail, the entire process must be terminated.
     * This prevents a desynch situation from arising between the visual and internal state.
     */
    try {
        const {data} = event.detail;
        const newCard = createTodoObject(data);

        const cardNode = customizeTodoCard(newCard);
        displayNewCardNode(cardNode);

        todoObjManager.addTodoObj(newCard);
    } catch (error) {
        console.error('Error: ', error.message);
    }
})

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