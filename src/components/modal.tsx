import { PiXBold } from "react-icons/pi";
import { PostForm } from "./form/post-form";
import { Post } from "../pages/main";
import { deletePost } from "../api/fetch";

interface ModalProps {
  post?: Post;
  id?: number;
  title: string;
  onDelete: boolean;
  close: (prev: boolean) => void;
}

export function Modal({ post, id, title, onDelete, close }: ModalProps) {
  const values = {
    title: post?.title || "",
    content: post?.content || "",
  };

  async function handleDelete() {
    if (onDelete && id) {
      await deletePost(id);
      close(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="absolute inset-0 bg-[#DDDDDD] opacity-80"></div>
      <div className="relative bg-white p-6 rounded-lg shadow-md w-full max-w-[600px]">
        <div className="flex justify-between items-center mb-4 ">
          <h1>{title}</h1>
          <button
            className=" hover:text-[#7695EC] cursor-pointer"
            onClick={(prev) => {
              close(!prev);
            }}
          >
            <PiXBold size={16} />
          </button>
        </div>
        {onDelete ? (
          <div className="flex justify-end gap-3">
            <button
              onClick={(prev) => {
                close(!prev);
              }}
              className="mt-2 text-black cursor-pointer border-[1px] border-black"
            >
              Cancel
            </button>

            <button
              className="mt-2 text-white cursor-pointer  bg-red-400 hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        ) : (
          <PostForm
            mode="edit"
            onClose={close}
            id={id}
            initialValues={values}
          />
        )}
      </div>
    </div>
  );
}
