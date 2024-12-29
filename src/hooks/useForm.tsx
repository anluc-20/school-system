import { useState } from "react";
import type { CustomResponse } from "../response/CustomResponse";

export function useForm<TRequest>(
    fetchRequest: (request: TRequest) => Promise<CustomResponse<number>>,
    initialRequest: TRequest,
) {
    const [request, setRequest] = useState<TRequest>(initialRequest);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<Error|undefined>();

    function sendRequest() {

        if(!request) {
            setError(new Error("empty request"));
            return;
        }

        console.log(request);
        
        setError(undefined)
        setSending(true);
        fetchRequest(request)
            .then((response) => {
                if (response.success == 0)
                    setError(new Error(response.message));
            })
            .catch((error) => setError(error))
            .finally(() => {
                setSending(false);
            });
    }

    function modifyRequest(updater: () => TRequest) {
        const newRequest = updater();
        console.log(request);
        setRequest({...request, ...newRequest});
    }

    return { sending, error, sendRequest, modifyRequest }
}