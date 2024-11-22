import { validateResponse } from "./validateResponse";

export function registerUser(
  email: string,
  password: string,
  username: string
): Promise<void> {
  return fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  })
    .then(validateResponse)
    .then(() => undefined);
}
