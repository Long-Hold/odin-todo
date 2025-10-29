import { Project } from "../../projects/createProject";

describe('class Project', () => {
    let myProject;
    beforeEach(() => {
        const testIDs = ['1','2','3','4'];
        const testSet = new Set(testIDs);
        const projectName = 'Test Project';

        myProject = new Project(projectName, testSet);
    });

    describe('when passed invalid paramters to constructor', () => {
        describe('to projectName property', () => {
            test.each([
                {description: 'undefined', input: undefined},
                {description: 'null', input: null},
                {description: 'empty string', input: ''},
                {description: 'whitespace only', input: '    '},
            ])('throws Error when passed $description input', ({description, input}) => {
                expect(() => new Project(input, new Set())).toThrow(Error);
            });
        });

        describe('to linkedTasks paramter', () => {
            test.each([
                {description: 'array', input: []},
                {description: 'object', input: {}},
                {description: 'map', input: new Map()},
                {description: 'string', input: 'Hello, world'},
                {description: 'number', input: 123},
            ])('throws TypeError for $description input', ({description, input}) => {
                expect(() => new Project('My task!', input)).toThrow(TypeError);
            });
        });
    });
});