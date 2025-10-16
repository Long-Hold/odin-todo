const activeTodos = new Map();

export function addTodo(key, object) {
    if (typeof(key) !== 'string') {
        throw new TypeError('Key must be of type: String');
    }

    if (!key.trim()) {
        throw new Error('Key cannot be empty');
    }

    if (object instanceof Todo === false) {
        throw new TypeError(`${object} must be an instance of: Todo`);
    }

    activeTodos.set(key.trim(), structuredClone(object));
}

export function getAllObjects() {
    return Array.from(activeTodos.values()).map(obj => structuredClone(obj));
}

export function getTodoObject(taskId) {
    if (typeof(taskId) !== 'string') {
        throw new TypeError('taskId must be a string');
    }

    if (!taskId.trim()) {
        throw new TypeError('taskId cannot be empty');
    }

    const clonedObject = structuredClone(activeTodos.get(taskId));

    if (clonedObject === undefined) {
        throw new ReferenceError(`Task (${taskId}) could not be found`);
    }

    return clonedObject;
}