import { PROJECT_MANAGER, createAndSaveProjectObject, storeJSONProjectObj } from "../../projects/projectController";
import { NEW_PROJECT_FORM } from "../../forms/newProjectForm/projectFormController";
import { EVENTS } from "../../events/events";
import { saveProject, getAllProjects, deleteProject } from "../../storage/projectStorageService";
import { renderProjectTabButton } from "../../ui/projects/projectsUIController";
import { clearProjectTabs, PROJECTS_TAB_CONTAINER } from "../../ui/tabs/projectTabController";

import { TODO_OBJECT_MANAGER } from "../../todoObjects/todoController";
import { clearAllCards, renderTodoCard } from "../../ui/todoCards/todoUIController";
import { updateTodosAfterProjectDeleted } from "../todos/todoStateController";

export function initializeProjectState() {
    loadProjects();
    synchUIToState();
    
    NEW_PROJECT_FORM.addEventListener(EVENTS.PROJECT_SUBMITTED, (event) => {
        handleNewProject(event.detail.data)
    });

    PROJECTS_TAB_CONTAINER.addEventListener(EVENTS.PROJECT_TABBED, (event) => { filterTodosByProject(event.detail.data); });
    PROJECTS_TAB_CONTAINER.addEventListener(EVENTS.PROJECT_DELETED, (event) => { handleProjectDeleted(event.detail.data); });
}

export function linktTodoToProject(projectName, taskID) {
    const projectObject = PROJECT_MANAGER.getProject(projectName);
    if (!projectObject) {
        console.log(`${linktTodoToProject.name} could not find ${projectName}.`);
        return null;
    }

    projectObject.addTaskId(taskID);
    const saveSuccess = saveProject(projectObject.projectName, projectObject);

    if (!saveSuccess) {
        console.error('An error occured while adding task to project category. Aborting process');
        projectObject.removeTask(taskID);
        return null;
    }

    return projectObject.getAllLinkedTasks();
}

function handleNewProject(formObject) {
    const projectObj = createAndSaveProjectObject(formObject);
    if (projectObj === null) {
        console.error(`${createAndSaveProjectObject.name} returned with null. Aborting process`);
        return null;
    }
    
    const saveSuccess = saveProject(projectObj.projectName, projectObj);
    if (!saveSuccess) {
        console.error('An error occured while saving project to localStorage. Aborting process');
        PROJECT_MANAGER.deleteProject(projectObj.projectName);
        return null;
    }

    renderProjectTabButton(projectObj);
}

function loadProjects() {
    const projectsArray = getAllProjects();

    if (projectsArray.length === 0) {
        console.log('No saved projects found.');
        return;
    }

    projectsArray.forEach((project) => { storeJSONProjectObj(project); });
}

function synchUIToState() {
    const projectsArray = PROJECT_MANAGER.getAllProjects();
    if (projectsArray.length === 0) {
        console.log('No stored projects found to render.');
        return;
    }

    projectsArray.forEach((project) => renderProjectTabButton(project));
}

function filterTodosByProject(projectName) {
    const projectObj = PROJECT_MANAGER.getProject(projectName);
    if (projectObj === undefined) {
        console.error(`${filterTodosByProject.name} could not retrieve project information.`);
        return null;
    }

    clearAllCards();

    const taskIdsArray = projectObj.getAllLinkedTasks();
    taskIdsArray.forEach((taskId) => {
        const todoObj = TODO_OBJECT_MANAGER.getTodoObject(taskId);

        if (todoObj === undefined) {
            console.error(`${filterTodosByProject.name} could not locate todoObject`);
        }
        else {
            renderTodoCard(todoObj);
        }
    })
}

function handleProjectDeleted(projectName) {
    /**
     * 1. Get all the linked tasks
     * 2. For each task, delete the project property from the object
     *      - Then delete the task from manager, JSON, and DOM
     * 3. Update the JSON of the modified object
     * 4. Redraw ALL cards (home page default)
     */

    const projectObject = PROJECT_MANAGER.getProject(projectName);
    if (projectObject === undefined) {
        console.error(`${handleProjectDeleted.name} could not located the targeted project.`);
        return null;
    }

    const linkedTasksArray = projectObject.getAllLinkedTasks();
    linkedTasksArray.forEach((taskId) => { 
        const result = updateTodosAfterProjectDeleted(taskId);
        if (result === null) {
            console.error(`${updateTodosAfterProjectDeleted.name} could not delete all linked projects. Aborting deletion transaction.`);
            return null;
        }
    })

    PROJECT_MANAGER.deleteProject(projectObject.projectName);
    deleteProject(projectObject.projectName);
    clearProjectTabs();
    synchUIToState();
}