export function createChecklistManager(checklistNode) {
    if (checklistNode instanceof HTMLElement === false) {
        throw new TypeError(`Expected HTMLElement. Received ${typeof(checklistNode)}`);
    }
    
    const checklistContainer = checklistNode;
}