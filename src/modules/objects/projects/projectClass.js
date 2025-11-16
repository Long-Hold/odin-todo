export class Project {
    static ID_PREFIX = 'project_';
    constructor(name) {
        this.id = `${Project.ID_PREFIX}${crypto.randomUUID()}`;
        this.name = name;
        this.objectIds = new Set();
    }
}