const TEMPLATE = document.getElementById('project-button-template');

export function createProjectButton(text) {
    const fragment = TEMPLATE.content.cloneNode('true');
    const projectButton = fragment.firstElementChild;
    projectButton.textContent = text.trim();
    return projectButton;
}