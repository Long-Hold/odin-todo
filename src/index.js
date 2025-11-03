import "./styles/styles.css";
import { initializeTodoFormControl } from "./modules/forms/newTodoForm/todoFormController";
import { initializeStateListeners, initializeStorageAndUIStates } from "./modules/state/stateController";
import { TODO_OBJECT_MANAGER } from "./modules/todoObjects/todoController";
import { initializeProjectFormControl } from "./modules/forms/projectFormController";

initializeStorageAndUIStates();
initializeStateListeners();
initializeTodoFormControl();
initializeProjectFormControl();

window.todoMan = TODO_OBJECT_MANAGER;