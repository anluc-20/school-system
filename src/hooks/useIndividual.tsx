import { getInstructor, getStudent } from "../services/individuals";
import { useFetch } from "./useFetch";

export const useStudent = () => useFetch(getStudent);

export const useInstructor = () => useFetch(getInstructor);