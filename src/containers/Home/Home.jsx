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

class Home extends Component{
    render() {
        return (
            <div className="container">
                <ul className="main-list">
                    <li className="main-list__item">
                        <a href="" className="main-list__link">
                            <Image src={img1} alt={"lflf"}/>
                            <span>Первые блюда</span>
                        </a>
                    </li>
                    <li className="main-list__item">
                        <a href="" className="main-list__link">
                            <Image src={img2} alt={"lflf"}/>
                            <span>Вторые блюда</span>
                        </a>
                    </li>
                    <li className="main-list__item">
                        <a href="" className="main-list__link">
                            <Image src={img3} alt={"lflf"}/>
                            <span>Закуски</span>
                        </a>
                    </li>
                    <li className="main-list__item">
                        <a href="" className="main-list__link">
                            <Image src={img4} alt={"lflf"}/>
                            <span>Салаты</span>
                        </a>
                    </li>
                    <li className="main-list__item">
                        <a href="" className="main-list__link">
                            <Image src={img5} alt={"lflf"}/>
                            <span>Десерты</span>
                        </a>
                    </li>
                    <li className="main-list__item">
                        <a href="" className="main-list__link">
                            <Image src={img6} alt={"lflf"}/>
                            <span>Изделия из теста</span>
                        </a>
                    </li>
                    <li className="main-list__item">
                        <a href="" className="main-list__link">
                            <Image src={img7} alt={"lflf"}/>
                            <span>Напитки</span>
                        </a>
                    </li>
                    <li className="main-list__item">
                        <a href="" className="main-list__link">
                            <Image src={img8} alt={"lflf"}/>
                            <span>Другие</span>
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Home;
