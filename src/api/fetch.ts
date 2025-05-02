import { api } from "../lib/axios";

export async function getAllPosts() {
    const data = await api.get('/careers/?format=json')

    return data;
}