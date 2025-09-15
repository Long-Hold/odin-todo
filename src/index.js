import { createTodoObject } from "./modules/createTodoObj";
import { formController } from "./modules/formController";

const form = document.getElementById('new-task');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newCard = createTodoObject(formData);
    console.log(newCard);
})