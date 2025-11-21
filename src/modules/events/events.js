export const EVENTS = {
    TODO_FORM_SUBMITTED: "todo:formSubmitted",
    TODO_CREATED: "todo:created",

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

    /**Signals that all todo cards should be display. */
    TAB_DISPLAY_ALL: "tab:displayAll",

    /**Signals to display all Todo's with a deadline of current day. */
    TAB_DISPLAY_TODAY: "tab:displayToday",

    /**Signals to display all Todo's with a deadline date in range of current week. */
    TAB_DISPLAY_WEEK: "tab:displayWeek",
}