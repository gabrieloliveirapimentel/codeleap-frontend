import axios from "axios";

export const api = axios.create({
    baseURL: 'https://dev.codeleap.co.uk/',
    headers: {
        'Content-Type': 'application/json',
    }
})
