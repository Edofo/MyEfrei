import styles from "./DeleteGrade.module.scss";

import { usePopupContext } from "@/contexts/PopupContext";
import { useMessageContext } from "@/contexts/MessageContext";

import { ButtonList } from "@/components";

import useDeleteGrade from "@/api/teacher/grades/DeleteGrade";

const DeleteGrade = ({ grade_uuid }: { grade_uuid: string }) => {
    const { showMessage, MessageType } = useMessageContext();
    const { hidePopup } = usePopupContext();

    const { mutateAsync: deleteGrade } = useDeleteGrade();

    const handleSubmit = async () => {
        const result = await deleteGrade({ grade_uuid });

        if (result?.success) {
            showMessage({ message: "La note a bien été supprimée", type: MessageType.SUCCESS });
        } else {
            showMessage({ message: "Une erreur est survenue", type: MessageType.ERROR });
        }

        // window.location.reload();
    };

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
