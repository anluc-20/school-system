export interface ClassGroupResponse {
    id: number,
    class_Group_Name: string,
    topic_Id: number,
    instructor_Id: number,
}

export const CLASS_GROUP_API_URL = "https://localhost:7054/api/classgroups";
export const getUrlById = (id: number) => `${CLASS_GROUP_API_URL}/${id}`;