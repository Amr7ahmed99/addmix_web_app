import { apiClient } from "../api/ApiClient";


export const fetchAllUsers= ()=> 
    apiClient.get('/api/users/list',{})
export const fetchUserById= (id)=> 
    apiClient.get(`/api/users?id=${id}`)
