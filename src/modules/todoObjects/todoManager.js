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