export interface ClassGroupResponse {
    id: number,
    class_Group_Name: string,
    topic_Id: number,
    instructor_Id: number,
}
export interface PartialClassGroupResponse {
    id: number,
    class_Group_Name: string,
    topic_Name: string,
}

export const CLASS_GROUP_API_URL = `${import.meta.env.PUBLIC_BASE_API_URL}/classgroups`;
export const getUrlById = (id: number) => `${CLASS_GROUP_API_URL}/${id}`;