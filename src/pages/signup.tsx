import { SignUpForm } from "../components/form/form-signup";

export function SignUp() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-2xl border-1 border-[#CCCCCC] min-sm:min-w-[500px] max-sm:mx-4">
        <h1 className="text-black font-bold text-xl">
          Welcome to CodeLeap network!
        </h1>
        <SignUpForm />
      </div>
    </div>
  );
}
