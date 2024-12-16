import { useState } from "react";

export function useFetch<Type>(func: () => Promise<Type[]>) {
    const [data, setData] = useState<Type[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        if(data.length > 0) return;
        try {
            setLoading(true);
            setError(null);
            const result = await func();
            setData(result);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err);
            } else {
                setError(new Error('An unexpected error occurred'));
            }
        } finally {
            setLoading(false);
            console.log("data fetched!");
        }
    };

    return {
        data,
        loading,
        error,
        fetchData
    };
}