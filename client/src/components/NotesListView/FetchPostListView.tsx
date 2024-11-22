import { Loader } from "../Loader";
import { NotesListView } from "./NotesListView";
import { FC } from "react";
import { Posts } from "../../types/Post";
import { usePostQuerry } from "../../api/postQuerry";

export interface FetchPostListViewProps {
  id: string;
}

export const FetchPostListView: FC<FetchPostListViewProps> = ({ id }) => {

  const postQuerry = usePostQuerry("/api/notes", ["posts"])

  function returnData() {
    let data: Posts = [];
    if (postQuerry.data !== null && postQuerry.data !== undefined) {
      data = postQuerry.data.list.filter((note) => note.userId === id);
    }
    return data;
  }

  switch (postQuerry.status) {
    case "pending":
      return <Loader />;
    case "error":
      return <h3>{postQuerry.error.message}</h3>;
    case "success":
      return <NotesListView data={returnData()} />;
  }
};
