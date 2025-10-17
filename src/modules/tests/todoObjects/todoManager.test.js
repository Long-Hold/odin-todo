import { addTodo, getAllObjects, getTodoObject, deleteTodoObject } from "../../todoObjects/todoManager";

class Todo {}

describe('addTodo', () => {
    describe('when passed invalid parameters', () => {
        test.each([
            {description: 'number', input: 123},
            {description: 'array', input: []},
            {description: 'object', input: {}},
            {description: 'null', input: null},
            {description: 'undefined', input: undefined},
        ])('throws TypeError when passed $description as key', ({description, input}) => {
            expect(() => addTodo(input, new Todo)).toThrow(TypeError);
        });

        test.each([
            {description: 'empty string', input: ''},
            {description: 'White space only', input: '     '},
            {description: 'String constructor', input: new String()},
        ])('throws Error when passed $description as key', ({description, input}) => {
            expect(() => addTodo(input, new Todo())).toThrow(Error);
        });
    });
});