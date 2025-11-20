import { format } from "date-fns";

const TODO_CARD_TEMPLATE = document.getElementById('todo-card-template');
const TODO_CARD_DISPLAY = document.getElementById('todo-card-display');

export function renderTodoCards(todoObjectArray) {
    TODO_CARD_DISPLAY.replaceChildren();
    todoObjectArray.forEach((todo) => {
        const todoTemplateClone = TODO_CARD_TEMPLATE.content.cloneNode(true);

        const article = todoTemplateClone.querySelector('.todo-card');
        article.dataset.todoId = todo.id;

        const statusButton = todoTemplateClone.querySelector('.todo-status');
        statusButton.textContent = todo.completed ? 'Completed' : 'Incomplete';

        const title = todoTemplateClone.querySelector('.todo-title');
        title.textContent = todo.title;

        const priority = todoTemplateClone.querySelector('.todo-priority');
        priority.textContent = todo.priority;

        const project = todoTemplateClone.querySelector('.todo-project');
        project.textContent = todo.project || '';

        const deadline = todoTemplateClone.querySelector('time');
        if (todo.deadline === null) { deadline.textContent = ''; }
        else if (todo.deadline) {
            deadline.setAttribute('datetime', todo.deadline);
            deadline.textContent = format(new Date(todo.deadline), 'MMM dd, yyyy');
        }

        const description = todoTemplateClone.querySelector('.todo-description');
        description.textContent = todo.description;
        
        if (todo.checklist) {
            const checklist = todoTemplateClone.querySelector('.todo-checklist');
            todo.checklist.forEach((item) => {
                const checklistElement = createChecklistItem(item);
                checklist.appendChild(checklistElement);
            });
        }

        TODO_CARD_DISPLAY.appendChild(todoTemplateClone);
    });
}

function createChecklistItem(checklistItem) {
    const checklistId = `checklist_${crypto.randomUUID()}`;

    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.id = checklistId;
    checkboxInput.name = checklistId;

    const label = document.createElement('label');
    label.htmlFor = checklistId;
    label.textContent = checklistItem;

    const div = document.createElement('div');
    div.appendChild(checkboxInput);
    div.appendChild(label);

    return div;
}