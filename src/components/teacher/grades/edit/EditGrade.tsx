import { useState } from "react";

import styles from "./EditGrade.module.scss";

import { ButtonList, InputList } from "@/components";

const EditGrade = () => {
    const [selectedGrade, setSelectedGrade] = useState("");

    const handleSubmit = () => {};

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
