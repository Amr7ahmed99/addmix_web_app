// import { createContext, useContext, useEffect, useState } from "react";
// import { executeJwtAuthLogin, executeRegisteration, executeJwtAuthRegister, executeSubmitEmailForCreateNewPasswordVerification, executeSubmitNewPassword } from "../services/AuthenticationApiService";
// import { HttpStatusCode } from "axios";
// import { toast } from "react-toastify";
// import { fetchAllUsers, fetchUserById } from "../services/UsersApiService";
// import { loadAllCollections } from "../services/CategoriesApiService";

// // 1- create context
// const AuthContext= createContext();
// export const useAuth= ()=> useContext(AuthContext);

// // 2- share the data between different components
// export default function AuthProvider({children}){
//     const [token, setToken]= useState(null);
//     const [username, setUsername]= useState(null);
//     const [user, setUser]= useState(null);
//     const [requiresVerification, setRequiresVerification]= useState(false);
//     const [systemCollections, setSystemCollection]= useState([]);

//     const storeJWT= (token, user)=>{
//         const jwtToken= `Bearer ${token}`;
//         // Set the Authorization header for all requests
//         // addKeyToInterceptorConfigHeaders("Authorization", jwtToken);
//         setToken(jwtToken);
//         setUsername(`${user?.firstName} ${user?.lastName}`);
//         // Store JWT token in localStorage
//         localStorage.setItem('token', token);
//         localStorage.setItem('user', JSON.stringify(user));
//     }

//     const login= async (emailOrMobile, password, setFieldError, setSubmitting)=>{
//         try{
//             const response= await executeJwtAuthLogin(emailOrMobile, password);
//             const data= response.data;
//             if(response.status === HttpStatusCode.Ok){
//                 if(!data?.user?.active){
//                     setRequiresVerification(true);
//                     return data?.user;
//                 }
//                 storeJWT(data?.token, data?.user);
//                 setUser(data?.user);
//                 setRequiresVerification(false);
//                 return data?.user;
//             }
//         } catch(err){
//             const errMsg= err?.response?.data?.message;
//             if(errMsg){
//                 toast.error(errMsg);
//                 // Handle authentication errors
//                 setFieldError('email', 'check your email');
//                 setFieldError('password', 'check your password');
//             }else{
//                 toast.error("something went wrong, try again");
//             }
//             setSubmitting(false)
//         }
//         setRequiresVerification(false);
//         logout();
//         return null;
//     }

//     const verifyCodeForEmail= async (formUserData, setFieldError, setSubmitting)=>{
//         try{
//             const response= await executeJwtAuthRegister({
//                 emailOrMobile: formUserData.emailOrMobile,
//                 verificationCode: formUserData.otp
//             });
//             const data= response.data;
//             if(response.status === HttpStatusCode.Ok){
//                 if(!formUserData.verifiyForResetPassword){
//                     /*when we store the token in localStorage, it will navigate you directly 
//                     * to the home page so you don't need to navigate manually
//                     */ 
//                     storeJWT(data?.token, data?.user);
//                     setUser(data?.user);
//                     setRequiresVerification(false);
//                     toast.success(`Welcome to addmix store ${data.user.firstName} ${data.user?.lastName}`);
//                 }
//                 return true;
//             }
//         }catch(err){
//             const errMsg= err?.response?.data?.message;
//             if(errMsg){
//                 // Handle authentication errors
//                 if (errMsg.includes('Invalid')) {
//                     setFieldError('otp', errMsg);
//                 }
//                 toast.error(errMsg);
//             }else{
//                 toast.error('verification failed, please try again letter');
//             }
//             setSubmitting(false)
//         }
//     }

//     const register= async (formUserData, setSubmitting)=>{
//         try{
//             const response= await executeRegisteration({
//                 email: formUserData.email,
//                 password: formUserData.password,
//                 confirmPassword: formUserData.confirmPassword,
//                 firstName: formUserData.firstName,
//                 lastName: formUserData.lastName,
//                 mobileNumber: formUserData.phone
//             });
//             if(response.status === HttpStatusCode.Ok){
//                 setRequiresVerification(true);
//                 const data= response.data;
//                 toast.success(data?.message)
//                 return data?.user;
//             }
//         }catch(err){
//             const errMsg= err?.response?.data?.message;
//             if(errMsg){
//                 toast.error(errMsg);
//             }else{
//                 toast.error("something went wrong, try again");
//             }
//             setSubmitting(false)
//         }

//         return null
//     }

//     const logout= ()=>{
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         setToken(null);
//         setUsername(null);
//     }

