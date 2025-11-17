import { EVENTS } from "../../events/events";
import { PROJECT_FORM } from "../../forms/projectForm/projectFormController";
import { createProjectFromFormData } from "../../objects/projects/projectObjectController";
import { PROJECT_OBJECT_MANAGER } from "../../objects/projects/projectObjectManager";

export function initializeProjectObjectState() {
    PROJECT_FORM.addEventListener(EVENTS.PROJECT_FORM_SUBMITTED, (event) => {
        const projectObj = createProjectFromFormData(event.detail.data);
        PROJECT_OBJECT_MANAGER.addProject(projectObj.id, projectObj);
    });
}