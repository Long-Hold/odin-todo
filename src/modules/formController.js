const formController = (function() {
    const form = document.getElementById('new-task');
    const checkListField = document.getElementById('checklist-field');
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';

    let stepCounter = 1;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
    })

    form.addEventListener('click', (event) => {
        if (event.target.id === 'add-step') {
            console.log('User added new step');
        }
    })

    const addCheckBox = () => {

    }
});

export { formController } ;