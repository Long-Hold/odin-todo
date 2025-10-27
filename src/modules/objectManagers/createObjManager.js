export function createObjectManager() {
    const storedObjects = new Map();

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

        storedObjects.set(key.trim(), structuredClone(object));

        return structuredClone(storedObjects);
    }

    function getAllObjects() {
        return Array.from(storedObjects.values()).map(obj => structuredClone(obj));
    }

    function getObject(key) {
        if (typeof(key) !== 'string') {
            throw new TypeError('taskId must be a string');
        }

        if (!key.trim()) {
            throw new Error('taskId cannot be empty');
        }

        const clonedObject = structuredClone(storedObjects.get(key));

        if (clonedObject === undefined) {
            throw new ReferenceError(`Task (${key}) could not be found`);
        }

        return clonedObject;
    }

    function deleteObject(key) {
        storedObjects.delete(key);

        return structuredClone(storedObjects);
    }

    return {addTodo, getAllObjects, getObject, deleteObject}
}