import { getClassGroups } from "../services/classGroups";
import { useFetch } from "./useFetch";

export const useClassGroupEffect = () => useFetch(getClassGroups);