import { createCardCreator } from "../createTodoCard";
const cardCreator = createCardCreator();

test('setCardID rejects non-string parameter', () => {
    expect(cardCreator.setCardID(1)).toThrow('TypeError');
})
