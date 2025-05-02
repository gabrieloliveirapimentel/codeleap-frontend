import { CreatePostForm } from "../components/form/create-post-form";

export function Main() {
  return (
    <div className="grid items-center justify-center">
      <div className="justify-center h-screen bg-white min-w-[800px] ">
        <header className="bg-[#7695EC] p-8">
          {" "}
          <h1 className="text-white">CodeLeap Network</h1>
        </header>
        <div className="grid p-8 gap-8">
          <CreatePostForm />
        </div>
      </div>
    </div>
  );
}
