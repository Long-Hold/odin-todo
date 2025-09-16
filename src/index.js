import { createTodoObject } from "./modules/createTodoObj";
import { FormControl } from "./modules/formController";

FormControl.initializeEventListeners();

document.addEventListener('todoSubmitted', (event) => {
    const { formData } = event.detail;
    const newCard = createTodoObject(formData);
    console.log(newCard);
})