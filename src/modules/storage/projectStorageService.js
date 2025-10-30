import { normalizeKey, saveObject } from "./localStorageUtils";
const KEY_PREFIX = 'project_';

export function saveProject(key, project) {
    const storageKey = `${KEY_PREFIX}${normalizeKey(key)}`;

    try {
        saveObject(storageKey, project);
    } catch (error) {
        console.error(`${saveProject.name} has caught an Error: ${error}`);
        return null;
    }

    return true;
}