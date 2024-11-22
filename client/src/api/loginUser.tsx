import { validateResponse } from "./validateResponse";

export function loginUser(email: string, password: string): Promise<void> {
  return fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(validateResponse)
    .then(() => undefined);
}
