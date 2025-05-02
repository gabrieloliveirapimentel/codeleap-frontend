import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { PostsContext } from "../../contexts/types";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
});

export type FormData = yup.InferType<typeof schema>;

interface CreatePostProps {
  user: string;
}

export function CreatePostForm({ user }: CreatePostProps) {
  const { createPost } = useContext(PostsContext);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  async function onSubmit(data: FormData) {
    createPost(user, data);
    reset();
  }

  return (
    <form
      className="mt-5 flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div>
        <div className="grid gap-2 mb-2">
          <label>Title</label>
          <input
            id="title"
            type="text"
            placeholder="Title here"
            className={`border ${
              errors.title ? "border-red-500" : "border-[#777777]"
            }`}
            {...register("title")}
          />
        </div>
        {errors.title && (
          <span className="text-sm text-red-500">{errors.title.message}</span>
        )}
      </div>
      <div>
        <div className="grid gap-2 mb-2">
          <label>Content</label>
          <textarea
            rows={5}
            id="content"
            placeholder="Content here"
            className={`border ${
              errors.content ? "border-red-500" : "border-[#777777]"
            }`}
            {...register("content")}
          />
        </div>
        {errors.content && (
          <span className="text-sm text-red-500">{errors.content.message}</span>
        )}
      </div>
      <div className="flex justify-end">
        <button
          className="mt-2 text-white cursor-pointer bg-[#7695EC] hover:bg-[#637bbd]"
          type="submit"
        >
          {isSubmitting ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
}
