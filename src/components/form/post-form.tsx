import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPost, editPost } from "../../api/fetch";
import { useEffect } from "react";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
});

export type FormData = yup.InferType<typeof schema>;

interface CreatePostProps {
  id?: number;
  user?: string;
  mode: "edit" | "create";
  initialValues?: FormData;
  onClose?: (state: boolean) => void;
}

export function PostForm({
  id,
  user,
  initialValues,
  mode,
  onClose,
}: CreatePostProps) {
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
    if (mode === "create") {
      await createPost({
        username: user,
        title: data.title,
        content: data.content,
      });
    } else if (mode === "edit" && id) {
      await editPost(id, {
        title: data.title,
        content: data.content,
      });
    }

    console.log(data);
    reset();
  }

  useEffect(() => {
    if (mode === "edit" && initialValues) reset(initialValues);
  }, [initialValues, mode, reset]);

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
      <div className="flex justify-end gap-3">
        {mode === "edit" && onClose && (
          <button
            onClick={() => onClose(false)}
            className="mt-2 text-black cursor-pointer border-[1px] border-black"
          >
            Cancel
          </button>
        )}
        <button
          className={`mt-2 text-white cursor-pointer ${
            mode === "create"
              ? "bg-[#7695EC] hover:bg-[#637bbd]"
              : " bg-green-500 hover:bg-green-700"
          } `}
          type="submit"
        >
          {mode === "create"
            ? isSubmitting
              ? "Creating..."
              : "Create"
            : isSubmitting
            ? "Saving..."
            : "Save"}
        </button>
      </div>
    </form>
  );
}
