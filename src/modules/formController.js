export class FormControl {
    static #classInvoked = false;
    static #formNode = document.getElementById('new-todo-form');
    static #dialog = document.querySelector('dialog');
    static #checkListContainer = document.getElementById('checklist-container');

    static #processSubmit(event) {
        /**This method takes a submit event, creates a formData object,
         * parses it, and repacks it.
         * 
         * If the user adds checklist steps to their Todo task,
         * we parse the formData and bundle the steps into their own object.
         * 
         * This "checklist" object is then added as a property to the proccessed data.
         */
        const formData = new FormData(event.target);

        const data = {};
        const steps = {};

        for (const [key, value] of formData.entries()) {
            if (key.startsWith('step') && value.trim()) {
                steps[key] = value;
            }

            else if (value.trim()) {
                data[key] = value;
            }
        }

        if (Object.keys(steps).length > 0) {
            data.steps = {...steps};
        }
        const formSubmitted = new CustomEvent('todoSubmitted', { detail: {data} });
        document.dispatchEvent(formSubmitted);
    }

    static #deleteAllChecklistSteps() {
        FormControl.#checkListContainer.querySelector('section').innerHTML = '';
    }

    static #resetAndClose() {
        FormControl.#deleteAllChecklistSteps();
        FormControl.#formNode.reset();
        FormControl.#dialog.close();
    }

    static #addChecklistStep() {
        const checkListInputTemplate = document.getElementById('checklist-step-input');
        const templateContent = checkListInputTemplate.content.cloneNode(true);

        const checkListStepsSection = FormControl.#checkListContainer.querySelector('section')
        const currentStep = checkListStepsSection.childElementCount + 1

        templateContent.querySelector('label').htmlFor = `step${currentStep}`;
        templateContent.querySelector('label').textContent = `Step ${currentStep}: `;

        templateContent.querySelector('input').setAttribute('name', `step${currentStep}`);
        templateContent.querySelector('input').id = `step${currentStep}`;

        checkListStepsSection.appendChild(templateContent);
    }

    static #deleteChecklistStep(selectedContainer) {
        selectedContainer.parentElement.remove();
    }

    static #renumberChecklistSteps() {
        const stepsContainer = FormControl.#checkListContainer.querySelector('section');
        const childNodes = stepsContainer.children;
        let stepCounter = 1;

        for (const node of childNodes) {
            const stepLabel = node.children[0];
            const stepInput = node.children[1];

            stepLabel.htmlFor = `step${stepCounter}`;
            stepLabel.textContent = `Step ${stepCounter}: `;

            stepInput.setAttribute('name', `step${stepCounter}`);
            stepInput.id = `step${stepCounter}`;

            ++stepCounter;
        };
    }

    static #eventDelegator() {
        // FormControl.#formNode.addEventListener('submit', (event) => {
        //     event.preventDefault();
        //     FormControl.#processSubmit(event);
        //     FormControl.#resetAndClose();
        // })

        FormControl.#formNode.addEventListener('click', (event) => {
            if (event.target.id === 'add-step') {
                FormControl.#addChecklistStep();
            }

            if (event.target.dataset.action === 'cancel') {
                FormControl.#resetAndClose();
            }

            // Reset button will not delete the checklist step fields, so we need to do it manually
            if (event.target.dataset.action === 'reset') {
                FormControl.#deleteAllChecklistSteps();
            }

            if (event.target.dataset.action === 'delete') {
                FormControl.#deleteChecklistStep(event.target);
                FormControl.#renumberChecklistSteps();
            }
        })
    }

    static initializeEventListeners() {
        if (FormControl.#classInvoked) {
            console.error('FormControl class already invoked');
            return;
        }

        FormControl.#classInvoked = true;
        FormControl.#eventDelegator();
    }
}

export function objectifySubmission(formData) {
    if (formData instanceof FormData === false) {
        throw new TypeError('Passed parameter must be instance of: FormData');
    }
    
    const dataObject = Object.fromEntries(formData);
    return dataObject;
}

export function bundleKeys(dataObject, substring, bundledKey) {
    /**Bundles related data into it's own sub-object that will be appended to the main object.
     * 
     * Parameters:
     *  dataObject - the object to extract data from to bundle
     *  substring - the common string amongst the keys whose value will be bundled
     *  bundledKey - the key name for the nested object that holds the bundled data
     * 
     * The bundledData retains the same key: value names and data after they have been nested,
     * a deep-copy, cloned object is used to perform this process. The bundled key: value pair
     * are deleted after they have been bundled.
     * 
     * The cloned object is returned
     */

    if (dataObject instanceof Object === false || objectIsPrototype(dataObject) === false) {
        throw TypeError('dataObject must be instanceof Object');
    }

    if (typeof(substring) !== 'string' || typeof(bundledKey) !== 'string') {
        const badParameter = (typeof(substring) !== 'string') ? 'substring' : 'bundledKey';
        throw TypeError(`${badParameter} must be of type: String`);
    }

    const clonedObj = structuredClone(dataObject);
    const bundledData = {};
    
    for (const [key, value] of Object.entries(clonedObj)) {
        if (key.startsWith(substring)) {
            // Only adds non-empty fields, but still cleans them up
            if (value.trim()) {
                bundledData[key] = value;
            }
            delete clonedObj[key];
        }
    }

    if (Object.keys(bundledData).length > 0) {
        clonedObj[bundledKey] = {...bundledData};
    }

    return clonedObj;
}

function objectIsPrototype(object) {
    return Object.getPrototypeOf(object) === Object.prototype;
}