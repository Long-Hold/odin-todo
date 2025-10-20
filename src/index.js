import "./styles/styles.css";
import { createCardCreator } from "./modules/createTodoCard";
import { initializeFormControl } from "./modules/forms/formController";
import { TODO_OBJECT_MANAGER, initializeTodoController } from "./modules/todoObjects/todoController";

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

initializeFormControl();
initializeTodoController();

window.todoMan = TODO_OBJECT_MANAGER;