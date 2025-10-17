import { createTodoManager } from "../../todoObjects/todoManager";
import { Todo } from "../../todoObjects/createTodoObj";

describe('createTodoManager', () => {
    let todoManager;
    beforeEach(() => {
        todoManager = createTodoManager();
    })

    describe('addTodo', () => {
        describe('when passed invalid parameters', () => {
            describe('to key parameter', () => {
                const validObj = new Todo();
                test.each([
                    {description: 'number', input: 123},
                    {description: 'array', input: []},
                    {description: 'object', input: {}},
                    {description: 'null', input: null},
                    {description: 'undefined', input: undefined},
                ])('throws TypeError when passed $description as key', ({description, input}) => {
                    expect(() => todoManager.addTodo(input, validObj)).toThrow(TypeError);
                });

                test.each([
                    {description: 'empty string', input: ''},
                    {description: 'White space only', input: '     '},
                    {description: 'String constructor', input: new String()},
                ])('throws Error when passed $description as key', ({description, input}) => {
                    expect(() => todoManager.addTodo(input, validObj)).toThrow(Error);
                });
            });

            describe('to object parameter', () => {
                const validKey = 'ValidKey';

                test.each([
                    {description: 'null', input: null},
                    {description: 'undefined', input: undefined},
                    {description: 'string', input: 'some string'},
                    {description: 'number', input: 1}
                ])('throws TypeError when passed $description', ({description, input}) => {
                    expect(() => todoManager.addTodo(validKey, input)).toThrow(TypeError);
                });
            });
        });

        describe('when passed valid parameters', () => {
            const validObj = new Todo();

            test.each([
                {description: 'left padding', key: '   key'},
                {description: 'right padding', key: 'key    '},
                {description: 'left/right padding', key: '    key    '},
            ])('strips $description whitespace from key', ({description, key}) => {
                const result = todoManager.addTodo(key, validObj);
                const [resultKey] = result.keys();

                expect(resultKey).toBe(key.trim());
            });

            test('Map contains expected key: value pairs & length upon succesful exection', () => {
                let resultMap;
                for (let i = 0; i < 5; ++i) {
                    resultMap = todoManager.addTodo(`key${i}`, validObj);
                }

                expect(resultMap.size).toBe(5);

                let increment = 0;
                for (const [key, value] of resultMap.entries()) {
                    expect(key).toBe(`key${increment}`);
                    expect(value).toEqual(validObj);
                    ++increment
                }
            });
        });
    });

    describe('getAllObjects', () => {
        test.each([
            {description: '1 entry', entriesToAdd: 1},
            {description: '5 entries', entriesToAdd: 5},
            {description: '50 entries', entriesToAdd: 50},
            {description: '100 entries', entriesToAdd: 100},
        ])('returns an Array containing all $description', ({description, entriesToAdd}) => {
            for (let i = 0; i < entriesToAdd; ++i) {
                todoManager.addTodo(`item${i}`, new Object());
            }

            expect(todoManager.getAllObjects()).toHaveLength(entriesToAdd);
        });
    });
});