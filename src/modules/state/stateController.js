import { TODO_OBJECT_MANAGER, createAndSaveTodoObj, storeTodoObj} from "../todoObjects/todoController";
import { renderSingleCard, renderAllCards } from "../ui/uiController";
import { getAllTodoObjects } from "../storage/localStorageManager";

export function handleNewTodo(formObject) {
    const newTodoObj = createAndSaveTodoObj(formObject);
    if (newTodoObj === null) {
        console.error(`${createAndSaveTodoObj.name} returned with null. Aborting task creation.`);
        return null;
    }

    renderSingleCard(newTodoObj);
}

export function loadSavedTodos() {
    const todosObjArray = getAllTodoObjects();
    if (todosObjArray.length === 0) {
        return;
    }

    todosObjArray.forEach((obj) => storeTodoObj(obj));
}