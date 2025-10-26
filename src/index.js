import "./styles/styles.css";
import { initializeFormControl } from "./modules/forms/formController";
import { initializeStateListeners, initializeStorageAndUIStates } from "./modules/state/stateController";
import { TODO_OBJECT_MANAGER } from "./modules/todoObjects/todoController";
import { initializeProjectFormControl } from "./modules/forms/projectFormController";

initializeStorageAndUIStates();
initializeStateListeners();
initializeFormControl();
initializeProjectFormControl();

window.todoMan = TODO_OBJECT_MANAGER;