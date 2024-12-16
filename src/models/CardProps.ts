export interface CardProps {
    id?: number;
    title: string;
    className?: string;
    href?: string;
    icon?: string;
    textColor?: string;
    onClick?: (id: number) => void;
}