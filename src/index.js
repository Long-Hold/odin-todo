import "./styles/styles.css";
import { initializeFormControl } from "./modules/forms/formController";
import { initializeStorageAndUIStates } from "./modules/state/stateController";
import { TODO_OBJECT_MANAGER } from "./modules/todoObjects/todoController";

initializeStorageAndUIStates();
initializeFormControl();

window.todoMan = TODO_OBJECT_MANAGER;