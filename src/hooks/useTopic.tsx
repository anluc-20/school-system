import { useEffect, useState } from "react";
import { type TopicCardProps } from "../models/TopicCardProps";
import { getTopics} from "../services/topics";
import { getTopicsByStudyPlanId } from "../services/topicsStudyPlans";

export function useTopicEffect(){
    const [topicCards, setTopicCards] = useState<TopicCardProps[]>([]);
    const [refetchTopics, setRefetchTopics] = useState(false);
      useEffect(() => {
        getTopics().then(
          (topics) => {
            const topicCards: TopicCardProps[] = topics.map((topic) => ({
              topic_id: topic.id,
              topic_name: topic.topic_Name,
              description: topic.description,
            }));
            setTopicCards(topicCards);
          }
        )
      },[refetchTopics]);
      return {topicCards, setRefetchTopics};
}

export function useTopicByIdEffect(studyPlanId: number){
  const [topicByIdCards, setTopicByIdCards] = useState<TopicCardProps[]>([]);
  const [refetchTopicsById, setRefetchTopicsById] = useState(false);
    useEffect(() => {
      getTopicsByStudyPlanId(studyPlanId).then(
        (topics) => {
          const topicCards: TopicCardProps[] = topics.map((topic) => ({
            topic_id: topic.topic_Id,
            topic_name: topic.topic_Name,
            description: topic.description,
            relationship_id: topic.id,
          }));
          setTopicByIdCards(topicCards);
        }
      )
    },[refetchTopicsById, studyPlanId]);
    return {topicByIdCards, setRefetchTopicsById};
}