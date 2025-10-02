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

//TODO: Create function to iteratively render all cards from list