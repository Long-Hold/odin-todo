import { TODO_OBJECT_MANAGER, createAndSaveTodoObj, storeTodoObj } from "../../todoObjects/todoController";
import { TODO_FORM } from "../../forms/newTodoForm/todoFormController";
import { EVENTS } from "../../events/events";
import { saveTodo, getAllTodoObjects, getTodoObject} from "../../storage/todoStorageService";
import { renderTodoCard } from "../../ui/todoCards/todoUIController";

import { linktTodoToProject } from "../projects/projectStateController";

export function initializeTodoState() {
    loadTodoObjects();
    synchUIToState();

    TODO_FORM.addEventListener(EVENTS.TODO_SUBMITTED, (event) => {
        handleNewTodo(event.detail.data);
    });
}

export function updateTodosAfterProjectDeleted(taskId) {
    TODO_OBJECT_MANAGER.removeProperty(taskId, 'projects');
}

function loadTodoObjects() {
    const todosArray = getAllTodoObjects();

    if (todosArray.length === 0) {
        console.log('No saved todo objects found.');
        return;
    }

    todosArray.forEach((todo) => storeTodoObj(todo));
}

function synchUIToState() {
    const todosArray = TODO_OBJECT_MANAGER.getAllTodos();
    if (todosArray.length === 0) {
        console.log('No stored todos found to render');
        return;
    }

    todosArray.forEach((todo) => renderTodoCard(todo));
}

function handleNewTodo(formObject) {
    const todoObject = createAndSaveTodoObj(formObject);
    if (todoObject === null) {
        console.error(`${createAndSaveTodoObj.name} encountered an error. Aborting task creation.`);
        return null;
    }

    if (todoObject.projects) {
        const linkState = linktTodoToProject(todoObject.projects, todoObject.taskID);
        if (linkState === null) {
            console.error('Task could not be added to project, removing project from task.');
            delete todoObject.projects;
        }
    }

    const saveSuccess = saveTodo(todoObject.taskID, todoObject);
    if (saveSuccess === false) {
        console.error('Save to localStorage failed. Aborting process');
        TODO_OBJECT_MANAGER.deleteTodoObject(todoObject.taskID);
        return null;
    }

    renderTodoCard(todoObject);
}