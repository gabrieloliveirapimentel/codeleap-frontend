import { useCallback, useEffect, useState } from "react";
import {
  handleGetAllPosts,
  handleCreatePost,
  handleUpdatePost,
  handleDeletePost,
} from "../api/fetch";
import { IPostsProviderProps, Post, PostFormData, PostsContext } from "./types";

export function PostsProvider({ children }: IPostsProviderProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await handleGetAllPosts();
      setPosts(response.data.results);

      console.log(response);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, []);

  const createPost = useCallback(
    async (user: string, data: PostFormData) => {
      try {
        const response = await handleCreatePost({
          username: user,
          title: data.title,
          content: data.content,
        });

        setPosts((prevPosts) => [...prevPosts, response.data]);
        await fetchPosts();
      } catch (error) {
        console.error("Error creating post:", error);
      }
    },
    [fetchPosts]
  );

  const updatePost = useCallback(
    async (id: number, data: PostFormData) => {
      try {
        await handleUpdatePost(id, {
          title: data.title,
          content: data.content,
        });

        await fetchPosts();
      } catch (error) {
        console.error("Error updating post:", error);
      }
    },
    [fetchPosts]
  );

  const deletePost = useCallback(async (id: number) => {
    try {
      await handleDeletePost(id);

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <PostsContext.Provider
      value={{ posts, fetchPosts, createPost, updatePost, deletePost }}
    >
      {children}
    </PostsContext.Provider>
  );
}
