const TODO_FORM = document.getElementById('todo-form');

export function initializeTodoFormListeners() {
    TODO_FORM.addEventListener('submit', (event) => { 
        event.preventDefault();
        const formData = new FormData(event.target);
        //TODO: Emit custom event that todoForm was submitted
    });
}