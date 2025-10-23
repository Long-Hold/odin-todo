import "./styles/styles.css";
import { initializeFormControl } from "./modules/forms/formController";
import { initializeStateListeners, initializeStorageAndUIStates } from "./modules/state/stateController";
import { TODO_OBJECT_MANAGER } from "./modules/todoObjects/todoController";
import { initializeNewProjectListeners } from "./modules/projects/projectController";

initializeStorageAndUIStates();
initializeStateListeners();
initializeFormControl();
initializeNewProjectListeners();

window.todoMan = TODO_OBJECT_MANAGER;