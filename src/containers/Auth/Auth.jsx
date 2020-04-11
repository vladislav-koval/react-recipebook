import React, {Component} from "react";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.scss";
import Button from "../../components/UI/Button/Button";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            login: {
                forLogin: true,
                value: '',
                type: '',
                label: 'Логин',
                errorMessage: 'Введите корректный логин',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    login: true,
                }
            },
            password: {
                forLogin: true,
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6,
                }
            },
            confirmPassword: {
                forLogin: false,
                value: '',
                type: 'password',
                label: 'Подтвердите пароль',
                errorMessage: 'Пароли не совпадают',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6,
                    confirmPass: true
                }
            },
            name: {
                forLogin: false,
                value: '',
                type: 'text',
                label: 'Имя',
                errorMessage: 'Введите корректное имя',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 2,
                }
            },
            surname: {
                forLogin: false,
                value: '',
                type: 'text',
                label: 'Фамилия',
                errorMessage: 'Введите корректную фамилию',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 2,
                }
            },
        }
    };

    submitHandler = (event) => {
        event.preventDefault();
    };

    //при нажатии на кнопку авторицации
    loginHandler = () => {
        this.props.auth(this.state.formControls.email.value, this.state.formControls.password.value, true)
    };

    registryHandler = () => {

    };

    validateControl(value, validation) {
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

        if (validation.confirmPass) {
            isValid = value === this.state.formControls.password.value;
        }
        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid;
        });
        this.setState({
            formControls,
            isFormValid
        });
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            if(this.props.isLogin === false && control.forLogin === false)
                return null;
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={(event) => this.onChangeHandler(event, controlName)}
                />
            );
        })
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.submitHandler} className={classes.Auth}>
                    {this.renderInputs()}
                    <Button type='primary'
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}>Вход</Button>
                </form>
                <Backdrop onClick={this.props.onClick}/>
            </React.Fragment>
        );
    }
}

export default Auth;
