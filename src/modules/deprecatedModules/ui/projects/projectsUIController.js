import { renderChildElement, removeChildElement } from "../renderUtils";
import { createProjectButton } from "./createProjectTabBtn";

const PROJECTS_TAB_CONTAINER = document.getElementById('projects-tab-container');

export function renderProjectTabButton(projectObject) {
    const newTabButton = createProjectButton(projectObject.projectName);
    return renderChildElement(PROJECTS_TAB_CONTAINER, newTabButton);
}