import { initializeProjectFormListeners } from "./modules/forms/projectForm/projectFormController";
import { initializeTodoFormListeners } from "./modules/forms/todoForm/todoFormController";
import { initializeTodoObjState } from "./modules/state/todoState/todoObjectState";
import "./styles/styles.css";

initializeProjectFormListeners();
initializeTodoFormListeners();
initializeTodoObjState();