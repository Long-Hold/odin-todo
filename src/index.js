import "./styles/styles.css";
import { initializeFormControl } from "./modules/forms/formController";
import { TODO_OBJECT_MANAGER } from "./modules/todoObjects/todoController";
import { initializeNewTodoState } from "./modules/state/stateController";

initializeFormControl();
initializeNewTodoState();

window.todoMan = TODO_OBJECT_MANAGER;