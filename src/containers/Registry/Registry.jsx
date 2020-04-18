import React, {Component} from "react";
import classes from "../Auth/Auth.module.scss";
import Button from "../../components/UI/Button/Button";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Input from "../../components/UI/Input/Input";
import {onChangeHandler} from "../../form/formService";
import Cross from "../../components/UI/Cross/Cross";
import AuthService from "../../service/authService";

class Registry extends Component {

    state = {
        isFormValid: false,
        formControls: {
            login: {
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
                value: '',
                type: 'password',
                label: 'Подтвердите пароль',
                errorMessage: 'Пароли не совпадают',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    confirmPass: true
                }
            },
            name: {
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
            }
        },
    };

    submitHandler = (event) => {
        event.preventDefault();
    };

    registryHandler = () => {
        const login = this.state.formControls.login.value;
        const password = this.state.formControls.password.value;
        const name = this.state.formControls.name.value;
        const surname = this.state.formControls.surname.value;

        AuthService.registerNewUser(login, password, name, surname).then(response => console.log(response));
    };

    onChangeHandler = (event, controlName) => {
        const {formControls, isFormValid} = onChangeHandler(event, {...this.state.formControls}, controlName);
        this.setState({
            formControls,
            isFormValid
        });
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
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
                    <Cross onClick={this.props.onClick}/>
                    {this.renderInputs()}
                    <Button type='primary'
                            onClick={this.registryHandler}
                            disabled={!this.state.isFormValid}>Вход</Button>
                </form>
                <Backdrop onClick={this.props.onClick}/>
            </React.Fragment>
        );
    }

}

export default Registry;
