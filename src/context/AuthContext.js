import { createContext, useContext, useEffect, useState } from "react";
import { executeJwtAuthLogin, executeRegisteration, executeJwtAuthRegister, executeSubmitEmailForCreateNewPasswordVerification, executeSubmitNewPassword } from "../services/AuthenticationApiService";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";

// 1- create context
const AuthContext= createContext();
export const useAuth= ()=> useContext(AuthContext);

// 2- share the data between different components
export default function AuthProvider({children}){
    const [token, setToken]= useState(null);
    const [username, setUsername]= useState(null);
    const [userIsNotActive, setUserIsNotActive]= useState(false);

    const storeJWT= (token, user)=>{
        const jwtToken= `Bearer ${token}`;
        // Set the Authorization header for all requests
        // addKeyToInterceptorConfigHeaders("Authorization", jwtToken);
        setToken(jwtToken);
        setUsername(`${user?.firstName} ${user?.lastName}`);
        // Store JWT token in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    const login= async (email, password, setFieldError, setSubmitting)=>{
        try{
            const response= await executeJwtAuthLogin(email, password);
            const data= response.data;
            if(response.status === HttpStatusCode.Ok){
                if(!data?.user?.active){
                    setUserIsNotActive(true);
                    return data?.user;
                }
                storeJWT(data?.token, data?.user);
                setUserIsNotActive(false);
                return data?.user;
            }
        } catch(err){
            const errMsg= err?.response?.data?.message;
            if(errMsg){
                toast.error(errMsg);
                // Handle authentication errors
                setFieldError('email', 'check your email');
                setFieldError('password', 'check your password');
            }else{
                toast.error("something went wrong, try again");
            }
            setSubmitting(false)
        }
        setUserIsNotActive(false);
        logout();
        return null;
    }

    const verifyCodeForEmail= async (formUserData, setFieldError, setSubmitting)=>{
        try{
            const response= await executeJwtAuthRegister({
                email: formUserData.email,
                verificationCode: formUserData.otp
            });
            const data= response.data;
            if(response.status === HttpStatusCode.Ok){
                if(!formUserData.verifiyForResetPassword){
                    /*when we store the token in localStorage, it will navigate you directly 
                    * to the home page so you don't need to navigate manually
                    */ 
                    storeJWT(data?.token, data?.user); 
                    setUserIsNotActive(false);
                    toast.success(`Welcome to addmix store ${data.user.firstName} ${data.user?.lastName}`);
                }
                return true;
            }
        }catch(err){
            const errMsg= err?.response?.data;
            if(errMsg){
                // Handle authentication errors
                if (errMsg.includes('Invalid')) {
                    setFieldError('otp', errMsg);
                }
                toast.error(errMsg);
            }else{
                toast.error('verification failed, please try again letter');
            }
            setSubmitting(false)
        }
    }

    const register= async (formUserData, setSubmitting)=>{
        try{
            const response= await executeRegisteration({
                email: formUserData.email,
                password: formUserData.password,
                confirmPassword: formUserData.confirmPassword,
                firstName: formUserData.firstName,
                lastName: formUserData.lastName,
                mobileNumber: formUserData.phone
            });
            if(response.status === HttpStatusCode.Ok){
                const data= response.data;
                setUserIsNotActive(true);
                toast.success(data?.message)
                return data?.user;
            }
        }catch(err){
            const errMsg= err?.response?.data?.message;
            if(errMsg){
                toast.error(errMsg);
            }else{
                toast.error("something went wrong, try again");
            }
            setSubmitting(false)
        }

        return null
    }

    const logout= ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUsername(null);
    }

    const submitEmailForCreateNewPasswordVerification= async (email, setSubmitting)=>{
        try{
            const response= await executeSubmitEmailForCreateNewPasswordVerification(email);
            if(response.status === HttpStatusCode.Ok){
                setUserIsNotActive(false);
                toast.success(response?.data?.message)
                return true;
            }
        }catch(err){
            const errMsg= err?.response?.data?.message;
            if(errMsg){
                toast.error(errMsg);
            }else{
                toast.error("something went wrong, try again");
            }
            setSubmitting(false)
        }
        return false;
    }

    const submitNewPassword= async (values, setSubmitting)=>{
        try{
            const response= await executeSubmitNewPassword(values);
            if(response.status === HttpStatusCode.Ok){
                const data= response.data;
                /*when we store the token in localStorage, it will navigate you directly 
                * to the home page so you don't need to navigate manually
                */ 
                storeJWT(data?.token, data?.user); 
                setUserIsNotActive(false);
                return true;
            }
        }catch(err){
            const errMsg= err?.response?.data?.message;
            if(errMsg){
                toast.error(errMsg);
            }else{
                toast.error("something went wrong, try again");
            }
            setSubmitting(false)
        }
        return false;
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    // 3- put some states in the context
    return (
        <AuthContext.Provider value={{token, login, logout, register, verifyCodeForEmail, storeJWT, username, userIsNotActive, submitEmailForCreateNewPasswordVerification, submitNewPassword}}>
            {children}
        </AuthContext.Provider>
    );
}