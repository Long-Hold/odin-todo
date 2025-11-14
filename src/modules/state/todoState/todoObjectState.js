import { EVENTS } from "../../events/events";
import { TODO_FORM } from "../../forms/todoForm/todoFormController";
import { createTodoFromFormData } from "../../objects/todos/todoObjectController";
import { TODO_OBJECT_MANAGER } from "../../objects/todos/todoObjectManager";

export function initializeTodoObjState() {
    TODO_FORM.addEventListener(EVENTS.TODO_FORM_SUBMITTED, (event) => {
        const todoObject = createTodoFromFormData(event.detail.data);
        TODO_OBJECT_MANAGER.addTodo(todoObject.todoId, todoObject);
    })
}