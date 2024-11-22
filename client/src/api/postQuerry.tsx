import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "./fetchPosts";

export const usePostQuerry = (url: string, queryKey: string[]) => {
    const postQuerry = useQuery({
        queryFn: () => fetchPosts(url),
        queryKey: queryKey,
        retry: false,
    });
    return postQuerry
}