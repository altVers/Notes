import { FC } from "react";
import { Post } from "../../types/Post";
import "./NoteView.css";

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export interface PostViewProps {
  post: Post
}

export const NoteView: FC<PostViewProps> = ({ post }) => {
  return (
    <div className="note-view">
      <div className="note-view__head">
        <p className="note-view__datetime">{formatDate(post.createdAt)}</p>
        <p className="note-view__title">{post.title}</p>
      </div>

      <p className="note-view__text">
        {post.text}
      </p>
    </div>
  );
};
