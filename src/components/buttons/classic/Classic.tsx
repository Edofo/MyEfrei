import styles from "./Classic.module.scss";

const Classic = ({ text, buttonOptions }: { text: string; buttonOptions?: JSX.IntrinsicElements["button"] }) => {
    return (
        <button className={styles.buttonClassic} {...buttonOptions}>
            {text}
        </button>
    );
};

export default Classic;
