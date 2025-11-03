import { getAllObjects, normalizeKey, saveObject, getObject } from "./localStorageUtils";

const KEY_PREFIX = 'todo_';

export function saveTodo(key, todo) {
    const storageKey = `${KEY_PREFIX}${normalizeKey(key)}`;

    try {
        saveObject(storageKey, todo);
    } catch (error) {
        console.error(`${saveTodo.name} has caught an Error: ${error}`);
        return null;
    }

    return true;
}

export function getAllTodoObjects() {
    return getAllObjects(KEY_PREFIX);
}

export function getTodoObject(taskId) {
    const storageKey = `${KEY_PREFIX}${normalizeKey(taskId)}`;
    return getObject(storageKey);
}