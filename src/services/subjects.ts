import { type SubjectCardResponse, SUBJECT_API_URL, SUBJECT_CARD_API_URL } from "../response/SubjectCard"
import type { SubjectRequest } from "../request/SubjectRequest";
import { addData, getData } from "./fetchData";

export const getSubjects = () => getData<SubjectCardResponse>(SUBJECT_CARD_API_URL);

export const addSubject = (request: SubjectRequest) => addData(request, SUBJECT_API_URL);