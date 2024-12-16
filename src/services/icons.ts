import { type CustomResponse } from "../response/CustomResponse";
import { ICON_API_URL, type IconResponse } from "../response/Icon";
export async function getIcons(): Promise<IconResponse[]> {
    const response: CustomResponse<IconResponse> =
        await fetch(ICON_API_URL)
            .then((response) => response.json())
            .catch((error) => {
                if (error instanceof Error) {
                    throw error;
                } else {
                    throw new Error('An unexpected error occurred');
                }
            });

    if (response.success === 0)
        throw new Error(`error al obtener datos del servidor: ${response.message}`);

    const data: IconResponse[] = response.data;
    return data;
}