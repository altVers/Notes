import { FormField } from "../FormField";
import { Button } from "../Button";
import "./NoteForm.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { sendPost } from "../../api/sendPost";
import { queryClient } from "../../main";

const SendPostSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Заголовок должен содержать миниум 5 символов" }),
  text: z
    .string()
    .min(10, { message: "Текст поста должен содержать миниум 10 символов" })
    .max(300, {
      message: "Текст поста должен содержать максимум 300 символов",
    }),
});

type TSendPost = z.infer<typeof SendPostSchema>;

export const NoteForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSendPost>({
    resolver: zodResolver(SendPostSchema),
  });

  const postMutation = useMutation(
    {
      mutationFn: (data: TSendPost) => sendPost(data.title, data.text),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
    },
    queryClient
  );

  const onSubmit = (data: TSendPost) => {
    postMutation.mutate(data);
  };

  return (
    <form className="note-form" onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Заголовок" errorMessage={errors.title?.message}>
        <input type="text" {...register("title")} />
      </FormField>
      <FormField label="Текст" errorMessage={errors.text?.message}>
        <textarea {...register("text")} />
      </FormField>
      <Button isLoading={postMutation.isPending}>Сохранить</Button>
    </form>
  );
};
