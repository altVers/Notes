import "./RegisterForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { registerUser } from "../../api/registerUser";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../main";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const RegisterUserSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Поле обязательное к заполнению" })
    .email(),
  password: z
    .string()
    .min(8, { message: "Пароль должен содержать минимум 8 символов" }),
  username: z
    .string()
    .min(5, {
      message: "Имя пользователя должно содержать минимум 5 символов",
    }),
});

type RegisterUser = z.infer<typeof RegisterUserSchema>;

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUser>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const registerMutation = useMutation(
    {
      mutationFn: (data: RegisterUser) =>
        registerUser(data.email, data.password, data.username),
        onSuccess() {
          queryClient.invalidateQueries({queryKey: ["users", "me"]})
        }
    },
    queryClient
  );

  const onSubmit = (data: RegisterUser) => {
    registerMutation.mutate(data);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Имя" errorMessage={errors.username?.message}>
        <input type="text" {...register("username")} />
      </FormField>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input type="text" {...register("email")} />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input type="password" {...register("password")} />
      </FormField>

      {registerMutation.error && <span>{registerMutation.error.message}</span>}
      <Button isLoading={registerMutation.isPending}>Зарегистрироваться</Button>
    </form>
  );
};
