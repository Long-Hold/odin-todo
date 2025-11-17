export class Project {
    static ID_PREFIX = 'project_';
    constructor(name, linkedIds = new Set()) {
        this.id = `${Project.ID_PREFIX}${crypto.randomUUID()}`;
        this.name = name;

        if (!(linkedIds instanceof Set)) { 
            throw new Error('linkedIds must be a Set');
        }
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