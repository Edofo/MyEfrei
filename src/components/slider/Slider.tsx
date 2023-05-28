import { useEffect, useState } from "react";

import styles from "./Slider.module.scss";

import { SliderProps } from "@/types/components/Slider";

const Slider = ({ children }: SliderProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slide, setSlide] = useState(children[0] as JSX.Element);

    const length = children.length;

    const nextSlide = () => {
        setCurrentSlide(currentSlide === length - 1 ? 0 : currentSlide + 1);
    };

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? length - 1 : currentSlide - 1);
    };

    useEffect(() => {
        // add fade in animation
        const slideSelect = document.querySelector(`.${styles.slider}`);
        slideSelect?.classList.add(styles.fadeIn);

        // set slide
        setSlide(children[currentSlide]);

        // remove fade in animation
        setTimeout(() => {
            slideSelect?.classList.remove(styles.fadeIn);
        }, 500);
    }, [currentSlide, children]);

    return (
        <div className={styles.slider}>
            {slide}
            <button className={styles.prev} onClick={prevSlide}>
                &#10094;
            </button>
            <button className={styles.next} onClick={nextSlide}>
                &#10095;
            </button>

            <div className={styles.dots}>
                {children.map((_slide, index) => {
                    return (
                        <div
                            className={index === currentSlide ? styles.dotActive : ""}
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};

export default Slider;
