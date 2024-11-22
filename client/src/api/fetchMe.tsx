import { User, UserSchema } from "../types/User";
import { validateResponse } from "./validateResponse";

export function fetchMe(): Promise<User> {
    return fetch("/api/users/me").then(validateResponse).then((response) => response.json().then((data) => UserSchema.parse(data)))
}