//     const submitEmailForCreateNewPasswordVerification= async (emailOrMobile, setSubmitting)=>{
//         try{
//             const response= await executeSubmitEmailForCreateNewPasswordVerification(emailOrMobile);
//             if(response.status === HttpStatusCode.Ok){
//                 setRequiresVerification(false);
//                 toast.success(response?.data?.message)
//                 return true;
//             }
//         }catch(err){
//             const errMsg= err?.response?.data?.message;
//             if(errMsg){
//                 toast.error(errMsg);
//             }else{
//                 toast.error("something went wrong, try again");
//             }
//             setSubmitting(false)
//         }
//         return false;
//     }

//     const submitNewPassword= async (values, setSubmitting)=>{
//         try{
//             const response= await executeSubmitNewPassword(values);
//             if(response.status === HttpStatusCode.Ok){
//                 const data= response.data;
//                 /*when we store the token in localStorage, it will navigate you directly 
//                 * to the home page so you don't need to navigate manually
//                 */ 
//                 storeJWT(data?.token, data?.user);
//                 setUser(data?.user);
//                 setRequiresVerification(false);
//                 return true;
//             }
//         }catch(err){
//             const errMsg= err?.response?.data?.message;
//             if(errMsg){
//                 toast.error(errMsg);
//             }else{
//                 toast.error("something went wrong, try again");
//             }
//             setSubmitting(false)
//         }
//         return false;
//     }

//     const getUsers= async ()=>{
//         try{
//             const response= await fetchAllUsers();
//             if(response.status === HttpStatusCode.Ok){
//                 return response?.data?.users
//             }

//         }catch(err){
//            console.log(err);
//            logout();
//         }
//     }

//     const getUserById= async (id)=>{
//         // if the id is invalid or the user is already fetched, no need to fetch again
//         if (!id || user) return;

//         try{
//             const response= await fetchUserById(id);
//             if(response.status === HttpStatusCode.Ok){
//                 setUser(response?.data)
//                 setUsername(`${response?.data?.firstName} ${response?.data?.lastName}`);
//             }
//         }catch(err){
//            console.log(err);
//            logout();
//         }
//     }

//     const loadAllCollectionsForNavbar= async () => {
//         try{
//             const response= await loadAllCollections()
//             if(response.status === HttpStatusCode.Ok){
//                 setSystemCollection(response.data)
//             }
//         }catch(ex){
//             toast.error(ex)
//         }
        
//     }

//     useEffect(() => {
//         const storedToken = localStorage.getItem('token');
//         const storedUser = localStorage.getItem('user');
//         if (storedToken && storedUser) {
//             getUserById(JSON.parse(storedUser)?.id);
//             setToken(storedToken);
//         }
//     }, [setToken]);

//     useEffect(()=>{
//         if(systemCollections.length === 0){
//             loadAllCollectionsForNavbar();
//         }
//     }, [systemCollections])

//     // 3- put some states in the context
//     return (
//         <AuthContext.Provider value={{token, login, logout, register, verifyCodeForEmail, storeJWT, username, requiresVerification, submitEmailForCreateNewPasswordVerification, submitNewPassword, getUsers, user, systemCollections}}>
//             {children}
//         </AuthContext.Provider>
//     );
// }



import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { 
    executeJwtAuthLogin, 
    executeRegisteration, 
    executeJwtAuthRegister, 
    executeSubmitEmailForCreateNewPasswordVerification, 
    executeSubmitNewPassword 
} from "../services/AuthenticationApiService";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { fetchAllUsers, fetchUserById } from "../services/UsersApiService";
import { loadAllCollections } from "../services/CategoriesApiService";

