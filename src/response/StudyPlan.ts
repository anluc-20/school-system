export interface StudyPlanResponse {
        id: number;
        year_Of_Creation: number;
        associated_Subject: string; 
}

export const STUDY_PLAN_API_URL = `${import.meta.env.PUBLIC_BASE_API_URL}/studyplans`;