export function createChecklistManager(checklistNode, template) {
    if (checklistNode instanceof HTMLElement === false) {
        throw new TypeError(`Expected HTMLElement. Received ${typeof(checklistNode)}`);
    }
    
    if (template instanceof HTMLTemplateElement === false) {
        throw new TypeError(`Expected HTMLTemplateElement. Received ${typeof(template)}`);
    }

    const checklistContainer = checklistNode;
    const inputTemplate = template;
}