import { type IndividualResponse, INSTRUCTOR_API_URL, STUDENT_API_URL } from "../response/Individual";
import { type IndividualRequest } from "../request/IndividualRequest";
import { addData, getData } from "./fetchData";

export const getStudent = () => getData<IndividualResponse>(STUDENT_API_URL);
export const getInstructor = () => getData<IndividualResponse>(INSTRUCTOR_API_URL);

export const addStudent = (request: IndividualRequest) => addData(request, STUDENT_API_URL);
export const addInstructor = (request: IndividualRequest) => addData(request, INSTRUCTOR_API_URL);