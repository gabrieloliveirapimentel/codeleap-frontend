import { Modal } from "./modal";
import { useState } from "react";
import { dateToNow } from "../lib/utils";
import { Post } from "../store/types";

import { PiTrashBold, PiNotePencilBold } from "react-icons/pi";

interface CardProps {
  post: Post;
  hasPermission: boolean;
}

export function Card({ post, hasPermission }: CardProps) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <div className="rounded-2xl border-[1px] border-[#999999]">
        <div className="flex flex-row items-center px-8 py-6 bg-[#7695EC] rounded-tl-xl rounded-tr-xl justify-between">
          <h1 className="text-white">{post.title}</h1>
          {hasPermission && (
            <div className="flex flex-row gap-4">
              <PiTrashBold
                size={26}
                color="white"
                onClick={() => setOpenDeleteModal(true)}
                className="hover:cursor-pointer"
              />
              <PiNotePencilBold
                size={26}
                color="white"
                onClick={() => setOpenEditModal(true)}
                className="hover:cursor-pointer"
              />
            </div>
          )}
        </div>
        <div className="px-8 py-6 grid">
          <div className="flex max-sm:flex-col justify-between py-3">
            <span className="font-bold text-[18px] text-[#777777]">
              {post.username}
            </span>
            <span className="text-[18px] text-[#777777]">
              {dateToNow(post.created_datetime)}
            </span>
          </div>
          <p className="text-[18px] mt-2">{post.content}</p>
        </div>
      </div>
      {openEditModal && (
        <Modal
          title="Edit item"
          id={post.id}
          post={post}
          onDelete={false}
          onClose={() => setOpenEditModal(false)}
        />
      )}
      {openDeleteModal && (
        <Modal
          title="Are you sure you want to delete this item?"
          id={post.id}
          onDelete={true}
          onClose={() => setOpenDeleteModal(false)}
        />
      )}
    </>
  );
}
