export function addStep(parentContainer, template) {
    const stepNumber = parentContainer.childElementCount + 1;
    const templateClone = template.content.cloneNode(true);

    const label = templateClone.querySelector('label');
    const input = templateClone.querySelector('input');
    const attributeValue = `step${stepNumber}`;

    label.textContent = `Step ${stepNumber}`;
    label.htmlFor = attributeValue;
    input.id = attributeValue;
    input.name = attributeValue;

    label.appendChild(input);

    parentContainer.appendChild(templateClone);

    return templateClone.firstElementChild;
}

export function deleteStep(parentContainer, selectedStep) {
    selectedStep.remove();
    renumberSteps(parentContainer.childElementCount);
}

function renumberSteps(childrenCount) {
    //TODO: Renumber each step based on remaining children
}