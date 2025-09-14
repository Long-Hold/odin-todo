class TodoCard {
    #title;
    #priority;

    constructor(title, priority) {
        this.#title = title;
        this.#priority = priority;
    }

    get title() { return this.#title; }
    get priority() { return this.#priority; }
}

export function createTodoCard(fromData) {
    return new TodoCard(formData.get('title'), formData.get('priority'));
}