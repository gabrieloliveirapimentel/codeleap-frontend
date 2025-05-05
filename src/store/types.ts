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

export interface PostState {
    posts: Post[];
    loading: boolean;
    error: string | null;
  }