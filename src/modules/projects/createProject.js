export class Project {
    constructor(projectName, linkedTasks = new Set()) {
        if (projectName === undefined || projectName === null) {
            throw new Error('projectName is required');
        }

        const name = String(projectName).trim();
        if (!name) {
            throw new Error('projectName cannot be whitespace or blank');
        }
        this.projectName = name;

        if (linkedTasks instanceof Set === false) {
            throw new TypeError('linkedTasks must be Set');
        }
        this.linkedTasks = structuredClone(linkedTasks);
    }

    toJSON() {
        return {
            projectName: this.projectName,
            linkedTasks: Array.from(this.linkedTasks),
        }
    }

    addTaskId(taskId) {
        if (this.linkedTasks.has(taskId)) {
            console.log('Task is already in this project category');
        }
        else {
            this.linkedTasks.add(structuredClone(taskId));
        }
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

export function createProjectObject(object) {
    const objKeys = Object.keys(object);

    if (objKeys.length === 1) {
        try {
            return new Project(objKeys[0]);
        } catch (error) {
            console.error(`${createProjectObject.name} has caught an error: ${error}`);
        }
    }

    else if (objKeys.length === 2) {
        try {
            return new Project(objKeys[0], objKeys[1]);
        } catch (error) {
            console.error(`${createProjectObject.name} has caught an error: ${error}`);
        }
    }

    else {
        console.error(`Passed object keys exceed maximum length.\nExpected: up to 2\nReceived: ${objKeys.length}`);
    }

    return null;
}