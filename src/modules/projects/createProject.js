export class Project {
    constructor(projectName, linkedTasks = new Set()) {
        this.projectName = projectName;
        this.linkedTasks = structuredClone(linkedTasks);
    }

    set linkedTasks(linkedTasks) {
        if (linkedTasks instanceof Set === false) {
            throw new TypeError(`linkedTasks expected assignment of Set. Received ${typeof(linkedTasks)}`);
        }

        this.linkedTasks = structuredClone(linkedTasks);
    }

    linkTaskId(taskId) {
        if (this.linkedTasks.has(taskId)) {
            console.log('Task is already in this project category');
            return;
        }

        this.linkedTasks.add(structuredClone(taskId));
        return structuredClone(this.linkedTasks);
    }

    removeTask(taskId) {
        this.linkedTasks.delete(taskId);
        return structuredClone(this.linkedTasks);
    }

    getAllLinkedTasks() {
        return Array.from(structuredClone(this.linkedTasks));
    }
}