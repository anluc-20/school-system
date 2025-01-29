export interface TopicResponse {
    id: number;
    topic_Name: string;
    description: string;
}

export const TOPIC_API_URL = `${import.meta.env.PUBLIC_BASE_API_URL}/topics`