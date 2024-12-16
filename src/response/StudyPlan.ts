export interface StudyPlanResponse {
        id: number;
        year_Of_Creation: number;
        associated_Subject: string; 
}

export const STUDY_PLAN_API_URL = "https://localhost:7054/api/studyplans";