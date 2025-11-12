export function addStep(parentContainer, template) {
    const templateClone = template.content.cloneNode(true);

    const label = templateClone.querySelector('label');
    const input = templateClone.querySelector('input');

    const uniqueId = Date.now();
    const idValue = `checklist-item-${uniqueId}`;

    label.htmlFor = idValue;
    input.id = idValue;

    parentContainer.appendChild(templateClone);

    return templateClone.firstElementChild;
}

export function deleteStep(selectedStep) {
    selectedStep.remove();
}

export function clearChecklistContainer(parentContainer) {
    parentContainer.replaceChildren();
    return parentContainer;
}