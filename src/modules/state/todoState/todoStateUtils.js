import { PROJECT_OBJECT_MANAGER } from "../../objects/projects/projectObjectManager";

/**
 * Enriches todo objects by replacing project ID with project name for display.
 * Preserves original project ID as projectId property.
 * 
 * @param {Array} todosArray - Array of raw todo objects
 * @returns {Array} Array of enriched todo objects
 */

export function enrichTodos(todosArray) {
    return todosArray.map((todo) => ({
        ...todo,
        project: todo.project ? PROJECT_OBJECT_MANAGER.getProject(todo.project)?.name : null,
        projectId: todo.project,
    }));
}