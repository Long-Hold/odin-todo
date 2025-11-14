export function saveItem(key, item) {
    localStorage.setItem(normalizeKey(key), JSON.stringify(item));
}

export function deleteItem(key) {
    localStorage.removeItem(normalizeKey(key));
}

export function getItem(key) {
    const JSONItem = localStorage.getItem(normalizeKey(key));
    const parsedItem = JSON.parse(JSONItem);
    return parsedItem;
}

export function getAllPrefixedItems(keyPefix) {
    const itemsArray = [];

    for (let i = 0; i < localStorage.length; ++i) {
        const key = localStorage.key(i);
        if (key.startsWith(keyPefix)) { itemsArray.push(getItem(key)); }
    }

    return itemsArray;
}

function normalizeKey(key) {
    const lowerAndTrimmedKey = key.trim().toLowerCase();
    
    const spaceToUnderScoreRegex = /\s+/g;
    const whitespaceReplacedKey = lowerAndTrimmedKey.replace(spaceToUnderScoreRegex, "_");
    
    const normalizedKey = whitespaceReplacedKey.normalize('NFC');
    return normalizedKey;
}