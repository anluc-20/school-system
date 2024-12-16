export interface TopicCardProps {
    topic_id: number;
    relationship_id?: number;
    topic_name: string;
    description: string;
    onClick?: (id: number) => void;
    onDelete?: (id: number) => void;
    onEdit?: (id: number) => void;
    showExtra?: boolean;
}