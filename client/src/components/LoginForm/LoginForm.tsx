import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { loginUser } from "../../api/loginUser";
import { queryClient } from "../../main";
import { useMutation } from "@tanstack/react-query"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginUserSchema = z.object({
  email: z.string().min(5, { message: "Адрес почты должен содержать минимум 5 символов" }),
  password: z.string().min(8, { message: "Пароль должен содержать минимум 8 символов" })
})

type LoginUser = z.infer<typeof LoginUserSchema>

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginUser>({
    resolver: zodResolver(LoginUserSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (data: LoginUser) => loginUser(data.email, data.password),
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ["users", "me"]})
    }
  }, queryClient)

  const onSubmit = (data: LoginUser) => {
    loginMutation.mutate(data)
  }


  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input
          type="text"
          {...register("email")}
        />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input
          type="password"
          {...register("password")}
        />
      </FormField>

      {loginMutation.error && <span>{loginMutation.error.message}</span>}

      <Button isLoading={loginMutation.isPending}>Войти</Button>
    </form>
  );
};
