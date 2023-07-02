import { usePopupContext } from "@/contexts/PopupContext";
import styles from "./DeleteGrade.module.scss";

import { ButtonList } from "@/components";

const DeleteGrade = () => {
    const { hidePopup } = usePopupContext();

    const handleSubmit = () => {};

    return (
        <div className={styles.DeleteGrade}>
            <h2>Supprimer une note</h2>

            <p>Êtes vous sûr de supprimer cette note ?</p>

            <div className={styles.buttons}>
                <ButtonList.Classic buttonOptions={{ onClick: handleSubmit }} text="Oui" />
                <ButtonList.Classic buttonOptions={{ onClick: hidePopup, className: styles.delete }} text="Non" />
            </div>
        </div>
    );
};

export default DeleteGrade;
