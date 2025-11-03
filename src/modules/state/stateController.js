import { TODO_OBJECT_MANAGER, createAndSaveTodoObj, storeTodoObj} from "../todoObjects/todoController";
import { renderSingleCard, renderAllCards } from "../ui/todoCards/uiController";
import { getAllTodoObjects, saveToLocalStorage } from "../storage/localStorageManager";
import { EVENTS } from "../events/events";
import { initializeProjectState } from "./projects/projectStateController";

export function initializeStorageAndUIStates() {
    loadSavedTodos();
    synchUIToState();
}

export function initializeStateListeners() {
    document.addEventListener(EVENTS.FORM_SUBMITTED, (event) => {
        handleNewTodo(event.detail.data);
    });

    initializeProjectState();
}

function loadSavedTodos() {
    const todosObjArray = getAllTodoObjects();
    if (todosObjArray.length === 0) {
        return;
    }

    todosObjArray.forEach((obj) => storeTodoObj(obj));
}

function synchUIToState() {
    const todoObjArray = TODO_OBJECT_MANAGER.getAllTodos();
    if (todoObjArray.length === 0) {
        console.log('No todoObjects found');
        return;
    }
    renderAllCards(todoObjArray);
}

function handleNewTodo(formObject) {
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