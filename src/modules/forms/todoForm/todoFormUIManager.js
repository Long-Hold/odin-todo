

export function addSelectOption(selectElement, optionValue, optionTextContent) {
    const option = document.createElement('option');
    option.value = optionValue.trim();
    option.textContent = optionTextContent.trim();
    selectElement.appendChild(option);

    return selectElement;
}