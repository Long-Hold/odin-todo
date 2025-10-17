import { addTodo, getAllObjects, getTodoObject, deleteTodoObject } from "../../todoObjects/todoManager";
import { Todo } from "../../todoObjects/createTodoObj";

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
                expect(() => addTodo(input, validObj)).toThrow(TypeError);
            });

            test.each([
                {description: 'empty string', input: ''},
                {description: 'White space only', input: '     '},
                {description: 'String constructor', input: new String()},
            ])('throws Error when passed $description as key', ({description, input}) => {
                expect(() => addTodo(input, validObj)).toThrow(Error);
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
                expect(() => addTodo(validKey, input)).toThrow(TypeError);
            });
        });
    });
});