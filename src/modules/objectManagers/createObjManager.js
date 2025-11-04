export function createObjectManager() {
    const storedObjects = new Map();

    function addObject(key, object) {
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
        const clonedObject = structuredClone(storedObjects.get(key));

        return clonedObject;
    }

    function deleteObject(key) {
        storedObjects.delete(key);

        return structuredClone(storedObjects);
    }

    return {addObject, getAllObjects, getObject, deleteObject}
}