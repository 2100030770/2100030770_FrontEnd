document.addEventListener('DOMContentLoaded', () => {
    const formBuilder = document.getElementById('form-builder');
    const dynamicForm = document.getElementById('dynamic-form');

    document.getElementById('add-text').addEventListener('click', () => addField('text'));
    document.getElementById('add-checkbox').addEventListener('click', () => addField('checkbox'));
    document.getElementById('add-radio').addEventListener('click', () => addField('radio'));

    function addField(type) {
        const fieldWrapper = document.createElement('div');
        fieldWrapper.className = 'form-field';
        
        let field;
        switch (type) {
            case 'text':
                field = document.createElement('input');
                field.type = 'text';
                field.placeholder = 'Enter text';
                break;
            case 'checkbox':
                field = document.createElement('input');
                field.type = 'checkbox';
                const checkboxLabel = document.createElement('label');
                checkboxLabel.textContent = 'Checkbox';
                fieldWrapper.appendChild(checkboxLabel);
                break;
            case 'radio':
                field = document.createElement('input');
                field.type = 'radio';
                const radioLabel = document.createElement('label');
                radioLabel.textContent = 'Radio Button';
                fieldWrapper.appendChild(radioLabel);
                break;
        }
        
        fieldWrapper.appendChild(field);
        
        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            fieldWrapper.remove();
        });
        fieldWrapper.appendChild(removeButton);
        
        dynamicForm.appendChild(fieldWrapper);
    }
});