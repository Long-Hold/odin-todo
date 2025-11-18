import { initializeProjectFormListeners } from "./modules/forms/projectForm/projectFormController";
import { initializeTodoFormListeners } from "./modules/forms/todoForm/todoFormController";

import { initializeProjectStates } from "./modules/state/projectState/projectStateController";
import { initializeTodoFormState } from "./modules/state/todoState/todoFormState";
import { initializeTodoObjState } from "./modules/state/todoState/todoObjectState";
import "./styles/styles.css";

initializeTodoFormState();
initializeProjectFormListeners();
initializeTodoFormListeners();
initializeTodoObjState();

initializeProjectStates();