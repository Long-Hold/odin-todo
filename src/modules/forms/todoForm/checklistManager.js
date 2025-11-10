export function addStep(parentContainer) {
    const newStep = createStepElement(parentContainer.childElementCount + 1);
}

function createStepElement(stepNumber) {
    const uniqueId = `step_${crypto.randomUUID()}`;

    const div = document.createElement('div');

    const label = document.createElement('label');
    label.htmlFor = uniqueId;
    label.textContent = `Step ${stepNumber}:`;

    const input = document.createElement('input');
    input.type = 'text';
    input.id = uniqueId;
    input.name = uniqueId;
    input.placeholder = 'Enter step here';

    label.appendChild(input);

    const deleteBtn = document.createElement('button');

    div.appendChild(label);
}