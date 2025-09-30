import { createCardCreator } from "../createTodoCard";
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
        });

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
        describe('when given invalid input', () => {
            test.each([
                {description: 'number', input: 1},
                {description: 'array', input: ['Title in array!']},
                {description: 'object', input: {title: 'Title in object!'}},
            ])('throws TypeError for $description input', ({description, input}) => {
                expect(() => cardCreator.setTitle(input)).toThrow(TypeError);
            });

            test.each([
                {description: 'empty string', input: ''},
                {description: 'whitespace only', input: '    '},
                {description: 'single space only', input: ' '},
            ])('throws Error for $description input', ({description, input}) => {
                expect(() => cardCreator.setTitle(input)).toThrow(Error);
            });

            test.each([
                {description: '65 char string', input: 'A'.repeat(65)},
                {description: '70 char string', input: 'A'.repeat(70)},
                {description: 'string with chars and spaces', input:'A A'.repeat(64)}
            ])('throws Error for $description input', ({description, input}) => {
                expect(() => cardCreator.setTitle(input)).toThrow(Error);
            });
        });

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
        describe('when given invalid input', () => {
            test.each([
                {description: 'number', input: 1},
                {description: 'array', input: ['Priority in Array!']},
                {description: 'object', input: {title: 'Title in an object!'}},
            ])('throws TypeError for $description input', ({description, input}) => {
                expect(() => cardCreator.setPriority(input)).toThrow(TypeError);
            });

            test.each([
                {description: 'empty string', input: ''},
                {description: 'whitespace only', input: '    '},
                {description: 'single space', input: ' '},
                {description: 'formatted empty string', input: `  `}
            ])('throws Error for $description input', ({description, input}) => {
                expect(() => cardCreator.setPriority(input)).toThrow(Error);
            });

            test.each([
                {description: 'invalid keyword', input: 'Super Important'},
                {description: 'improper capitalization', input: 'lOw'},
                {description: 'uppercase', input: 'MEDIUM'}
            ])('throws TypeError for $description input', ({description, input}) => {
                expect(() => cardCreator.setPriority(input)).toThrow(TypeError);
            });
        });

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
        describe('when given invalid input', () => {
            test.each([
                {description: 'number', input: 1},
                {description: 'array', input: ['My Project']},
                {description: 'object', input: {bad: {idea: 'I agree'}}},
            ])('throws TypeError for $description input', ({description, input}) => {
                expect(() => cardCreator.setProject(input)).toThrow(TypeError);
            });
        });

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
            ])('throws Error when passed $description', ({description, input}) => {
                expect(() => cardCreator.setChecklistSteps(input)).toThrow(Error);
            });

            test.each([
                {description: 'string', input: 'Take out the trash'},
                {description: 'array', input: ['My', 'array']},
                {description: 'array using new Array()', input: new Array()},
                {description: 'number', input: 1},
            ])('throws TypeError when passed $description', ({description, input}) => {
                expect(() => cardCreator.setChecklistSteps(input)).toThrow(TypeError);
            });

            test('throws Error when passed empty object', () => {
                expect(() => cardCreator.setChecklistSteps({})).toThrow(Error);
            });
        })

        describe('when given valid input', () => {
            const validCheckList = {
                step1: 'Open fridge',
                step2: 'Get food',
                step3: 'Cook food',
            }

            test('creates correct number of checklist items', () => {
                const result = cardCreator.setChecklistSteps(validCheckList);
                expect(result.children.length).toBe(3);
            })

            test('filters out empty and whitespace only steps', () => {
                const listWithEmptyInputs = {
                    step1: 'Get stones',
                    step2: ' ',
                    step3: 'Build house',
                    step4: '   ',
                    step5: '  ',
                    step6: 'Take over the world',
                }
                
                const result = cardCreator.setChecklistSteps(listWithEmptyInputs);
                expect(result.children.length).toBe(3);
            })


        })
    })
})