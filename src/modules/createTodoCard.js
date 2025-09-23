import { format, comapreAsc, isMatch, isValid, set } from "date-fns"
import { de } from "date-fns/locale";

const cardCreator = (function() {
    const template = document.getElementById('todo-card-template');
    let todoCard;

    const initializeTemplate = () => { todoCard = template.content.cloneNode(true); }

    const setTitle = (title) => {
        if (typeof(title) !== 'string') {
            throw new TypeError('Title must be of type: String');
        }
        if (title.trim().length === 0) {
            throw new Error('Title cannot be empty');
        }
        
        if (title.length > 64) {
            throw new Error('Title cannot be longer than 64 characters');
        }
        todoCard.querySelector('todo-title').textContent = title; 
    }
})

export {cardCreator};