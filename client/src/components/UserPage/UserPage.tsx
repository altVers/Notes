import { FC } from "react";
import { UserView } from "../UserView";
import { NoteForm } from "../NoteForm";
import "./UserPage.css"
import { LogoutButton } from "../LogoutButton";
import { FetchPostListView } from "../NotesListView/FetchPostListView";

export interface UserPageProps {
    username: string
    id: string
}

export const UserPage: FC<UserPageProps> = ({username, id})=> {
    return <>
        <div className="user-page__wrapper">
            <div className="user-page__left-menu">
                <div className="user-page__user-menu">
                <UserView username={username}/>
                <LogoutButton />
                </div>
                <NoteForm />
            </div>
            <div className="user-page__posts-wrapper">
                <FetchPostListView id={id}/>
            </div>
        </div>
    </>
}