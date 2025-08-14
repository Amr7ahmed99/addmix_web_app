import { apiClient } from "../api/ApiClient";

export const executeJwtAuthLogin = (email, password) =>
    apiClient.post('/api/auth/login', {email, password});

export const executeRegisteration = (newUserData) =>
    apiClient.post('/api/auth/register', newUserData);
     
export const executeJwtAuthRegister = (newUserData) =>
    apiClient.post('/api/auth/register/verify', newUserData);

export const executeResendVerificationCode= (email) =>
    apiClient.get(`/api/auth/register/verify/resend?email=${email}`);

export const executeSubmitEmailForCreateNewPasswordVerification= (email)=>
    apiClient.get(`/api/auth/forget-password/verify?email=${email}`)

export const executeSubmitNewPassword= (newPasswordData)=>
    apiClient.post(`/api/auth/forget-password/reset`, newPasswordData)