import { useState } from "react";

import styles from "./EditGrade.module.scss";

import { useMessageContext } from "@/contexts/MessageContext";

import { ButtonList, InputList } from "@/components";

import useUpdateGrade from "@/api/teacher/grades/UpdateGrade";

const EditGrade = ({ grade_uuid }: { grade_uuid: string }) => {
    const { showMessage, MessageType } = useMessageContext();
    const { mutateAsync: editGrade } = useUpdateGrade();

    const [selectedGrade, setSelectedGrade] = useState("");

    const handleSubmit = async () => {
        const result = await editGrade({ grade_uuid, value: selectedGrade });

        if (result?.success) {
            showMessage({ message: "La note a bien été modifiée", type: MessageType.SUCCESS });
        } else {
            showMessage({ message: "Une erreur est survenue", type: MessageType.ERROR });
        }

        // window.location.reload();
    };

    return (
        <div className={styles.EditGrade}>
            <h2>Modifier une note</h2>

            <div>
                <p>Sélectionne la note :</p>
                <InputList.Classic
                    inputOptions={{
                        placeholder: "Note",
                        onChange: e => setSelectedGrade(e.target.value),
                        type: "number",
                        min: 0,
                        max: 20,
                    }}
                />
            </div>

            {selectedGrade !== "" && <ButtonList.Classic buttonOptions={{ onClick: handleSubmit }} text="Modifier" />}
        </div>
    );
};

export default EditGrade;
