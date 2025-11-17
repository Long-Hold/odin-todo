export const TODO_ID_PREFIX = 'todo_';

export class Todo {
    static ID_PREFIX = 'todo_';
    
    constructor(title, priority, project = null , deadline = null, description = null, checklist = null) {
        this.todoId = `${Todo.ID_PREFIX}${crypto.randomUUID()}`;
        this.completed = false;
        this.title = title;
        this.priority = priority;
        this.project = project;
        this.deadline = deadline;
        this.description = description;
        this.checklist = checklist;
    }
}