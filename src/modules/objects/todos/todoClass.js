export class Todo {
    static ID_PREFIX = 'todo_';

    static fromJSON(jsonObj) {
        const todo = Object.create(Todo.prototype);
        todo.id = jsonObj.id;
        todo.completed = jsonObj.completed;
        todo.title = jsonObj.title;
        todo.priority = jsonObj.priority;
        todo.project = jsonObj.project;
        todo.deadline = jsonObj.deadline;
        todo.description = jsonObj.description;
        todo.checklist = jsonObj.checklist ? new Map(jsonObj.checklist) : null;

        return todo;
    }

    constructor(title, priority, project = null , deadline = null, description = null, checklist = null) {
        this.id = `${Todo.ID_PREFIX}${crypto.randomUUID()}`;
        this.completed = false;
        this.title = title;
        this.priority = priority;
        this.project = project;
        this.deadline = deadline;
        this.description = description;
        this.checklist = checklist;
    }

    toJSON() {
        return {
            id: this.id,
            completed: this.completed,
            title: this.title,
            priority: this.priority,
            project: this.project,
            deadline: this.deadline,
            description: this.description,
            checklist: this.checklist ? Array.from(this.checklist) : null,
        }
    }
}