import { initializeProjectFormListeners } from "./modules/forms/projectForm/projectFormController";
import { initializeTodoFormListeners } from "./modules/forms/todoForm/todoFormController";
import { initializeProjectObjectState } from "./modules/state/projectState/projectObjectState";
import { initializeTodoFormState } from "./modules/state/todoState/todoFormState";
import { initializeTodoObjState } from "./modules/state/todoState/todoObjectState";
import "./styles/styles.css";

initializeTodoFormState();
initializeProjectFormListeners();
initializeTodoFormListeners();
initializeTodoObjState();
initializeProjectObjectState();