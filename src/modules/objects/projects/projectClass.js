export class Project {
    static ID_PREFIX = 'project_';
    constructor(name) {
        this.id = `${Project.ID_PREFIX}${crypto.randomUUID()}`;
        this.name = name;
        this.linkedIds = new Set();
    }

    toJSON() {
        return {
            id: this.is,
            name: this.name,
            linkedIds: Array.from(this.linkedIds),
        }
    }
}