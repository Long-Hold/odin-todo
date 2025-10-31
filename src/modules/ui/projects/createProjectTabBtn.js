const TEMPLATE = document.getElementById('project-button-template');

export function createProjectButton(text) {
    const projectButton = TEMPLATE.content.cloneNode('true');
    projectButton.textContent = text.trim();
    return projectButton;
}