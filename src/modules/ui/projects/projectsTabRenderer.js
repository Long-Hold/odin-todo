const PROJECT_TAB_TEMPLATE = document.getElementById('project-tab-template');
const PROJECTS_LIST = document.getElementById('projects-list');

export function renderProjectTabs(projectsArray) {
    PROJECTS_LIST.replaceChildren();
    projectsArray.forEach((project) => {
        const clonedTemplate = PROJECT_TAB_TEMPLATE.content.cloneNode(true);
        const tabButton = clonedTemplate.querySelector('.project-btn');
        const deleteButton = clonedTemplate.querySelector('.delete-project-btn');

        tabButton.dataset.projectId = project.id;
        tabButton.textContent = project.name;
        deleteButton.dataset.projectId = project.id;

        PROJECTS_LIST.appendChild(clonedTemplate);
    });
}