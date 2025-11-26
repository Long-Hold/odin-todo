export const EVENTS = {
    /**An event that signals the New Todo Form has sent a POST request.
     * 
     * State managers listen for this event and use the event's data to construct
     * new Todo Objects.
     */
    TODO_FORM_SUBMITTED: "todo:formSubmitted",

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
    
    /**An event that signals the New Project form has sent a POST request.
     * 
     * State managers listen for this event and use the event's data to construct
     * new Project Objects.
     */
    PROJECT_FORM_SUBMITTED: "project:formSubmitted",

    /**An event that signals a project has been assigned to a Todo object.
     * 
     * State managers emit this event when a Project has been assigned to an object.
     * 
     * The Project State manager listens for this event to link the assigned project
     * and todo object together.
     */
    PROJECT_ASSIGNED: "project:assigned",

    /**An event that signals an HTML element representing a Project Object has been
     * deleted by the user.
     * 
     * State managers listen for this event and invoke thei respective Object manager delete
     * methods.
     */
    PROJECT_DELETE_REQUESTED: "project:deleteRequested",

    /**An event that signals an internal Project Object has been deleted from
     * it's Object manager.
     * 
     * State managers listen for this event to unlink any Objects that had a relationship
     * with the deleted Project Object.
     */
    PROJECT_DELETED: "project:deleted",

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