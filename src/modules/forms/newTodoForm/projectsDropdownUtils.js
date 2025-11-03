export function createOptions(optionsArray, selectElement) {
    selectElement.replaceChildren();

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.selected = true;

    selectElement.appendChild(defaultOption);

    optionsArray.forEach((option) => {
        const newOption = document.createElement('otpion');
        newOption.value = option;
        newOption.textContent = option;
        selectElement.appendChild(newOption);
    })

    return selectElement;
}