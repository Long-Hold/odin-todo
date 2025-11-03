import { createCardCreator } from "./createTodoCard";
import { renderChildElement, removeChildElement } from "../renderUtils";

const TODO_CARDS_CONTAINER = document.querySelector('.display-box');

export function renderTodoCard(todoObject) {
    const todoCard = constructTodoCardFromObject(todoObject);
    renderChildElement(TODO_CARDS_CONTAINER, todoCard);
}

function constructTodoCardFromObject(todoCardObj) {
    const cardCreator = createCardCreator();
    for (const property in todoCardObj) {
        switch (property) {
            case ('taskID'):
                cardCreator.setCardID(todoCardObj[property]);
                break;
            
            case ('title'):
                cardCreator.setTitle(todoCardObj[property]);
                break;

            case ('priority'):
                cardCreator.setPriority(todoCardObj[property]);
                break;
            
            case('projects'):
                cardCreator.setProject(todoCardObj[property]);
                break;
            
            case('deadline'):
                cardCreator.setDeadline(new Date(todoCardObj[property]));
                break;
            
            case('description'):
                cardCreator.setDescription(todoCardObj[property]);
                break;
            
            case('steps'):
                cardCreator.setChecklistSteps(todoCardObj[property])
                break;
        }
    }

    return cardCreator.getTodoCard();
}