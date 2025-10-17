export class Todo {
    #completed;
    #taskID;

    constructor() { 
        this.#completed = false;
        this.#taskID = self.crypto.randomUUID();
    }

    get completed() { return this.#completed; }

    get taskID() { return this.#taskID; }

    markComplete() { this.#completed = true; }
}

export function createTodoObject(formData) {
    const todo = new Todo();
    Object.assign(todo, formData);

    return todo;
}