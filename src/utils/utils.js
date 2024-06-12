import axios from "axios";
import { useSearchParams } from "react-router-dom";

export const useQueryString = () => {
    const [searchParams] = useSearchParams();
    const searchParamsObject = Object.fromEntries([...searchParams]);
    return searchParamsObject;
};

export function isAxiosError(error) {
    return axios.isAxiosError(error);
}
