export class Todo {
    constructor() { 
        this.completed = false;
        this.taskID = self.crypto.randomUUID();
    }

    markComplete() { this.completed = true; }
}

export function createTodoObject(formData) {
    const todo = new Todo();
    Object.assign(todo, formData);

    return todo;
}