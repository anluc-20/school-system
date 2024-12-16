export interface TopicStudyPlanResponse {
    id: number;
    topic_Id: number;
    topic_Name: string;
    description: string;
}

export const TOPICS_STUDY_PLANS_API_URL = "https://localhost:7054/api/topicsstudyplans"
export const getUrlById = (studyPlanId: number) => `${TOPICS_STUDY_PLANS_API_URL}/${studyPlanId}`;