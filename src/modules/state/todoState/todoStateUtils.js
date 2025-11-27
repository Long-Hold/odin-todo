import { PROJECT_OBJECT_MANAGER } from "../../objects/projects/projectObjectManager";
import { isToday, isThisWeek } from "date-fns";
import { TODO_OBJECT_MANAGER } from "../../objects/todos/todoObjectManager";
/**
 * Enriches todo objects by replacing project ID with project name for display.
 * 
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


/**
 * Filters todo objects by comparing their deadline property with the specified date.
 * 
 * Ignores objects that do not have a value for the deadline property.
 * 
 * @param {Array} todosArray - Array of row todo objects
 * @param {String} filterType - String representing the date range to filter objects by
 * @returns {Array} Array of filtered objects, or the original Array if invalid filterType passed
 */
export function filterTodosByDate(todosArray, filterType) {
    if (filterType === 'all') { return todosArray; }

    if (filterType === 'today') {
        return todosArray.filter(todo => 
            todo.deadline && isToday(new Date(todo.deadline))
        );
    }

    if (filterType === 'week') {
        return todosArray.filter(todo => 
            todo.deadline && isThisWeek(new Date(todo.deadline))
        );
    }

    return todosArray;
}

export function isExistingTodo(todoId) {
    return TODO_OBJECT_MANAGER.getTodo(todoId) !== undefined;
}

export function projectFieldEdited(todoId, submittedProject) {
    const todo = TODO_OBJECT_MANAGER(todoId);

    if (!todo) { return false; }
    return todo.project !== submittedProject;
}