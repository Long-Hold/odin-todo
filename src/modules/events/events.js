export const EVENTS = {
    TODO_FORM_SUBMITTED: "todo:formSubmitted",
    TODO_CREATED: "todo:created",
    PROJECT_FORM_SUBMITTED: "project:formSubmitted",
    PROJECT_CREATED: "project:created",
    PROJECT_ASSIGNED: "project:assigned",
    PROJECT_DELETE_REQUESTED: "project:deleteRequested",
    PROJECT_DELETED: "project:deleted",

    /**Signals that a user wants to filter the Todo cards
     * displayed on screen by project. Only todo's with the respective
     * tab that was clicked will be displayed when this event is emitted.
     */
    PROJECT_TAB_CLICKED: "project:tabClicked",
}