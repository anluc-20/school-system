import { type TopicStudyPlanResponse, TOPICS_STUDY_PLANS_API_URL, getUrlById } from "../response/TopicStudyPlan";
import { type EntityOperationsRequest } from "../request/EntityOperationsRequest";
import { addData, getData } from "./fetchData";

export const getTopicsByStudyPlanId = (studyPlanId: number) => getData<TopicStudyPlanResponse>(getUrlById(studyPlanId));

export const modifyTopicStudyPlan = (request: EntityOperationsRequest) => addData(request, TOPICS_STUDY_PLANS_API_URL);