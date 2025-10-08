export function createChecklistManager(checklistNode, template) {
    if (checklistNode instanceof HTMLElement === false) {
        throw new TypeError(`Expected HTMLElement. Received ${typeof(checklistNode)}`);
    }
    
    if (template instanceof HTMLTemplateElement === false) {
        throw new TypeError(`Expected HTMLTemplateElement. Received ${typeof(template)}`);
    }

    const checklistContainer = checklistNode;
    const inputTemplate = template;

    function createInputNode() {
        const inputClone = inputTemplate.content.cloneNode(true);
        const currentStep = checklistContainer.childElementCount + 1;

        inputClone.querySelector('label').htmlFor = `step${currentStep}`;
        inputClone.querySelector('label').textContent = `Step ${currentStep}`;

        inputClone.querySelector('input').setAttribute('name', `step${currentStep}`);
        inputClone.querySelector('input').id = `step${currentStep}`;

        return inputClone;
    }

    return {
        addInputField: () => {
            const inputNode = createInputNode();
            checklistContainer.appendChild(inputNode);

            return checklistContainer;
        },

        deleteInputField: (selectedContainer) => { 
            selectedContainer.parentElement.remove();
            return checklistContainer; 
        },
    }
}