import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
});

type FormData = yup.InferType<typeof schema>;

export function CreatePostForm() {
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
    console.log(data);

    reset();
  }

  return (
    <div className="p-8 rounded-2xl border-[1px] border-[#999999]">
      <h1 className="text-black font-bold text-xl">What's on your mind?</h1>
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
            <span className="text-sm text-red-500">
              {errors.content.message}
            </span>
          )}
        </div>
        <div className="flex  justify-end">
          <button
            className="bg-[#7695EC] mt-2 text-white hover:bg-[#637bbd] cursor-pointer"
            type="submit"
          >
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
