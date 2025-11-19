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

        const priority = todoTemplateClone.querySelector('.priority');
        priority = todo.priority;

        const project = todoTemplateClone.querySelector('.project-category');
        project.textContent = todo.project || '';

        const deadline = todoTemplateClone.querySelector('time');
        if (todo.deadline === null) { deadline.textContent = ''; }
        else if (todo.deadline) {
            deadline.setAttribute('datetime', todo.deadline);
            deadline.textContent = format(new Date(todo.deadline), 'MMM dd, yyyy');
        }

        TODO_CARD_DISPLAY.appendChild(todoTemplateClone);
    });
}