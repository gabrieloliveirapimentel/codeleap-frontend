import { createContext, ReactNode } from "react";

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

export interface ITransactionContextType {
    posts: Post[];
    fetchPosts: () => Promise<void>;
    updatePost: (id: number, data: PostFormData) => Promise<void>;
    createPost: (user: string, data: PostFormData) => Promise<void>;
    deletePost: (id: number) => Promise<void>;
}

export interface IPostsProviderProps {
    children: ReactNode;
}

export const PostsContext = createContext({} as ITransactionContextType)