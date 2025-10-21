import "./styles/styles.css";
import { initializeFormControl } from "./modules/forms/formController";
import { TODO_OBJECT_MANAGER } from "./modules/todoObjects/todoController";

initializeFormControl();

window.todoMan = TODO_OBJECT_MANAGER;