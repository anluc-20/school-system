import { CLASS_GROUP_API_URL, type ClassGroupResponse } from "../response/ClassGroup";
import { getData } from "./fetchData";

export const getClassGroups = () => getData<ClassGroupResponse>(CLASS_GROUP_API_URL);