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

const authControls = {
    login: {
        value: '',
        type: 'text',
        label: 'Логин',
        errorMessage: 'Логин не может быть пустым',
        valid: false,
        touched: false,
        validation: {
            required: true,
            login: true,
        }
    },
    password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Пароль может состоять минимум из 6 символов',
        valid: false,
        touched: false,
        validation: {
            required: true,
            minLength: 6,
        }
    },
    name: {
        value: '',
        type: 'text',
        label: 'Имя',
        errorMessage: 'Имя не может быть пустым',
        valid: false,
        touched: false,
        validation: {
            required: true,
            minLength: 2,
        }
    },
    surname: {
        value: '',
        type: 'text',
        label: 'Фамилия',
        errorMessage: 'Фамилия не может быть пустой',
        valid: false,
        touched: false,
        validation: {
            required: true,
            minLength: 2,
        }
    }
};

const recipeControls = {
    name: {
        value: '',
        type: 'text',
        label: 'Название рецепта',
        errorMessage: 'Название не может быть пустым',
        valid: false,
        touched: false,
        validation: {
            required: true,
            minLength: 1,
        }
    },

    ingredient: {
        value: '',
        type: 'text',
        label: '',
        errorMessage: '',
        valid: true,
        touched: false,
    }
};

export function getRecipeControls() {
    return {
        name: recipeControls.name,
    }
}

export function getRecipeIngredientControl() {
    return recipeControls.ingredient;
}

export function getLoginControls() {
    return {
        login: authControls.login,
        password: authControls.password
    }
}

export function getProfileControls() {
    return {
        login: {...authControls.login, valid: true},
        name: {...authControls.name, valid: true},
        surname: {...authControls.surname, valid: true}
    }
}
