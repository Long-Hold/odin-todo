class TodoCard {
}

export function createTodoCard(formData) {
    const card = new TodoCard();
    for (const [key, value] of formData.entries()) {
        if (value) {
            card[key] = value;
        }
    }

    return card;
}