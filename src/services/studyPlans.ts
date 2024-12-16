import { type StudyPlanResponse, STUDY_PLAN_API_URL} from "../response/StudyPlan";
import type { StudyPlanRequest } from "../request/StudyPlanRequest";
import { addData, getData } from "./fetchData";

export const getStudyPlans = () => getData<StudyPlanResponse>(STUDY_PLAN_API_URL);

export const addStudyPlan = (request: StudyPlanRequest) => addData(request, STUDY_PLAN_API_URL);