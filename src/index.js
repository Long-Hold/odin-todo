import { createTodoObject } from "./modules/createTodoObj";
import { FormControl } from "./modules/formController";

FormControl.initializeEventListeners();

document.addEventListener('todoSubmitted', (event) => {
    const { formData } = event.detail;
    const newCard = createTodoObject(formData);
    todoObjManager.addNewTodo(newCard);
})

const todoObjManager = (function() {
    const activeTodos = {};

    const addTodoObj = (todoObj) => activeTodos[todoObj.taskID] = todoObj;
    
    const getTodoObjs = () => activeTodos;

    const deleteTodoObj = (taskID) => delete activeTodos.taskID;

    return {addTodoObj, getTodoObjs, deleteTodoObj};
})();