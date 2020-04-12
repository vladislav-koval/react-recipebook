export function validateControl(validation, value, value2) {
    if (!validation) {
        return true;
    }

    let isValid = true;
    if (validation.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (validation.confirmPass) {
        isValid = value === value2;
    }

    if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
}

function onChangePassword(password, confirmPassword) {
    confirmPassword.valid = validateControl(confirmPassword.validation, confirmPassword.value, password.value);
    return confirmPassword;
}

export function onChangeHandler(event, formControls, controlName) {
    const control = {...formControls[controlName]};
    const control2 = formControls.password;
    control.value = event.target.value;
    control.touched = true;
    if (controlName == 'password') {
        console.log(formControls.confirmPassword);
        formControls.confirmPassword = onChangePassword(formControls.password, formControls.confirmPassword);

    }
    control.valid = validateControl(control.validation, control.value, control2.value);

    formControls[controlName] = control;

    let isFormValid = true;
    Object.keys(formControls).forEach(name => {
        isFormValid = formControls[name].valid && isFormValid;
    });

    return {formControls, isFormValid}
}
