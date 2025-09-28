import { createCardCreator } from "../createTodoCard";

beforeEach(() => {
    document.body.innerHTML = `
        <template id="todo-card-template">
            <article class="todo-card" data-taskID="">
                <header>
                    <button type="radio" class="todo-status"></button>
                    <h3 class="todo-title">Todo Title</h3>
                    <p class="priority"></p>
                    <p class="project-category"></p>
                    <time datetime=""></time>
                </header>

                <div class="todo-desc">
                    <h4>DESCRIPTION</h4>
                    <p class="description"></p>
                </div>

                <div class="todo-checklist">
                    <fieldset>
                        <legend>To Complete</legend>
                        <div class="checklist-container">
                        </div>
                    </fieldset>
                </div>

                <div class="todo-notes">
                    <h4>NOTES</h4>
                    <p></p>
                </div>

                <div class="modify-btns">
                    <button type="button" class="delete-btn">Delete</button>
                    <button type="button" class="edit-btn">Edit</button>
                </div>
            </article>
        </template>
    `;
});

describe('createCardCreator', () => {
    let cardCreator;
    beforeEach(() => {
        document.body.innerHTML = `
            <template id="todo-card-template">
                <article class="todo-card" data-taskID="">
                    <header>
                        <button type="radio" class="todo-status"></button>
                        <h3 class="todo-title">Todo Title</h3>
                        <p class="priority"></p>
                        <p class="project-category"></p>
                        <time datetime=""></time>
                    </header>

                    <div class="todo-desc">
                        <h4>DESCRIPTION</h4>
                        <p class="description"></p>
                    </div>

                    <div class="todo-checklist">
                        <fieldset>
                            <legend>To Complete</legend>
                            <div class="checklist-container">
                            </div>
                        </fieldset>
                    </div>

                    <div class="todo-notes">
                        <h4>NOTES</h4>
                        <p></p>
                    </div>

                    <div class="modify-btns">
                        <button type="button" class="delete-btn">Delete</button>
                        <button type="button" class="edit-btn">Edit</button>
                    </div>
                </article>
            </template>
        `;

        cardCreator = createCardCreator();
    });

    describe('setCardID', () => {
        describe('when given invalid input', () => {
            test.each([
                {description: 'number', input: 1},
                {description: 'array', input: []},
                {description: 'object', input: {text: 'Hello, world!'}},

            ])('throws TypeError for $description input', ({description, input}) => {
                expect(() => cardCreator.setCardID(input)).toThrow(TypeError);
            });

            test.each([
                {description: 'whitespace only', input: '   '},
                {description: 'single space only', input: ' '},
                {description: 'empty string', input: ''},
            ])('throws Error for $description', ({description, input}) => {
                expect(() => cardCreator.setCardID(input)).toThrow(Error);
            });
        })
    })
})