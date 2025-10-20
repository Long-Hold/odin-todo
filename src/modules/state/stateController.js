import { TODO_FORM, processSubmit, resetAndCloseForm } from "../forms/formController";
import { TODO_OBJECT_MANAGER, createAndSaveTodoObj} from "../todoObjects/todoController";
import { renderSingleCard, renderAllCards } from "../ui/uiController";

function newTodoFormSubmitListener() {
    TODO_FORM.addEventListener('submit', (event) => {
        const formObject = processSubmit(event);
        if (formObject === null) {
            console.error('formObject returned with null. Aborting task creation.');
            return null;
        }

        const newTodoObj = createAndSaveTodoObj(formObject);
        if (newTodoObj === null) {
            console.error(`${createAndSaveTodoObj.name} returned with null. Aborting task creation.`);
            return null;
        }

        renderSingleCard(newTodoObj);
        
        resetAndCloseForm();
    })
}

export function initializeNewTodoState() {
    newTodoFormSubmitListener();
}