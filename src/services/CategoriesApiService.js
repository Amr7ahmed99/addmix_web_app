import { apiClient } from "../api/ApiClient";

export const loadAllCollections= ()=>
    apiClient.get("/api/collections")