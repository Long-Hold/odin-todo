class Todo {
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

export function createTodoCard(formData) {
    const card = new Todo();
    for (const [key, value] of formData.entries()) {
        if (value) {
            card[key] = value;
        }
    }

    return card;
}