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

    describe('when passed valid paramters to constructor', () => {
        test('does not throw when passed only a projectName param', () => {
            expect(() => new Project('My project')).not.toThrow();
        });

        test('does not throw when passed valid parameters', () => {
            expect(() => new Project('My project', new Set())).not.toThrow();
        })
    });

    describe('.toJSON() method', () => {
        test('correctly converts object properties to a string', () => {
            const tasksArray = myProject.getAllLinkedTasks();

            const jsonString = JSON.stringify(myProject);
            const parsedJson = JSON.parse(jsonString);

            expect(parsedJson.projectName).toBe(myProject.projectName);

            for (let i = 0; i < tasksArray.length; ++i) {
                expect(parsedJson.linkedTasks[i]).toBe(tasksArray[i]);
            }
        });
    });

    describe('.addTaskId() method', () => {
        test('does not throw when attempting to add duplicate id', () => {
            const taskIdArray = myProject.getAllLinkedTasks();
            for (const taskId of taskIdArray) {
                expect(() => myProject.addTaskId(taskId)).not.toThrow();
            }
        });

        test('adds taskId and returns the new Set', () => {
            const newIdsArray = ['5','6','7','8'];
            const newProject = new Project('My project!');

            for (const taskId of newIdsArray) {
                const result = newProject.addTaskId(taskId);
                expect(result.has(taskId)).toBe(true);
            }
        })
    });
});