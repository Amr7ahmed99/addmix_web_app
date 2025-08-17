import { apiClient } from "../api/ApiClient";

export const executeJwtAuthLogin = (emailOrMobile, password) =>
    apiClient.post('/api/auth/login', {emailOrMobile, password});

export const executeRegisteration = (newUserData) =>
    apiClient.post('/api/auth/register', newUserData);
     
export const executeJwtAuthRegister = (newUserData) =>
    apiClient.post('/api/auth/register/verify', newUserData);

export const executeResendVerificationCode= (emailOrMobile) =>
    apiClient.get(`/api/auth/register/verify/resend?identifier=${emailOrMobile}`);

export const executeSubmitEmailForCreateNewPasswordVerification= (emailOrMobile)=>
    apiClient.get(`/api/auth/forget-password/verify?identifier=${emailOrMobile}`)

export const executeSubmitNewPassword= (newPasswordData)=>
    apiClient.post(`/api/auth/forget-password/reset`, newPasswordData)