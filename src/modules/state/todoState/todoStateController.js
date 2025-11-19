import { initializeTodoFormState } from "./todoFormState";
import { initializeTodoObjState } from "./todoObjectState";
import { initializeTodoUIState } from "./todoUIState";

export function initializeTodoStates() {
    initializeTodoUIState();
    initializeTodoFormState();
    initializeTodoObjState();
}