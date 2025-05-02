import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";

const schema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long"),
});

type FormData = yup.InferType<typeof schema>;

export function SignUpForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const navigate = useNavigate();

  async function onSubmit(data: FormData) {
    navigate("/main", {
      state: {
        username: data.username,
      },
    });
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
          <label>Please enter your username:</label>
          <input
            id="username"
            type="text"
            placeholder="John doe"
            className={`border ${
              errors.username ? "border-red-500" : "border-[#777777]"
            }`}
            {...register("username")}
          />
        </div>
        {errors.username && (
          <span className="text-sm text-red-500">
            {errors.username.message}
          </span>
        )}
      </div>
      <div className="flex  justify-end">
        <button
          className="bg-[#7695EC] mt-2 uppercase text-white hover:bg-[#637bbd] cursor-pointer"
          type="submit"
        >
          {isSubmitting ? "Loading..." : "Enter"}
        </button>
      </div>
    </form>
  );
}
