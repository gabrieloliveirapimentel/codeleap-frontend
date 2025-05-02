import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect } from "react";
import { PostsContext } from "../../contexts/types";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
});

export type FormData = yup.InferType<typeof schema>;

interface EditPostProps {
  id: number;
  initialValues: FormData;
  onClose: (state: boolean) => void;
}

export function EditPostForm({ id, initialValues, onClose }: EditPostProps) {
  const { updatePost } = useContext(PostsContext);

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
    updatePost(id, data);
    reset();

    onClose(false);
  }

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

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
        <button
          onClick={() => onClose(false)}
          className="mt-2 text-black cursor-pointer border-[1px] border-black"
        >
          Cancel
        </button>

        <button
          className="mt-2 text-white cursor-pointer bg-green-500 hover:bg-green-700"
          type="submit"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
