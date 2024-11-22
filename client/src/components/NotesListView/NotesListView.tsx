import "./NotesListView.css";
import { NoteView } from "../NoteView";
import { FC } from "react";
import { Posts } from "../../types/Post";

export interface PostListViewProps {
  data: Posts
}

export const NotesListView: FC<PostListViewProps> = ({data}) => {
  return (
    <ul className="note-list-view">
      {data.map((post) => 
        <li key={post.id}>
          <NoteView post={post} />
        </li>
      )}
    </ul>
  );
};
