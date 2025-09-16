import { createTodoObject } from "./modules/createTodoObj";
import { formControl } from "./modules/formController";

formControl.initializeEventListeners();

document.addEventListener('todoSubmitted', (event) => {
    const { formData } = event.detail;
    const newCard = createTodoObject(formData);
    console.log(newCard);
})