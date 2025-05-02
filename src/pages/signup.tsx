import { SignUpForm } from "../components/form/signup-form";

export function SignUp() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-2xl min-w-[500px] border-1 border-[#CCCCCC]">
        <h1 className="text-black font-bold text-xl">
          Welcome to CodeLeap network!
        </h1>
        <SignUpForm />
      </div>
    </div>
  );
}
