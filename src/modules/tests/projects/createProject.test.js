import { Project } from "../../projects/createProject";

describe('class Project', () => {
    let myProject;
    beforeEach(() => {
        const testIDs = ['1','2','3','4'];
        const testSet = new Set(testIDs);
        const projectName = 'Test Project';

        myProject = new Project(projectName, testSet);
    });
});