// 1- create context
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// helper
const getErrorMessage = (err, fallback = "Something went wrong, try again") => {
    return err?.response?.data?.message || fallback;
};

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);
    const [user, setUser] = useState(null);
    const [requiresVerification, setRequiresVerification] = useState(false);
    const [systemCollections, setSystemCollection] = useState([]);

    const storeJWT = useCallback((token, user) => {
        const jwtToken = `Bearer ${token}`;
        setToken(jwtToken);
        setUsername(`${user?.firstName} ${user?.lastName}`);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    }, []);

    const clearStorage = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }, []);

    const logout = useCallback(() => {
        clearStorage();
        setToken(null);
        setUser(null);
        setUsername(null);
    }, [clearStorage]);

    const login = useCallback(async (emailOrMobile, password, setFieldError, setSubmitting) => {
        try {
            const response = await executeJwtAuthLogin(emailOrMobile, password);
            const data = response.data;

            if (response.status === HttpStatusCode.Ok) {
                if (!data?.user?.active) {
                    setRequiresVerification(true);
                    return data?.user;
                }
                storeJWT(data?.token, data?.user);
                setUser(data?.user);
                setRequiresVerification(false);
                return data?.user;
            }
        } catch (err) {
            const errMsg = getErrorMessage(err);
            toast.error(errMsg);
            setFieldError("email", "check your email");
            setFieldError("password", "check your password");
            setSubmitting(false);
        }
        setRequiresVerification(false);
        logout();
        return null;
    }, [logout, storeJWT]);

    const verifyCodeForEmail = useCallback(async (formUserData, setFieldError, setSubmitting) => {
        try {
            const response = await executeJwtAuthRegister({
                emailOrMobile: formUserData.emailOrMobile,
                verificationCode: formUserData.otp,
            });
            const data = response.data;

            if (response.status === HttpStatusCode.Ok) {
                if (!formUserData.verifiyForResetPassword) {
                    storeJWT(data?.token, data?.user);
                    setUser(data?.user);
                    setRequiresVerification(false);
                    toast.success(`Welcome ${data.user.firstName} ${data.user?.lastName}`);
                }
                return true;
            }
        } catch (err) {
            const errMsg = getErrorMessage(err, "Verification failed, please try again later");
            if (errMsg.includes("Invalid")) {
                setFieldError("otp", errMsg);
            }
            toast.error(errMsg);
            setSubmitting(false);
        }
    }, [storeJWT]);

    const register = useCallback(async (formUserData, setSubmitting) => {
        try {
            const response = await executeRegisteration({
                email: formUserData.email,
                password: formUserData.password,
                confirmPassword: formUserData.confirmPassword,
                firstName: formUserData.firstName,
                lastName: formUserData.lastName,
                mobileNumber: formUserData.phone,
            });
            if (response.status === HttpStatusCode.Ok) {
                setRequiresVerification(true);
                toast.success(response?.data?.message);
                return response?.data?.user;
            }
        } catch (err) {
            toast.error(getErrorMessage(err));
            setSubmitting(false);
        }
        return null;
    }, []);

    const submitEmailForCreateNewPasswordVerification = useCallback(async (emailOrMobile, setSubmitting) => {
        try {
            const response = await executeSubmitEmailForCreateNewPasswordVerification(emailOrMobile);
            if (response.status === HttpStatusCode.Ok) {
                setRequiresVerification(false);
                toast.success(response?.data?.message);
                return true;
            }
        } catch (err) {
            toast.error(getErrorMessage(err));
            setSubmitting(false);
        }
        return false;
    }, []);

    const submitNewPassword = useCallback(async (values, setSubmitting) => {
        try {
            const response = await executeSubmitNewPassword(values);
            if (response.status === HttpStatusCode.Ok) {
                const data = response.data;
                storeJWT(data?.token, data?.user);
                setUser(data?.user);
                setRequiresVerification(false);
                return true;
            }
        } catch (err) {
            toast.error(getErrorMessage(err));
            setSubmitting(false);
        }
        return false;
    }, [storeJWT]);

    const getUsers = useCallback(async () => {
        try {
            const response = await fetchAllUsers();
            if (response.status === HttpStatusCode.Ok) {
                return response?.data?.users;
            }
        } catch (err) {
            console.log(err);
            logout();
        }
    }, [logout]);

    const getUserById = useCallback(async (id, force = false) => {
        if (!id || (user && !force)) return;
        try {
            const response = await fetchUserById(id);
            if (response.status === HttpStatusCode.Ok) {
                setUser(response?.data);
                setUsername(`${response?.data?.firstName} ${response?.data?.lastName}`);
            }
        } catch (err) {
            console.log(err);
            logout();
        }
    }, [logout, user]);

    const loadAllCollectionsForNavbar = useCallback(async () => {
        try {
            const response = await loadAllCollections();
            if (response.status === HttpStatusCode.Ok) {
                setSystemCollection(response.data);
            }
        } catch (ex) {
            toast.error(ex);
        }
    }, []);

    // restore user session
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (storedToken && storedUser) {
            setToken(`Bearer ${storedToken}`);
            getUserById(JSON.parse(storedUser)?.id);
        }
    }, [getUserById]);

    // load collections once
    useEffect(() => {
        if (systemCollections.length === 0) {
            loadAllCollectionsForNavbar();
        }
    }, [systemCollections, loadAllCollectionsForNavbar]);

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
                register,
                verifyCodeForEmail,
                storeJWT,
                username,
                requiresVerification,
                submitEmailForCreateNewPasswordVerification,
                submitNewPassword,
                getUsers,
                user,
                systemCollections
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
