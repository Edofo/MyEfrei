import styles from "./Classic.module.scss";

const Classic = ({ label, inputOptions }: { inputOptions?: JSX.IntrinsicElements["input"]; label?: string }) => {
    return (
        <div className={styles.input}>
            {label && (
                <label htmlFor={inputOptions?.id || ""}>
                    {label.slice(0, 1).toUpperCase()}
                    {label.slice(1)}
                </label>
            )}
            <input id={inputOptions?.id || ""} {...inputOptions} />
        </div>
    );
};

export default Classic;
