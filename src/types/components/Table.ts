export interface TableProps {
    head: string[];
    children: JSX.Element[] | JSX.Element;
    className?: string;
    options?: {
        pagination?: boolean;
        pageSize?: number;
        headTextPostion: "left";
    };
}
