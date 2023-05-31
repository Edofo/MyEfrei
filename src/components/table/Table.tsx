import "./Table.scss";

import { TableProps } from "@/types/components/Table";

const Table = ({ head, children, className, options }: TableProps) => {
    return (
        <table className={`${className || ""} Table`}>
            <thead>
                <tr>
                    {head.map((item, index) => {
                        return (
                            <th
                                key={index + "head"}
                                style={options?.headTextPostion === "left" ? { textAlign: "left" } : {}}
                            >
                                {item}
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    );
};

export default Table;
