import styles from "./Home.module.scss";

import Slide1 from "@/assets/img/slide/slide1.jpg";
import Slide2 from "@/assets/img/slide/slide2.jpg";
import Slide3 from "@/assets/img/slide/slide3.jpg";

import { Slider } from "@/components";

const Home = () => {
    return (
        <div className={styles.home}>
            <Slider>
                <picture>
                    <source media="(min-width: 768px)" srcSet={Slide1} />
                    <img className={styles.slideImg} src={Slide1} alt="slide" />
                </picture>
                <picture>
                    <source media="(min-width: 768px)" srcSet={Slide2} />
                    <img className={styles.slideImg} src={Slide2} alt="slide" />
                </picture>
                <picture>
                    <source media="(min-width: 768px)" srcSet={Slide3} />
                    <img className={styles.slideImg} src={Slide3} alt="slide" />
                </picture>
            </Slider>
            <h1>Bienvenue sur MyEfrei</h1>
            <p>
                myEfrei est la plateforme qui centralise l'ensemble de vos services de l'Efrei.
                <br /> Le site a bénéficié d'une refonte en s'appuyant sur les technos web les plus récentes, dans le
                but de toujours répondre au mieux à vos attentes.
            </p>
        </div>
    );
};

export default Home;
