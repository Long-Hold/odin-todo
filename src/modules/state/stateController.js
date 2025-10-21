import { TODO_OBJECT_MANAGER, createAndSaveTodoObj, storeTodoObj} from "../todoObjects/todoController";
import { renderSingleCard, renderAllCards } from "../ui/uiController";
import { getAllTodoObjects, saveToLocalStorage } from "../storage/localStorageManager";

export function handleNewTodo(formObject) {
    const newTodoObj = createAndSaveTodoObj(formObject);
    if (newTodoObj === null) {
        console.error(`${createAndSaveTodoObj.name} returned with null. Aborting task creation.`);
        return null;
    }

    try {
        saveToLocalStorage(newTodoObj.taskID, newTodoObj);
    } catch (error) {
        // If an error occurs while saving to localStorage, delete the object from the map
        console.error(`An error occured saving task to localStorage: ${error}`);
        TODO_OBJECT_MANAGER.deleteTodoObject(newTodoObj.taskID);
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