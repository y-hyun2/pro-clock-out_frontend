import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");

/** CREATE CUSTOM AXIOS INSTANCE */
export const AuthAPI = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
    },
});
/** LOGIN API */
export const login = async ({ email, password }) => {
    const data = { email, password };
    const response = await AuthAPI.post(`/login`, data);
    return response.data;
}
/** SIGNUP API */
export const signUp = async ({ email, password }) => {
    const data = { email, password };
    const response = await AuthAPI.post(`/api/v1/signup`, data);
    return response.data;
}