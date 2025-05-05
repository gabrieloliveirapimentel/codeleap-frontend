import { Modal } from "./modal";
import { useState } from "react";
import { dateToNow } from "../lib/utils";
import { Post } from "../store/types";

import {
  PiTrashBold,
  PiNotePencilBold,
  PiChatCircleTextBold,
  PiHeartBold,
  PiHeartFill,
} from "react-icons/pi";
import {
  addComment,
  deleteComment,
  getComments,
  getLikes,
  toggleLike,
} from "../api/local-storage";

interface CardProps {
  post: Post;
  user: string;
  hasPermission: boolean;
}

export function Card({ post, user, hasPermission }: CardProps) {
  const [likes, setLikes] = useState(getLikes(post.id));
  const userHasLiked = likes.users.includes(user);

  const [comments, setComments] = useState(getComments(post.id));
  const [commentsIsOpen, setCommentsIsOpen] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  function handleLikePost() {
    const updatedLikes = toggleLike(post.id, user);

    setLikes(updatedLikes);
  }

  function handleCommentPost(text: string) {
    addComment(post.id, { username: user, text });
    setComments([...comments, { username: user, text }]);
  }

  function handleDeleteComment(
    postId: number,
    comment: { username: string; text: string }
  ) {
    deleteComment(postId, comment);
    setComments((prevComments) =>
      prevComments.filter(
        (c) => c.username !== comment.username || c.text !== comment.text
      )
    );
  }

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
        <div className="flex justify-between items-center px-8 pb-4">
          <div className="flex justify-between items-center gap-3">
            <PiChatCircleTextBold
              size={26}
              color="#7695EC"
              className="hover:cursor-pointer"
              onClick={() => setCommentsIsOpen(!commentsIsOpen)}
            />
            <span className="text-[18px] text-[#777777]">
              {" "}
              {comments.length} comments
            </span>
          </div>
          <div className="flex justify-between items-center gap-3">
            {!userHasLiked ? (
              <PiHeartBold
                size={26}
                color="#7695EC"
                onClick={() => {
                  handleLikePost();
                }}
                className="hover:cursor-pointer"
              />
            ) : (
              <PiHeartFill
                size={26}
                onClick={() => {
                  handleLikePost();
                }}
                className="text-red-400 hover:cursor-pointer"
              />
            )}
            <span className="text-[18px] text-[#777777]">
              {likes.count} likes
            </span>
          </div>
        </div>

        {commentsIsOpen && (
          <div>
            <div className="flex flex-col gap-4 px-8 py-4">
              {comments.map((comment, index) => (
                <div key={index} className="flex flex-row justify-between">
                  <div className="flex flex-row items-center gap-2">
                    <span className="font-bold text-[18px] text-[#777777]">
                      {comment.username}
                    </span>
                    <p className="text-[18px]">{comment.text}</p>
                  </div>
                  {user === comment.username && (
                    <PiTrashBold
                      size={16}
                      onClick={() => handleDeleteComment(post.id, comment)}
                      className="text-red-400 hover:cursor-pointer"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="px-8 pb-4">
              <input
                type="text"
                placeholder="Add a comment..."
                className="border border-[#999999] rounded-lg p-2 w-full"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCommentPost((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = "";
                  }
                }}
              />
            </div>
          </div>
        )}
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
