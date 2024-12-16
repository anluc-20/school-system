export interface TopicResponse {
    id: number;
    topic_Name: string;
    description: string;
}

export const TOPIC_API_URL = "https://localhost:7054/api/topics"