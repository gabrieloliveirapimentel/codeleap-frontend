import { api } from "../lib/axios";

async function handleGetAllPosts() {
    const data = await api.get('/careers/?format=json')

    return data;
}

async function handleCreatePost(body: object) {
    const data = await api.post('/careers/', body)

    return data;
}

async function handleUpdatePost(id: number, body: object) {
    const data = await api.patch(`/careers/${id}/`, body)

    return data;
}

async function handleDeletePost(id: number) {
    const data = await api.delete(`/careers/${id}/`)

    return data;
}

export {handleGetAllPosts, handleCreatePost, handleUpdatePost, handleDeletePost}