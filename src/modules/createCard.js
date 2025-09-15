class Todo {
    #completed;

    constructor() { this.#completed = false; }

    get completed() { return this.#completed; }

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