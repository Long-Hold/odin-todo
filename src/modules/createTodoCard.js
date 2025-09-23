import { format } from "date-fns"

const cardCreator = (function() {
    const template = document.getElementById('todo-card-template');
    const validPriorities = ['Low','Medium','High'];
    let todoCard;

    const initializeTemplate = () => { todoCard = template.content.cloneNode(true); }

    const getTodoCard = () => todoCard;

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

        todoCard.querySelector('.todo-title').textContent = title; 
    }

    const setPriority = (priority) => {
        const text = priority.trim();
        if (typeof(text) !== 'string') {
            throw new TypeError('Priority must be passed as string');
        }

        if (text.length === 0) {
            throw new Error('Priority field cannot be blank');
        }

        if (!validPriorities.includes(text)) {
            throw new TypeError('Invalid string passed as priority');
        }

        todoCard.querySelector('.priority').textContent = text;
    }

    const setProject = (project) => {
        const text = project.trim();

        if (typeof(text) !== 'string') {
            throw new TypeError('Project must be passed as string');
        }

        todoCard.querySelector('.project-category').textContent = text;
    }

    const setDeadline = (date) => {
        if ((date instanceof Date) === false) {
            throw new TypeError('Date must be passed as Date Object');
        }

        if (isNaN(date.getTime())) {
            throw new Error('Invalid Date object passed');
        }

        todoCard.querySelector('time').textContent = format(date, 'yyyy-MM-dd');
    }
    return {initializeTemplate, getTodoCard, setTitle, setProject, setPriority, setDeadline};
})

export {cardCreator};