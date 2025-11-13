export function createObjectManager() {
    const storedObjects = new Map();

    function addObject(key, object) {
        storedObjects.set(key.trim(), object);

        return storedObjects;
    }

    function getAllObjects() {
        return Array.from(storedObjects.values());
    }

    function getObject(key) {
        return storedObjects.get(key);
    }

    function deleteObject(key) {
        storedObjects.delete(key);

        return storedObjects;
    }

    return {addObject, getAllObjects, getObject, deleteObject}
}