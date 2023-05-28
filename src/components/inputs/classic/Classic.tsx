import styles from "./Classic.module.scss";

const Classic = ({ label, inputOptions }: { inputOptions?: JSX.IntrinsicElements["input"]; label: string }) => {
    return (
        <div className={styles.input}>
            {label && (
                <label htmlFor={label}>
                    {label.slice(0, 1).toUpperCase()}
                    {label.slice(1)}
                </label>
            )}
            <input id={label || ""} {...inputOptions} />
        </div>
    );
};

export default Classic;
