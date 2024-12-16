import { type TopicResponse, TOPIC_API_URL } from "../response/Topic";
import { type TopicRequest } from "../request/TopicRequest";
import { addData, getData } from "./fetchData";

export const getTopics = () => getData<TopicResponse>(TOPIC_API_URL);

export const addTopic = (request: TopicRequest) => addData(request, TOPIC_API_URL);