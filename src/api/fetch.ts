import { api } from "../lib/axios";

export async function getAllPosts() {
    const data = await api.get('/careers/?format=json')

    return data;
}

export async function editPost(id: number, body: object) {
    const data = await api.patch(`/careers/${id}/`, body)

    return data;
}

export async function deletePost(id: number) {
    const data = await api.delete(`/careers/${id}/`)

    return data;
}