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


test('setCardID rejects non-string parameter', () => {
    const cardCreator = createCardCreator();
    expect(() => cardCreator.setCardID(1)).toThrow(TypeError);
    expect(() => cardCreator.setCardID()).toThrow(TypeError);
    expect(() => cardCreator.setCardID({})).toThrow(TypeError);
});

test('setCardID rejects empty string parameter', () => {
    const cardCreator = createCardCreator();
    expect(() => cardCreator.setCardID('')).toThrow(Error);
    expect(() => cardCreator.setCardID('          ')).toThrow(Error);
    expect(() => cardCreator.setCardID(`${' '}`)).toThrow(Error);
});

test('setTitle rejects non-string parameter', () => {
    const cardCreator = createCardCreator();
    expect(() => cardCreator.setTitle(123)).toThrow(TypeError);
    expect(() => cardCreator.setTitle([]).toThrow(TypeError));
    expect(() => cardCreator.setTitle({hey: 'hey'}).toThrow(TypeError));
    expect(() => cardCreator.setTitle(new String()).toThrow(TypeError));
})

test('setTItle reject empty string parameter', () => {
    const cardCreator = createCardCreator();
    expect(() => cardCreator.setTitle('')).toThrow(Error);
    expect(() => cardCreator.setTitle('     ')).toThrow(Error);
    expect(() => cardCreator.setTitle(` `)).toThrow(Error);
})

test('setTitle rejects strings that exceed max length', () => {
    const cardCreator = createCardCreator();
    expect(() => cardCreator.setTitle('A'.repeat(65))).toThrow(Error);
    expect(() => cardCreator.setTitle('A'.repeat(80))).toThrow(Error);
})