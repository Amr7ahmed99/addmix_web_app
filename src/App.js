import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Welcome from './components/welcome/Welcome';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/general/navbar/Navbar';
import AuthLayout from './layout/AuthLayout';
import LoginComponent from './components/auth/login/LoginComponent';
import RegisterComponent from './components/auth/register/RegisterComponent';
import VerifyCode from './components/auth/verify-code/VerifyCode';
import ForgetPassword from './components/auth/forget-password/ForgetPassword';
import AuthCallback from './components/auth/google-auth-callback/GoogleAuthCallback';

function App() {

  const authContext= useAuth();

  const AuthenticatedRoute= ({children})=>{
    return authContext.token? children: <Navigate to={'/'} />
  }

  const PreventAuth= ({children})=>{
    return authContext.token? <Navigate to={'/welcome'}/>: children;
  }

  const VerificationRequierd= ({children})=>{
    return authContext.userIsNotActive? children: <Navigate to={'/'}/>;

  }

  return (
    <div className="App">
        <BrowserRouter>
          {authContext?.token && <Navbar/>}
          <Routes>
            <Route path="/auth/callback" element={<AuthCallback />} />

            <Route path='*' element= {
              <AuthenticatedRoute>
                <Welcome />
              </AuthenticatedRoute>
            }/>
            
            <Route element={<AuthLayout/>} >
              <Route path='/' element= {
                <PreventAuth>
                  <LoginComponent/>
                </PreventAuth>
                }/>

              <Route path='/login' element= {
                <PreventAuth>
                  <LoginComponent/>
                </PreventAuth>
                }/>

              <Route path='/register' element= {
                <PreventAuth>
                  <RegisterComponent/>
                </PreventAuth>
              }/>

              <Route path='/forget-password' element= {
                <PreventAuth>
                  <ForgetPassword/>
                </PreventAuth>
              }/>

              <Route path='/verify' element= {
                <VerificationRequierd>
                  <PreventAuth>
                    <VerifyCode/>
                  </PreventAuth>
                </VerificationRequierd>
              }/>

            </Route>
            <Route path='/welcome' element= {
              <AuthenticatedRoute>
                <Welcome/>
              </AuthenticatedRoute>
            }/>
          </Routes>
        </BrowserRouter>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

    </div>
  );
}

export default App;
