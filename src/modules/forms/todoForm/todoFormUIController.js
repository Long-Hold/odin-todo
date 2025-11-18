import { addSelectOption, clearParentContainer } from "../formUIUtils";

export function renderProjectOptions(projectsArray) {
    const selectElement = document.getElementById('projects-dropdown');
    clearParentContainer(selectElement);
   
    // Adds a default option
    addSelectOption(selectElement, '', 'None');

    projectsArray.forEach(project => addSelectOption(selectElement, project.id, project.name));

    return selectElement;
}