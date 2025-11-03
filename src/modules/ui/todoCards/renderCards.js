export function displayNewCardNode(todoCard) {
    if (todoCard instanceof Node === false) {
        throw new TypeError('Incorrect instance passed. Expected type: Node');
    }

    const cardDisplayNode = document.querySelector('.display-box');
    cardDisplayNode.appendChild(todoCard);

    return cardDisplayNode;
}

export function clearDisplayBox() {
    const cardDisplayNode = document.querySelector('.display-box');
    cardDisplayNode.replaceChildren();
    return cardDisplayNode;
}