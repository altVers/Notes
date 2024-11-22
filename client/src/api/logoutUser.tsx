import { validateResponse } from "./validateResponse";

export function logoutUser(): Promise<void> {
  return fetch("/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(validateResponse)
    .then(() => undefined);
}
