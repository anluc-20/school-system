import { useEffect, useState } from "react";


export function useMappedFetch<T,U>(
    fetchData: () => Promise<T[]>,
    mapCriteria: (value: T) => U,
) {
    //const [data, setData] = useState<T[]>();
    const [mappedData, setMappedData] = useState<U[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error>();
    const [controller, setController] = useState<AbortController>();
    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        setController(abortController);
        setLoading(true);

        fetchData()
            .then((data) => {
                setMappedData(data.map(mapCriteria));
            })
            .catch((error) => {
                if(error.name === "AbortError")
                    console.log("Request cancelled");
                else
                    setError(error);
            })
            .finally(() => setLoading(false));

        return () => abortController.abort();
    }, [refetch]);

    const handleCancelRequest = () => {
        if (controller) {
            controller.abort();
            setError(new Error("Request cancelled"));
        }
    }

    const refetchData = () => setRefetch(true);

    return {
        mappedData,
        loading,
        error,
        handleCancelRequest,
        refetchData,
    };
}

export function useFetch<T>(
    fetchData: () => Promise<T[]>,
) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error>();
    const [controller, setController] = useState<AbortController>();
    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        setController(abortController);
        setLoading(true);

        fetchData()
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                if(error.name === "AbortError")
                    console.log("Request cancelled");
                else
                    setError(error);
            })
            .finally(() => setLoading(false));

        return () => abortController.abort();
    }, [refetch]);

    const handleCancelRequest = () => {
        if (controller) {
            controller.abort();
            setError(new Error("Request cancelled"));
        }
    }

    const refetchData = () => setRefetch(true);

    return {
        data,
        loading,
        error,
        handleCancelRequest,
        refetchData,
    };
}