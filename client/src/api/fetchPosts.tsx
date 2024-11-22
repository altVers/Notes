import { PostListResponse, FetchPostListSchema } from "../types/Post";
import { validateResponse } from "./validateResponse";

export function fetchPosts(url: string): Promise<PostListResponse> {
  return fetch(url)
    .then(validateResponse)
    .then((data) => data.json())
    .then((data) => FetchPostListSchema.parse(data));
}
