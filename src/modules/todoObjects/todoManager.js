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

export function getTodoObject(key) {
    if (typeof(key) !== 'string') {
        throw new TypeError('taskId must be a string');
    }

    if (!key.trim()) {
        throw new TypeError('taskId cannot be empty');
    }

    const clonedObject = structuredClone(activeTodos.get(key));

    if (clonedObject === undefined) {
        throw new ReferenceError(`Task (${key}) could not be found`);
    }

    return clonedObject;
}

export function deleteTodoObject(key) {
    activeTodos.delete(key);
}