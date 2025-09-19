/**Create a function that takes an object as its parameter
 * iterate through the object properties, and assign them to the template
 * as needed.
 */

const todoDisplayer = () => {
    const todoCard = {};

    const init = () => {
        const cardTemplate = document.getElementById('todo-card-template');
        todoCard.container = cardTemplate.contentEditable.cloneNode(true);
    }
}