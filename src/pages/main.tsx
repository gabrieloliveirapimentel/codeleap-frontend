import { useEffect, useState } from "react";
import { Card } from "../components/card";
import { PostForm } from "../components/form/post-form";

import { getAllPosts } from "../api/fetch";
import { useLocation } from "react-router";

export interface Post {
  id: number;
  username: string;
  title: string;
  content: string;
  created_datetime: string;
  author_ip: string;
}

export interface PostFormData {
  title: string;
  content: string;
}

export function Main() {
  const location = useLocation();
  const username = location.state.username;
  const [posts, setPosts] = useState<Post[]>([]);

  //const date = new Date();
  //console.log(date.toISOString());

  useEffect(() => {
    async function fetchPosts() {
      const response = await getAllPosts();
      setPosts(response.data.results);
    }
    fetchPosts();
  }, []);

  return (
    <div className="grid items-center justify-center">
      <div className="justify-center bg-white max-w-[800px] ">
        <header className="bg-[#7695EC] p-8">
          {" "}
          <h1 className="text-white">CodeLeap Network</h1>
        </header>
        <div className="grid p-8 gap-8">
          <div className="p-8 rounded-2xl border-[1px] border-[#999999]">
            <h1 className="text-black font-bold text-xl">
              What's on your mind?
            </h1>
            <PostForm mode="create" user={username} />
          </div>
          {posts.map((post) => (
            <Card
              key={post.id}
              post={post}
              hasPermission={post.username === username}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
