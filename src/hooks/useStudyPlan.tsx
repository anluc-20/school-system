import { useEffect, useState } from "react";
import { type CardProps } from "../models/CardProps";
import { getStudyPlans } from "../services/studyPlans";
import { useFetch, useMappedFetch } from "./useFetch";
import type { StudyPlanResponse } from "../response/StudyPlan";

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

const useStudyPlanEffect2 = () => useMappedFetch<StudyPlanResponse, CardProps>(getStudyPlans, (studyPlan) => ({
  id: studyPlan.id,
  title: studyPlan.associated_Subject + " | " + studyPlan.year_Of_Creation,
}));

export default useStudyPlanEffect;