import "./styles/styles.css";
import { createTodoObject } from "./modules/createTodoObj";
import { FormControl } from "./modules/formController";
import { cardCreator } from "./modules/createTodoCard";

FormControl.initializeEventListeners();

document.addEventListener('todoSubmitted', (event) => {
    const { formData } = event.detail;

    const processedData = new FormData();
    const steps = {};

    for (const [key, value] of formData.entries()) {
        if (key.startsWith('step')) {
            steps[key] = value;
        }

        else {
            processedData.append(key, value);
        }
    }

    if (Object.keys(steps).length > 0) {
        processedData.append('steps', JSON.stringify(steps));
    }

    const newCard = createTodoObject(formData);
    todoObjManager.addTodoObj(newCard);
})

const todoObjManager = (function() {
    const activeTodos = {};

    const addTodoObj = (todoObj) => activeTodos[todoObj.taskID] = todoObj;
    
    const getAllTodoObjs = () => activeTodos;

    const getTodoObj = (taskID) => activeTodos[taskID];

    const deleteTodoObj = (taskID) => delete activeTodos[taskID];

    return {addTodoObj, getAllTodoObjs, getTodoObj, deleteTodoObj};
})();

window.cardCreator = cardCreator();