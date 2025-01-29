export interface SubjectCardResponse {
  id: number;
  subject_Name: string;
  icon_Name: string;
}

export const SUBJECT_CARD_API_URL = `${import.meta.env.PUBLIC_BASE_API_URL}/subjectscard`;
export const SUBJECT_API_URL = `${import.meta.env.PUBLIC_BASE_API_URL}/subjects`;