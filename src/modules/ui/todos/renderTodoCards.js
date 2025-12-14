import { format } from "date-fns";

const TODO_CARD_TEMPLATE = document.getElementById('todo-card-template');
const TODO_CARD_DISPLAY = document.getElementById('todo-card-display');
const CARD_CHECKLIST_ITEM_TEMPLATE = document.getElementById('card-checklist-item-template');

export function renderTodoCards(todoObjectArray) {
    TODO_CARD_DISPLAY.replaceChildren();

    const sortedTodoArray = [...todoObjectArray].sort((a, b) => a.createdAt - b.createdAt);
    sortedTodoArray.forEach((todo) => {
        const todoTemplateClone = TODO_CARD_TEMPLATE.content.cloneNode(true);

        const article = todoTemplateClone.querySelector('.todo-card');
        article.dataset.todoId = todo.id;

        const statusButton = todoTemplateClone.querySelector('.todo-status');
        if (todo.completed) {
            statusButton.querySelector('use').setAttribute('href', '#circle-filled');
        }

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
            todo.checklist.forEach((text, id) => {
                const checklistElement = createChecklistItem(id, text);
                checklist.appendChild(checklistElement);
            });
        }

        TODO_CARD_DISPLAY.appendChild(todoTemplateClone);
    });
}

function createChecklistItem(itemId, itemText) {
    const checklistItem = CARD_CHECKLIST_ITEM_TEMPLATE.content.cloneNode(true);

    const div = checklistItem.querySelector('div');
    const input = checklistItem.querySelector('input');
    const label = checklistItem.querySelector('label');

    div.dataset.itemId = itemId;

    input.id = itemId;
    input.name = itemId;

    label.htmlFor = itemId;
    label.textContent = itemText;

    return checklistItem;
}