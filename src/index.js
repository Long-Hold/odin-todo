import { createTodoObject } from "./modules/createTodoObj";
import { formController } from "./modules/formController";

formController();

document.addEventListener('onSubmit', (event) => {
    const { formData } = event.detail;
    const newCard = createTodoObject(formData);
    console.log(newCard);
})