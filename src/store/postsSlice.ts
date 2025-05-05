import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  handleGetAllPosts,
  handleCreatePost,
  handleUpdatePost,
  handleDeletePost,
} from '../api/fetch';
import { Post, PostFormData, PostState } from './types';



const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchAll', async () => {
  const response = await handleGetAllPosts();
  return response.data.results;
});

export const createPost = createAsyncThunk(
  'posts/create',
  async ({ username, data }: { username: string; data: PostFormData }) => {
    const response = await handleCreatePost({
      username,
      title: data.title,
      content: data.content,
    });
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  'posts/update',
  async ({ id, data }: { id: number; data: PostFormData }) => {
    await handleUpdatePost(id, data);
    return { id, data };
  }
);

export const deletePost = createAsyncThunk('posts/delete', async (id: number) => {
  await handleDeletePost(id);
  return id;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch posts';
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = { ...state.posts[index], ...action.payload.data };
        }
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.posts = state.posts.filter((p) => p.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
