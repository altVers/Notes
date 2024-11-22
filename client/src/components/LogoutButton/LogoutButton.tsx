import { logoutUser } from "../../api/logoutUser";
import { queryClient } from "../../main";
import { Button } from "../Button";
import "./LogoutButton.css";

function logout() {
  logoutUser().then(() => {
    queryClient.invalidateQueries({queryKey: ["users", "me"]})  
  })
}

export const LogoutButton = () => {
  return (
    <div className="logout-button">
      <Button kind="secondary" onClick={() => logout()}>Выйти</Button>
    </div>
  );
};
