import { createCardCreator } from "../../ui/createTodoCard";
import { format, addDays } from "date-fns";

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
        describe('when given valid input', () => {
            test.each([
                {description: 'string with no padded whitespace', input: 'SomeID', expected: 'SomeID'},
                {description: 'string with whitespace padding', input: '  PaddedIDWhitespace  ', expected: 'PaddedIDWhitespace'}, 
            ])('updates ID with passed input: $description', ({description, input}) => {
                const result = cardCreator.setCardID(input);
                const expected = input.trim();
                expect(result).toBe(expected);
            })
        });
    });

    describe('setTitle', () => {
        describe('when given valid input', () => {
            test.each([
                {description: 'character limit string', input: 'A'.repeat(64)},
                {description: 'character limit string with whitespace', input: (' ' + 'A'.repeat(64) + ' ')},
                {description: 'input with whitespace padding', input: '  My Valid Title!  '},
                {description: 'input with no whitespace padding', input: 'My Valid Title!'},
            ])('accepts $description input', ({description, input}) => {
                const result = cardCreator.setTitle(input).textContent;
                const expected = input.trim();

                expect(result).toBe(expected);
            });
        })
    });

    describe('setPriority', () => {
        describe('when given valid input', () => {
            test.each([
                {description: 'Low priority', input: 'Low'},
                {description: 'Medium priority', input: 'Medium'},
                {description: 'High priority', input: 'High'}
            ])('accepts $description keyword', ({description, input}) => {
                const result = cardCreator.setPriority(input).textContent;
                const expected = input.trim();

                expect(result).toBe(expected);
            })

            test.each([
                {description: 'Low with whitespace', input: '  Low  '},
                {description: 'Medium with whitespace', input: ' Medium'},
                {description: 'High with whitespace', input: 'High    '},
            ])('trims $description keyword', ({description, input}) => {
                const result = cardCreator.setPriority(input).textContent;
                const expected = input.trim();
                expect(result).toBe(expected);
            })
        })
    });

    describe('setProject', () => {
        describe('when given valid input', () => {
            test.each([
                {description: 'string with no space', input: 'Some Category'},
                {description: 'string with whitespace padding', input: '  Some Category  '}
            ])('accepts and trims $description', ({description, input}) => {
                const result = cardCreator.setProject(input).textContent;
                const expected = input.trim();
                expect(result).toBe(expected);
            })
        })
    });

    describe('setDeadline', () => {
        describe('when given invalid input', () => {
            describe('non Date objects', () => {
                test.each([
                    {description: 'object-literal with date string', input: {date: '09-29-2025'}},
                    {description: 'empty object', input: {}},
                    {description: 'Non-Date instance object', input: new String('09-29-2025')},
                ])('Throws TypeError for $description input', ({description, input}) => {
                    expect(() => cardCreator.setDeadline(input)).toThrow(TypeError);
                })
            })

            test.each([
                {description: 'invalid date string', input: new Date('invalid')},
                {description: 'invalid date', input: new Date('32-12-2025')},
                {description: 'NaN date', input: new Date(NaN)}
            ])('throws Error for $description input', ({description, input}) => {
                expect(() => cardCreator.setDeadline(input)).toThrow(Error);
            })

            test.each([
                {description: 'past date', input: new Date(1,1,2000)},
                {description: 'past date as string', input: new Date('January 1, 2000')},
                {description: 'yesterdays date', input: new Date().getDate() - 1}
            ])('throws Error for $description input', ({description, input}) => {
                expect(() => cardCreator.setDeadline(input)).toThrow(Error);
            })
        });

        describe('when given valid input', () => {
            test.each([
                {description: 'current date', input: new Date()},
                {description: "tomorrow's date", input: addDays(new Date(), 1)},
                {description: 'next week', input: addDays(new Date(), 7)},
                {description: 'a very far off, future date', input: new Date(2050, 0, 1)}
            ])('accepts and displays $description input', ({description, input}) => {
                const result = cardCreator.setDeadline(input).textContent;
                const expected = format(input, 'yyyy-MM-dd');
                expect(result).toBe(expected);
            })
        })
    });

    describe('setDescription', () => {
        describe('when given invalid input', () => {
            test.each([
                {description: 'number', input: 1},
                {description: 'array', input: ['ARRRRRRRGHHH']},
                {description: 'object', input: {}},
                {description: 'new String() constructor', input: new String()}
            ])('throws TypeError when given $description', ({description, input}) => {
                expect(() => cardCreator.setDescription(input)).toThrow(TypeError);
            });
        });

        describe('when given valid input', () => {
            const noWhiteSpaceParagraphs = `Hello world,
            
            This text contains paragraphs, but not padded whitespace.
            
            Ideally, this will be accepted`;

            const paddedParagraphs = `          
                    Well, isn't that intriguing.
                    There is plenty of white space all around...    `;

            test.each([
                {description: 'formatted string with paragraphs', input: noWhiteSpaceParagraphs},
                {description: '    formatted string with paragraphs and whitespace    ', input: paddedParagraphs}
            ])('accepts $description and uses as textContent', ({description, input}) => {
                const result = cardCreator.setDescription(input).textContent;
                const expected = input.trim();

                expect(result).toBe(expected);
            })
        })
    })

    describe('setChecklistSteps', () => {
        describe('when given invalid input', () => {
            test.each([
                {description: 'null', input: null},
                {description: 'undefined', input: undefined},
                {description: 'empty object', input: {}},
                {description: 'empty array', input: []},
            ])('throws Error when passed $description', ({description, input}) => {
                expect(() => cardCreator.setChecklistSteps(input)).toThrow(Error);
            });

            test.each([
                {description: 'string', input: 'Take out the trash'},
                {description: 'number', input: 1},
                {description: 'object with a non-string value', 
                    input: {
                        step: 'String 1',
                        step2: 'String2',
                        step3: 1
                    }},
            ])('throws TypeError when passed $description', ({description, input}) => {
                expect(() => cardCreator.setChecklistSteps(input)).toThrow(TypeError);
            });
        })

        describe('when given valid input', () => {
            const validCheckList = {
                step1: 'Open fridge',
                step2: 'Get food',
                step3: 'Cook food',
            }

            const listWithEmptyInputs = {
                step1: 'Get stones',
                step2: ' ',
                step3: 'Build house',
                step4: '   ',
                step5: '  ',
                step6: 'Take over the world',
            }

            test('creates correct number of checklist items', () => {
                const result = cardCreator.setChecklistSteps(validCheckList);
                expect(result.children.length).toBe(3);
            });

            test('filters out empty and whitespace only steps', () => {
                const result = cardCreator.setChecklistSteps(listWithEmptyInputs);
                expect(result.children.length).toBe(3);
            });

            test('each checklist node has an input and label', () => {
                const result = cardCreator.setChecklistSteps(validCheckList);

                const childElements = result.children;

                for (const child of childElements) {
                    expect(child.children.length).toBe(2);
                    expect(child.children[0].tagName).toBe('INPUT');
                    expect(child.children[1].tagName).toBe('LABEL');
                }
            })

            test('each checklist node label has correct textContent', () => {
                const result = cardCreator.setChecklistSteps(validCheckList);
                const childElements = result.children;
                const valuesArray = Object.values(validCheckList);

                valuesArray.forEach((label, index) => {
                    const child = childElements[index];
                    expect(child.querySelector('label').textContent).toBe(label);
                });
            });

            test('checklist label for and input id values are not empty', () => {
                const result = cardCreator.setChecklistSteps(validCheckList);
                const childElements = result.children;

                for (const child of childElements) {
                    const label = child.querySelector('label');
                    const input = child.querySelector('input');

                    expect(label.htmlFor).toBeTruthy();
                    expect(input.id).toBeTruthy();
                }
            });

            test('checklist label and input id values match', () => {
                const result = cardCreator.setChecklistSteps(validCheckList);
                const childElements = result.children;

                for (const child of childElements) {
                    const labelID = child.querySelector('label');
                    const inputID = child.querySelector('input');

                    expect(labelID.htmlFor).toBe(inputID.id);
                }
            });

            test('steps from non-empty, spaarse ', () => {
                const result = cardCreator.setChecklistSteps(listWithEmptyInputs);
                const labels = result.querySelectorAll('label');

                expect(labels[0].textContent).toBe('Get stones');
                expect(labels[1].textContent).toBe('Build house');
                expect(labels[2].textContent).toBe('Take over the world');
            })

            test('returns the checklist container element', () => {
                const result = cardCreator.setChecklistSteps(validCheckList);

                expect(result).toBeTruthy();
                expect(result.classList.contains('checklist-container')).toBe(true);
            })
        })
    })
})