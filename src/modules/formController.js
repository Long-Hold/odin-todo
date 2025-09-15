const formController = (function() {
    const form = document.getElementById('new-task');
    const dialog = document.querySelector('dialog');

    form.addEventListener('submit', (event) => {
        dialog.close();
        event.preventDefault();
    })

    /**Each time the user wants to 'add step',
     * we will create a standard text input field already populated with a number
     * representing the step.
     */
    form.addEventListener('click', (event) => {
        if (event.target.id === 'add-step') {
            console.log('User added new step');
        }
    })
});

export { formController } ;