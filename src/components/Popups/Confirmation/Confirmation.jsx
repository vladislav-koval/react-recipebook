import React, {Component, Fragment} from "react";
import classes from "./Confirmation.module.scss";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Input from "../../UI/Input/Input";
import {onChangeHandler} from "../../../form/formService";
import Button from "../../UI/Button/Button";
import Cross from "../../UI/Cross/Cross";

class Confirmation extends Component {

    state = {
        isFormValid: false,
        formControls: {
            message: {
                value: '',
                type: 'text',
                label: '',
                errorMessage: 'Укажите причину',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 5,
                }
            }
        }
    };

    onChangeInput = (event) => {
        const {formControls, isFormValid} = onChangeHandler(event, {...this.state.formControls}, 'message');
        this.setState({
            formControls,
            isFormValid
        });
    };

    render() {
        return (
            <Fragment>
                <div className={classes.Confirmation}>
                    <Cross onClick={this.props.onCancelClick}/>
                    <h2>{this.props.title}</h2>
                    <Input
                        type={"text"}
                        value={this.state.formControls.value}
                        valid={this.state.formControls.valid}
                        touched={this.state.formControls.touched}
                        label={this.state.formControls.label}
                        errorMessage={this.state.formControls.errorMessage}
                        shouldValidate={!!this.state.formControls.validation}
                        onChange={(event) => this.onChangeInput(event)}
                    />
                    <div className={classes.buttonsContainer}>
                        <Button onClick={() => this.props.onOkClick(this.state.formControls.message.value)}
                                type={"primary-blue"} disabled={!this.state.isFormValid}>ОК</Button>
                        <Button onClick={this.props.onCancelClick} type={"primary-dark"}>Отмена</Button>
                    </div>
                </div>
                <Backdrop onClick={this.props.onCancelClick}/>
            </Fragment>

        );
    }

};

export default Confirmation;
