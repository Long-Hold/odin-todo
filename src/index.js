import { createTodoObject } from "./modules/createTodoObj";
import { FormControl } from "./modules/formController";

FormControl.initializeEventListeners();

document.addEventListener('todoSubmitted', (event) => {
    const { formData } = event.detail;
    const newCard = createTodoObject(formData);
    todoManager.addNewTodo(newCard);
})

const todoManager = (function() {
    const activeTodos = {};

    const addNewTodo = (todoObj) => activeTodos[todoObj.taskID] = todoObj;
    
    const getActiveTodos = () => activeTodos;

    return {addNewTodo, getActiveTodos};
})();

console.log(todoManager.getActiveTodos());