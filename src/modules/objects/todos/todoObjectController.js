import { Todo } from "./todoClass";

export function createTodoFromFormData(formData) {
    const title = formData.get('title').trim();
    const priority = formData.get('priority').trim();
    const project = formData.get('projects').trim();
    const deadline = formData.get('deadline').trim();
    const description = formData.get('description').trim();
    const checklist = Array.from(formData.querySelectorAll('checklistItem'));

    return new Todo(title, priority, project, deadline, description, checklist);
}

export function createTodoFromLocalStorage(data) {
    //TODO
}