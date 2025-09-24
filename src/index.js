import "./styles/styles.css";
import { createTodoObject } from "./modules/createTodoObj";
import { FormControl } from "./modules/formController";
import { cardCreator } from "./modules/createTodoCard";

FormControl.initializeEventListeners();

document.addEventListener('todoSubmitted', (event) => {
    const {data} = event.detail;
    const newCard = createTodoObject(data);
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

window.todoObjManager = todoObjManager;
window.cardCreator = cardCreator();