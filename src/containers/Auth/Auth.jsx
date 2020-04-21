import React, {Component} from "react";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.scss";
import Button from "../../components/UI/Button/Button";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import {onChangeHandler} from "../../form/formService";
import Cross from "../../components/UI/Cross/Cross";
import AuthService from "../../service/authService";

class Auth extends Component {

    state = {
        errorMessage: "",
        isError: false,
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
        }
    };

    submitHandler = (event) => {
        event.preventDefault();
    };

    loginHandler = () => {
        const username = this.state.formControls.login.value;
        const password = this.state.formControls.password.value;

        AuthService.executeBasicAuthenticationService(username, password)
            .then(() => {
                this.setState({errorMessage: "", isError: false});
                this.props.successfulAuthentication();
            })
            .catch((error) => {
                this.setState({errorMessage: error.message, isError: true})
            });
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
                    {this.state.isError &&
                        <div className={classes.error}>
                            {this.state.errorMessage}
                        </div>
                    }
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
