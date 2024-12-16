import { useEffect, useState } from "react";
import { type CardProps } from "../models/CardProps";
import { getStudyPlans } from "../services/studyPlans";

function useStudyPlanEffect() {
    const [studyPlanCards, setStudyPlanCards] = useState<CardProps[]>([]);
    const [refetchStudyPlans, setRefetchStudyPlans] = useState(false);
      useEffect(() => {
        console.log("haciendo fetch");
        getStudyPlans().then(
          (studyPlans) => {
            const studyPlanCards: CardProps[] = studyPlans.map((studyPlan) => ({
              id: studyPlan.id,
              title: studyPlan.associated_Subject + " | " + studyPlan.year_Of_Creation,
            }));
            setStudyPlanCards(studyPlanCards);
          }
        )
      },[refetchStudyPlans]);
      return {studyPlanCards, setRefetchStudyPlans};
}

export default useStudyPlanEffect;