export interface IndividualResponse {
    id: number,
    first_Name: string,
    last_Name: string,
}

export const STUDENT_API_URL = `${import.meta.env.PUBLIC_BASE_API_URL}/students`;
export const INSTRUCTOR_API_URL = `${import.meta.env.PUBLIC_BASE_API_URL}/instructors`;