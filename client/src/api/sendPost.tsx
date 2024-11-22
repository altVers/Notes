import { validateResponse } from "./validateResponse"

export const sendPost = (title: string, text: string): Promise<void> => {
    return fetch("/api/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, text }),
    }).then(validateResponse).then(() => undefined)
}