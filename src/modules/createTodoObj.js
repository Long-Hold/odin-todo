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

export function createTodoObject(formData) {
    /**Composes object properties based on the non-empty fields in the fromData
     * This allows the class Todo to account for optional fields that have been filled in,
     * or left blank
     */
    const card = new Todo();
    for (const [key, value] of formData.entries()) {
        if (value) {
            card[key] = value;
        }
    }

    return card;
}