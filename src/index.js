import { initializeProjectFormListeners } from "./modules/forms/projectForm/projectFormController";
import { initializeTodoFormListeners } from "./modules/forms/todoForm/todoFormController";
import { broadcastProjects } from "./modules/state/projectState/projectObjectState";

import { initializeProjectStates } from "./modules/state/projectState/projectStateController";
import { initializeTodoStates } from "./modules/state/todoState/todoStateController";

import { initializeFilterTabListeners } from "./modules/state/filterState/filterStateController";

import "./styles/styles.css";

initializeProjectFormListeners();
initializeTodoFormListeners();

initializeProjectStates();
initializeTodoStates();

initializeFilterTabListeners();

/**After the todo and project states have been initialized,
 * I manually broadcast their data out for the listeners of respective objects to catch
 */
broadcastProjects();