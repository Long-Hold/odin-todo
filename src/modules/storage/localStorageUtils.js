export function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export function normalizeKey(keyText) {
    const lowerAndTrimmed = keyText.trim().toLowerCase();

    // Replace ALL spaces with underscores
    const spaceToUnderscore = lowerAndTrimmed.replace(/\s+/g, "_");
    const normalized = spaceToUnderscore.normalize('NFC');
    return normalized;
}

export function saveObject(key, item) {
    if (!key.trim()) {
        throw new Error ('Key cannot be blank or whitespace only');
    }

    if (item instanceof Object === false) {
        throw new TypeError(`Item must be an Object. Received ${typeof(item)}`);
    }

	localStorage.setItem(key, JSON.stringify(item));
}