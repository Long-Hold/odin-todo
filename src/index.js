import "./styles/styles.css";

import { initializeTodoFormControl } from "./modules/forms/newTodoForm/todoFormController";
import { initializeProjectFormControl } from "./modules/forms/newProjectForm/projectFormController";

import { initializeTodoState } from "./modules/state/todos/todoStateController";
import { initializeProjectState } from "./modules/state/projects/projectStateController";

initializeTodoState();
initializeProjectState();

initializeTodoFormControl();
initializeProjectFormControl();