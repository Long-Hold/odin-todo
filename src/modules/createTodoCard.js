/**Create a function that takes an object as its parameter
 * iterate through the object properties, and assign them to the template
 * as needed.
 */

export const createTodoCard = () => {
    const todoCard = {};

    const init = () => {
        const cardTemplate = document.getElementById('todo-card-template');
        todoCard.container = cardTemplate.content.cloneNode(true);

        todoCard.status = todoCard.container.querySelector('.todo-status')
        todoCard.title = todoCard.container.querySelector('.todo-title');
        todoCard.category = todoCard.container.querySelector('.project-category');
        todoCard.dueDate = todoCard.container.querySelector('time');

        todoCard.description = todoCard.container.querySelector('.description');

        todoCard.description = todoCard.container.querySelector('.todo-checklist');
    }

    const getTodoCard = () => { return todoCard.status; }

    return {init, getTodoCard};
}