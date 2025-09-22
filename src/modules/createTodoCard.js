/**Create a function that takes an object as its parameter
 * iterate through the object properties, and assign them to the template
 * as needed.
 */
export class TodoCard {
    #template = document.getElementById('todo-card-template').content.cloneNode(true);

    title = this.#template.querySelector('.todo-title');
    priority = this.#template.querySelector('.priority');
    project = this.#template.querySelector('.project-category');
    deadline = this.#template.querySelector('time');
    description = this.#template.querySelector('.description');
    checklistSteps = this.#template.querySelector('.todo-checklist');
    taskID = this.#template.querySelector('.todo-card');

    constructor(taskID) {
        this.taskID.dataset.taskid = taskID;
    }

    set title(title) {
        if (typeof(title) !== 'string') {
            throw new TypeError('Title must be a string');
        }

        if (title.trim().length === 0) {
            throw new Error('Title cannot be empty or contain only whitespace');
        }

        if (title.length > 64) {
            throw new RangeError('Title cannot exceed 64 characters');
        }

        this.title.textContent = title.trim();
    }

    get template() {
        return this.#template;
    }
}