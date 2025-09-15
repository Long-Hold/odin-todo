export function formController() {
    const formNode = document.getElementById('new-task');
    const dialog = document.querySelector('dialog');

    return new Promise((resolve) => {
        formNode.addEventListener('submit', (event) => {
            event.preventDefault();
            dialog.close();

            const formData = new FormData(event.target);
            resolve(formData);
        })
    })
}