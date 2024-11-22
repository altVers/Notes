import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../../api/fetchMe";
import { Loader } from "../Loader";
import { AuthForm } from "../AuthForm";
import { UserPage } from "../UserPage/UserPage";

export const Account = () => {
   const meQuerry = useQuery({
    queryFn: () => fetchMe(),
    queryKey: ["users", "me"],
    retry: 1,
    retryDelay: 1000
  });

  switch (meQuerry.status) {
    case "pending":
      return <Loader />;
    case "error":
      return <AuthForm />;
    case "success":
      return <UserPage username={meQuerry.data.username} id={meQuerry.data.id}/>;
  }
};
