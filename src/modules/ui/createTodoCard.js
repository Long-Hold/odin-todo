import { format, startOfDay, startOfToday } from "date-fns"

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

export const createCardCreator = () => {
    const template = document.getElementById('todo-card-template');
    const todoCard = template.content.cloneNode(true);

    return {
        getTodoCard: () => todoCard.querySelector('.todo-card'),

        setCardID: (taskID) => {
            todoCard.querySelector('.todo-card').dataset.taskid = taskID.trim();
            return todoCard.querySelector('.todo-card').dataset.taskid;
        },

        setTitle: (title) => {
            todoCard.querySelector('.todo-title').textContent = title.trim(); 
            return todoCard.querySelector('.todo-title');
        },

        setPriority: (priority) => {
            todoCard.querySelector('.priority').textContent = priority.trim();
            return todoCard.querySelector('.priority');
        },

        setProject: (project) => {
            todoCard.querySelector('.project-category').textContent = project.trim();
            return todoCard.querySelector('.project-category');
        },

        setDeadline: (date) => {
            todoCard.querySelector('time').textContent = format(date, 'yyyy-MM-dd');
            return todoCard.querySelector('time');
        },

        setDescription: (description) => {
            todoCard.querySelector('.description').textContent = description.trim();
            return todoCard.querySelector('.description');
        },

        setChecklistSteps: (steps) => {
            if (steps === null || steps === undefined) {
                throw new Error(`Steps cannot be ${steps}`);
            }

            if (typeof(steps) !== 'object') {
                throw new TypeError(`Parameter must be passed as an object`);
            }

            if (Object.keys(steps).length === 0) {
                throw new Error('Passed object cannot be empty');
            }

            for (const [key, value] of Object.entries(steps)) {
                if (typeof(value) !== 'string') {
                    throw new TypeError('Values of keys must be of type: string');
                }
                const text = value.trim();

                // Ignore empty steps
                if (!text) { continue; }

                const checkListStep = createCheckboxContainer(text);
                todoCard.querySelector('.checklist-container').append(checkListStep);
            }

            return todoCard.querySelector('.checklist-container');
        }
    }
}