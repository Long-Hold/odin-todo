import { createObjectManager } from "../../objectManagers/createObjManager";

const {
    addObject: addTodo,
    getAllObjects: getAllTodos,
    getObject: getTodo,
    deleteObject: deleteTodo,
} = createObjectManager();

const TODO_OBJECT_MANAGER = {
    addTodo,
    getAllTodos,
    getTodo,
    deleteTodo,
};

TODO_OBJECT_MANAGER.clearProperty = function (propertyName, key ) {
    /**This function clears the specified property from propertyName, if it can be found,
     * by settings it's value to null.
     * 
     * I retrieve the object by using a key from the Map that stores them to ensure
     * only objects in the manager's set() are modified, as this manager exclusively works with
     * todo objects and is not a general use object modifier method.
     */
}