export const EVENTS = {
    TODO_FORM_SUBMITTED: "todo:formSubmitted",
    TODO_CREATED: "todo:created",

    /**This event signals that the delete button on a todo card has been clicked.
     * 
     * When this event is emitted, state listeners listening for it begin deleting
     * the respective object the card was made from.
     * 
     * This event passses the Todo Object Id stored in the card metadata.
     */
    TODO_DELETE_REQUESTED: "todo:deleteRequested",

    /**This event signals that a Todo Object has been deleted.
     * 
     * When this event is emitted, state listeners listening for it will begin
     * unlinking this object's ID from any data structures that are tracking it.
     * 
     * This event passes the Todo Object Id.
     */
    TODO_DELETED: "todo:deleted",
    
    PROJECT_FORM_SUBMITTED: "project:formSubmitted",
    PROJECT_CREATED: "project:created",
    PROJECT_ASSIGNED: "project:assigned",
    PROJECT_DELETE_REQUESTED: "project:deleteRequested",
    PROJECT_DELETED: "project:deleted",

    /**Signals that a filter tab has been selected.
     * 
     * This event's data stores the type of filter clicked, and what type of
     * filtering the render engine should use.
     */
    FILTER_CHANGED: "filter:changed",

    /**A synchronization event that signals the DOM to be refreshed with
     * current data from the internal state.
     * 
     * State managers listen for this event and invoke their DOM functions with relevant information
     * retrieved from localStorage and / or object managers.
     * 
     * Triggered by CRUD operations.
     */
    UPDATE_DISPLAY: "update:display",
}