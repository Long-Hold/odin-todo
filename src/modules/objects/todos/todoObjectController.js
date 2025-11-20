import { Todo } from "./todoClass";

export function createTodoFromFormData(formData) {
    const title = formData.get('title').trim();
    const priority = formData.get('priority').trim();
    const project = formData.get('projects')?.trim() || null;
    const deadline = formData.get('deadline')?.trim() || null;
    const description = formData.get('description')?.trim() || null;

    /**If there are no checklist items, then checklist will remain as null.
     * If there are any checklist items, then I iterate through each entry and trim the strings
     * before assigning them to checklist.
     * 
     * This way the checklist property is assigned null on the object rather than as an empty
     * array.
     */
    const checklistItems = Array.from(formData.getAll('checklistItem'));
    let checklist = null;
    if (checklistItems.length > 0) {
        checklist = new Map();
        checklistItems.forEach((item) => {
            const itemId = `checklist_${crypto.randomUUID()}`;
            checklist.set(itemId, item.trim());
        });
    }

    return new Todo(title, priority, project, deadline, description, checklist);
}

export function createTodoFromLocalStorage(jsonObj) {
    return Todo.fromJSON(jsonObj);
}