import { format, comapreAsc, isMatch, isValid, set } from "date-fns"
import { de } from "date-fns/locale";

export class TodoCard {
    static #validPriorities = ['low','medium','high'];

    #template = document.getElementById('todo-card-template').content.cloneNode(true);

    #title = this.#template.querySelector('.todo-title');
    #priority = this.#template.querySelector('.priority');
    #project = this.#template.querySelector('.project-category');
    #deadline = this.#template.querySelector('time');
    #description = this.#template.querySelector('.description');
    #checklistSteps = this.#template.querySelector('.todo-checklist');
    #taskID = this.#template.querySelector('.todo-card');

    constructor(taskID) {
        this.#taskID.dataset.taskid = taskID;
    }

    get template() { return this.#template; }

    get title() { return this.#title; }

    get priority() { return this.#priority; }

    get project() { return this.#project; }

    get deadline() { return this.#deadline; }

    get description() { return this.#description; }

    get checklistSteps() { return this.#checklistSteps; }

    get taskID() { return this.#taskID.dataset.taskid; }

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

        this.#title.textContent = title.trim();
    }

    set priority(priority) {
        if (TodoCard.#validPriorities.includes(priority.toLowerCase())) {
            this.#priority.textContent = priority;
        }

        else {
            throw new Error('Invalid priority passed to setter');
        }
    }

    set project(project) {
        this.#project = project;
    }

    set deadline(deadline) {
        if (!isMatch(deadline, 'yyyy-mm-dd')){
            throw new TypeError('Deadline format must be yyyy-mm-dd');
        }

        this.#deadline = deadline;
    }
}