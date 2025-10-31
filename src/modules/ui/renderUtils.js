export function renderChildElement(parentContainer, childElement) {
    parentContainer.appendChild(childElement);

    return parentContainer;
}

export function clearContainer(container) {
    container.replaceChildren();

    return container;
}

export function removeChildElement(parentContainer, childElement) {
    parentContainer.removeChild(childElement);

    return parentContainer;
}