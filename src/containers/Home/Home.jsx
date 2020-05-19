import React, {Component} from "react";
import Image from "../../components/UI/Image/Image";
import img1 from "../../assets/img/1.png"
import img2 from "../../assets/img/2.png"
import img3 from "../../assets/img/3.png"
import img4 from "../../assets/img/4.png"
import img5 from "../../assets/img/5.png"
import img6 from "../../assets/img/6.png"
import img7 from "../../assets/img/7.png"
import img8 from "../../assets/img/8.png"
import {NavLink} from "react-router-dom";

class Home extends Component{
    render() {
        return (
            <div className="container">
                <ul className="main-list">
                    <li className="main-list__item">
                        <NavLink to={"/category/firstCourse"} className="main-list__link">
                            <Image src={img1} alt={"lflf"}/>
                            <span>Первые блюда</span>
                        </NavLink>
                    </li>
                    <li className="main-list__item">
                        <NavLink to={"/category/secondCourse"} className="main-list__link">
                            <Image src={img2} alt={"lflf"}/>
                            <span>Вторые блюда</span>
                        </NavLink>
                    </li>
                    <li className="main-list__item">
                        <NavLink to={"/category/snack"} className="main-list__link">
                            <Image src={img3} alt={"lflf"}/>
                            <span>Закуски</span>
                        </NavLink>
                    </li>
                    <li className="main-list__item">
                        <NavLink to={"/category/salad"} className="main-list__link">
                            <Image src={img4} alt={"lflf"}/>
                            <span>Салаты</span>
                        </NavLink>
                    </li>
                    <li className="main-list__item">
                        <NavLink to={"/category/dessert"} className="main-list__link">
                            <Image src={img5} alt={"lflf"}/>
                            <span>Десерты</span>
                        </NavLink>
                    </li>
                    <li className="main-list__item">
                        <NavLink to={"/category/doughProduct"} className="main-list__link">
                            <Image src={img6} alt={"lflf"}/>
                            <span>Изделия из теста</span>
                        </NavLink>
                    </li>
                    <li className="main-list__item">
                        <NavLink to={"/category/drink"} className="main-list__link">
                            <Image src={img7} alt={"lflf"}/>
                            <span>Напитки</span>
                        </NavLink>
                    </li>
                    <li className="main-list__item">
                        <NavLink to={"/category/other"} className="main-list__link">
                            <Image src={img8} alt={"lflf"}/>
                            <span>Другие</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Home;
