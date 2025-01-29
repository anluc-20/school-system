export interface TopicStudyPlanResponse {
    id: number;
    topic_Id: number;
    topic_Name: string;
    description: string;
}

export const TOPICS_STUDY_PLANS_API_URL = `${import.meta.env.PUBLIC_BASE_API_URL}/topicsstudyplans`
export const getUrlById = (studyPlanId: number) => `${TOPICS_STUDY_PLANS_API_URL}/${studyPlanId}`;