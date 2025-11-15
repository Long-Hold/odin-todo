export class Project {
    static ID_PREFIX = 'project_';
    constructor(name, objectIds = null) {
        this.id = `${Project.ID_PREFIX}${crypto.randomUUID()}`;
        this.name = name;
        //TODO: Linked Todos storage
    }
}