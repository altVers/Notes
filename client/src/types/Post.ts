import { z } from "zod";

export const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
  userId: z.string(),
  createdAt: z.number(),
});

export const PostsSchema = z.array(PostSchema);

export type Post = z.infer<typeof PostSchema>;
export type Posts = z.infer<typeof PostsSchema>;

export const FetchPostListSchema = z.object({
  list: PostsSchema,
});

export type PostListResponse = z.infer<typeof FetchPostListSchema>