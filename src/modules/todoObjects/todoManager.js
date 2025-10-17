export function createTodoManager() {
    const activeTodos = new Map();

    function addTodo(key, object) {
        if (typeof(key) !== 'string') {
            throw new TypeError('Key must be of type: String');
        }

        if (!key.trim()) {
            throw new Error('Key cannot be empty');
        }

        if (object instanceof Object === false) {
            throw new TypeError(`${object} must be an instance of: Object`);
        }

        activeTodos.set(key.trim(), structuredClone(object));

        return structuredClone(activeTodos);
    }

    function getAllObjects() {
        return Array.from(activeTodos.values()).map(obj => structuredClone(obj));
    }

    function getTodoObject(key) {
        if (typeof(key) !== 'string') {
            throw new TypeError('taskId must be a string');
        }

        if (!key.trim()) {
            throw new TypeError('taskId cannot be empty');
        }

        const clonedObject = structuredClone(activeTodos.get(key));

        if (clonedObject === undefined) {
            throw new ReferenceError(`Task (${key}) could not be found`);
        }

        return clonedObject;
    }

    function deleteTodoObject(key) {
        activeTodos.delete(key);

        return structuredClone(activeTodos);
    }

    return {addTodo, getAllObjects, getTodoObject, deleteTodoObject}
}