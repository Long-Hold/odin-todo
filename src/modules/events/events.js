export const EVENTS = {
    TODO_FORM_SUBMITTED: "todo:formSubmitted",
    TODO_CREATED: "todo:created",

    /**This event signals that the delete button on a todo card has been clicked.
     * 
     * When this event is emitted, state listeners listening for it begin deleting
     * the respective object the card was made from.
     */
    TODO_DELETE_REQUESTED: "todo:deleteRequested",

    /**This event signals that specific Todo objects are being requested by
     * a filter button, either a project tab button or the default filter buttons.
     * 
     * The data carried by this event carries an array of todo object id's that can be used
     * to retrieve the relevant objects from the todo object manager for rendering to the UI
     */
    TODO_FILTER_REQUESTED: "todo:filterRequested",
    
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

    /**Signals that one of the general-use filter tab buttons have been clicked. */
    TAB_GENERAL_CLICKED: "tab:generalClicked",
}