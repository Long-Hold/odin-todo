const KEY_PREFIX = 'project_';

export function saveProject(key, projectObj) {
    const jsonData = JSON.stringify(projectObj);
    const processedKey = normalizeKey(key);
    const storageKey = `${KEY_PREFIX}${processedKey}`;
    // TODO: Save to local storage with custom key
    localStorage.setItem(storageKey, jsonData);
}

function normalizeKey(projectTitle) {
    const lowerAndTrimmed = projectTitle.trim().toLowerCase();

    // Replace ALL spaces with underscores
    const spaceToUnderscore = lowerAndTrimmed.replace(/\s+/g, "_");
    const normalized = spaceToUnderscore.normalize('NFC');
    return normalized;
}