import type { CustomResponse } from "../response/CustomResponse";

export async function getData<T>(apiUrl: string): Promise<T[]> {
    console.log(apiUrl);
    const response: CustomResponse<T> =
        await fetch(apiUrl)
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

    const data: T[] = response.data;
    return data;
}

export async function addData<T>(request: T, apiUrl: string): Promise<CustomResponse<number>> {
    const response: CustomResponse<number> =
        await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Asegurarte de especificar el tipo de contenido si envías JSON
              },
            body: JSON.stringify(request),
        })
            .then((response) => response.json())
            .catch((error) => {
                if (error instanceof Error) {
                    throw error;
                } else {
                    throw new Error('An unexpected error occurred');
                }
            });

    return response;
}