
export function validateControl(validation, value) {
    if (!validation) {
        return true;
    }

    let isValid = true;
    if (validation.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
}

export function onChangeHandler(event, formControls, controlName) {
    const control = {...formControls[controlName]};
    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.validation, control.value);

    formControls[controlName] = control;

    let isFormValid = true;
    Object.keys(formControls).forEach(name => {
        isFormValid = formControls[name].valid && isFormValid;
    });

    return {formControls, isFormValid}
}
