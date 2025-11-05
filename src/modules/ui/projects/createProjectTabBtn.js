const TEMPLATE = document.getElementById('project-button-template');

export function createProjectButton(text) {
    const fragment = TEMPLATE.content.cloneNode('true');
    const projectButton = fragment.firstElementChild;

    const cleanedText = text.trim();
    projectButton.textContent = cleanedText;
    projectButton.dataset.projectName = cleanedText;
    return projectButton;
}