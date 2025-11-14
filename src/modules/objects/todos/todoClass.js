export class Todo {
    constructor(title, priority, project = null , deadline = null, description = null, checklist = null) {
        this.todoId = `todo_${crypto.randomUUID()}`;
        this.completed = false;
        this.title = title;
        this.priority = priority;
        this.project = project;
        this.deadline = deadline;
        this.description = description;
        this.checklist = checklist;
    }
}