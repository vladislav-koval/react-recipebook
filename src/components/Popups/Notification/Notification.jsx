import React, {Fragment} from "react";
import classes from "./Notification.module.scss";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Button from "../../UI/Button/Button";
import Cross from "../../UI/Cross/Cross";

const Notification = props => {
    const cls = [
        classes.Notification,
        classes[props.type],
    ];
    const buttonType = props.type ? props.type : "successNotification";

    const defaultTitle = 'Уведомление';
    const defaultText = 'Рецепт успешно создан и ожидает проверки администратора!';

    return (
        <Fragment>
            <div className={cls.join(' ')}>
                <Cross onClick={props.onClick}/>
                <div className={classes.topContainer}>
                    <h2>{props.title ? props.title : defaultTitle}</h2>
                    <p>{props.text ? props.text : defaultText}</p>
                </div>
                <div>
                    <Button type={buttonType} onClick={props.onClick}>ОК</Button>
                </div>
            </div>
            <Backdrop onClick={props.onClick}/>
        </Fragment>
    );
};

export default Notification;
