import { TODO_OBJECT_MANAGER, createAndSaveTodoObj} from "../todoObjects/todoController";
import { renderSingleCard, renderAllCards } from "../ui/uiController";

export function handleNewTodo(formObject) {
    const newTodoObj = createAndSaveTodoObj(formObject);
    if (newTodoObj === null) {
        console.error(`${createAndSaveTodoObj.name} returned with null. Aborting task creation.`);
        return null;
    }

    renderSingleCard(newTodoObj);
}