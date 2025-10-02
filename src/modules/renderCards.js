export function displayNewCardNode(todoCard) {
    if (todoCard instanceof Node === false) {
        throw new TypeError('Incorrect instance passed. Expected type: Node');
    }

    if (todoCard.classList.contains('todo-card') === false) {
        throw new Error('Invalid Node Element passed. Expected Class: todo-card');
    }
    
    const cardDisplayNode = document.querySelector('.display-box');
    cardDisplayNode.appendChild(todoCard);

    return cardDisplayNode;
}

export function renderAllCards(cardsArray) {
    if (Array.isArray(cardsArray) === false) {
        throw new TypeError('Invalid argument. Must be of type: Array');
    }

    if (cardsArray.length === 0) {
        throw new Error('Array cannot be empty');
    }

    cardsArray.forEach((card) => displayNewCardNode(card));
    return document.querySelector('.display-box');
}