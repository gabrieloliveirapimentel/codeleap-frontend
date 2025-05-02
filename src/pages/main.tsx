import { useContext } from "react";
import { Card } from "../components/card";

import { useLocation } from "react-router";
import { CreatePostForm } from "../components/form/form-create-post";
import { PostsContext } from "../contexts/types";

export function Main() {
  const location = useLocation();
  const username: string = location.state.username;
  const { posts } = useContext(PostsContext);

  return (
    <div className="grid items-center justify-center">
      <div className="justify-center bg-white  min-h-screen">
        <header className="bg-[#7695EC] p-8">
          {" "}
          <h1 className="text-white">CodeLeap Network</h1>
        </header>
        <div className="grid p-8 gap-8">
          <div className="p-8 rounded-2xl border-[1px] border-[#999999]">
            <h1 className="text-black font-bold text-xl">
              What's on your mind?
            </h1>
            {username && <CreatePostForm user={username} />}
          </div>
          {posts.length > 0 ? (
            <div className="grid gap-8 max-w-[800px]">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  post={post}
                  hasPermission={post.username === username}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-w-[800px]">
              <span>No posts found</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
