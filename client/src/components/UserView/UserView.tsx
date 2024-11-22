import { FC } from "react";
import "./UserView.css";

export interface UserViewProps {
  username: string
}

export const UserView: FC<UserViewProps> = ({username}) => {

  return (
    <div className="user-view">
      <div className="user-view__logo">
        {username.slice(0, 1).toUpperCase()}
      </div>
      <span className="user-view__name">{username}</span>
    </div>
  );
};
