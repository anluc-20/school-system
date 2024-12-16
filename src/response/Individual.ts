export interface IndividualResponse {
    id: number,
    first_Name: string,
    last_Name: string,
}

export const STUDENT_API_URL = "https://localhost:7054/api/individuals/students";
export const INSTRUCTOR_API_URL = "https://localhost:7054/api/individuals/instructors";