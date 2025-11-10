const TEMPLATE = document.getElementById('project-button-template');

export function createProjectButton(text) {
    const fragment = TEMPLATE.content.cloneNode('true');
    const divContainer = fragment.firstElementChild;

    const projectButton = divContainer.firstElementChild;
    const deleteButton = projectButton.nextElementSibling;

    const cleanedText = text.trim();

    projectButton.textContent = cleanedText;
    projectButton.dataset.projectName = cleanedText;

    deleteButton.dataset.projectName = cleanedText;
    return divContainer;
}