import { createTodoObject } from "./modules/createTodoObj";
import { formController } from "./modules/formController";

formController().then((formData) => {
    // Wait for the formController to return submitted user data
    // When that happens, an object is created with said data and stored
    // in a master array
    const newCard = createTodoObject(formData);
    console.log(newCard);
})