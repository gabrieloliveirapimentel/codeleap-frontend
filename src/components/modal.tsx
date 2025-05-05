import { Post } from "../store/types";
import { PiXBold } from "react-icons/pi";
import { EditPostForm } from "./form/form-edit-post";
import { DeletePostForm } from "./form/form-delete-post";

import { useAppDispatch } from "../store/hooks";
import { deletePost } from "../store/postsSlice";
import toast from "react-hot-toast";

interface ModalProps {
  post?: Post;
  id: number;
  title: string;
  onDelete: boolean;
  onClose: (prev: boolean) => void;
}

export function Modal({ post, id, title, onDelete, onClose }: ModalProps) {
  const dispatch = useAppDispatch();
  const initialValues = {
    title: post?.title || "",
    content: post?.content || "",
  };

  async function handleDelete() {
    if (onDelete) {
      try {
        await dispatch(deletePost(id));
        onClose(false);

        toast.success("Post deleted successfully");
      } catch {
        toast.error("Failed to delete post");
      }
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="absolute inset-0 bg-[#DDDDDD] opacity-80"></div>
      <div className="relative bg-white p-6 rounded-2xl shadow-md w-full max-w-[600px] border-[1px] border-[#CCCCCC]">
        <div className="flex justify-between items-center mb-4 ">
          <h1>{title}</h1>
          <button
            className=" hover:text-[#7695EC] cursor-pointer"
            onClick={(prev) => {
              onClose(!prev);
            }}
          >
            <PiXBold size={16} />
          </button>
        </div>
        {onDelete ? (
          <DeletePostForm onClose={onClose} onDelete={handleDelete} />
        ) : (
          <EditPostForm
            id={id}
            onClose={onClose}
            initialValues={initialValues}
          />
        )}
      </div>
    </div>
  );
}
