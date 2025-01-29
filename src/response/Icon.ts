export interface IconResponse {
    id: number;
    icon_Name: string;
}

export const ICON_API_URL = `${import.meta.env.PUBLIC_BASE_API_URL}/icons`;