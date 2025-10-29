import { normalizeKey } from "./localStorageUtils";
const KEY_PREFIX = 'project_';

export function saveProject(key, projectObj) {
    const jsonData = JSON.stringify(projectObj);
    const processedKey = normalizeKey(key);
    const storageKey = `${KEY_PREFIX}${processedKey}`;
    localStorage.setItem(storageKey, jsonData);
}