import styles from "./Classic.module.scss";

import { PopupClassic } from "@/types/components/popup/Classic";

const Classic = ({ children, onClose }: PopupClassic) => {
    return (
        <div className={styles.popupClassic}>
            <div className={styles.subPopup}>
                {children}
                <i onClick={onClose} className={`${styles.close} fas fa-times`} />
            </div>
        </div>
    );
};

export default Classic;
