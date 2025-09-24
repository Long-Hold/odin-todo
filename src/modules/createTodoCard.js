import { format, startOfDay, startOfToday } from "date-fns"

const cardCreator = (function() {
    const template = document.getElementById('todo-card-template');
    const validPriorities = ['Low','Medium','High'];
    let todoCard;

    const initializeTemplate = () => { todoCard = template.content.cloneNode(true); }

    const getTodoCard = () => todoCard;

    const setCardID = (taskid) => {
        const trimmedID = taskid.trim();

        if (typeof(trimmedID) !== 'string') {
            throw new TypeError('Task ID must be a string');
        }

        if (trimmedID.length === 0) {
            throw new Error('Task ID cannot be blank');
        }

        todoCard.querySelector('.todo-card').dataset.taskid = taskid;
    }

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

        if (startOfDay(date) < startOfToday()) {
            throw new Error('Deadline cannot be past date');
        }

        todoCard.querySelector('time').textContent = format(date, 'yyyy-MM-dd');
    }

    const setDescription = (description) => {
        if (typeof(description) !== 'string') {
            throw new TypeError('Description must be passed as string');
        }

        todoCard.querySelector('.description').textContent = description;
    }

    const setChecklistSteps = (steps) => {
        /**Each step requires the following markup:
         *  - Checkbox button
         *  - Label
         *  - Encapsulating div
         * 
         * The steps parameter is expected to be of Type: Object.
         * Each step is expected to be stored as Key: Value where:
         *      Step : Step Description
         */

        for (const [key, value] of Object.entries(steps)) {
            const checkListStep = createCheckboxContainer(value);
            todoCard.querySelector('.checklist-container').append(checkListStep);
        }
    }

    return {
        initializeTemplate, getTodoCard, setTitle, 
        setProject, setPriority, setDeadline,
        setDescription, setChecklistSteps, setCardID,
    };
})

function createCheckboxContainer(label) {
    const div = document.createElement('div');

    const elementID = crypto.randomUUID();

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.id = elementID;

    const checkBoxLabel = document.createElement('label');
    checkBoxLabel.setAttribute('for', elementID);
    checkBoxLabel.textContent = label;

    div.append(checkBox, checkBoxLabel);

    return div;
}

export {cardCreator};

export const createCardCreator = () => {
    const template = document.getElementById('todo-card-template');
    const todoCard = template.content.cloneNode(true);
    const validPriorities = ['Low','Medium','High'];

    return {
        getTodoCard: () => todoCard,

        setCardID: (taskID) => {
            const cleanedID = taskID.trim();

            if (typeof(cleanedID) !== 'string') {
                throw new TypeError('Task ID must be a string');
            }

            if (cleanedID.length === 0) {
                throw new Error('Task ID cannot be blank');
            }

            todoCard.querySelector('.todo-card').dataset.taskid = cleanedID;
        },

        setTitle: (title) => {
            if (typeof(title) !== 'string') {
                throw new TypeError('Title must be of type: String');
            }

            const cleanedTitle = title.trim();

            if (cleanedTitle.length === 0) {
                throw new Error('Title cannot be empty');
            }
            
            if (cleanedTitle.length > 64) {
                throw new Error('Title cannot be longer than 64 characters');
            }

            todoCard.querySelector('.todo-title').textContent = cleanedTitle; 
        }
    }
}