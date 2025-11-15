import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Welcome from './components/welcome/Welcome';
import { ToastContainer } from 'react-toastify';
import AuthLayout from './layout/auth-layout/AuthLayout';
import LoginComponent from './components/auth/login/LoginComponent';
import RegisterComponent from './components/auth/register/RegisterComponent';
import VerifyCode from './components/auth/verify-code/VerifyCode';
import ForgetPassword from './components/auth/forget-password/ForgetPassword';
import AuthCallback from './components/auth/google-auth-callback/GoogleAuthCallback';
import Home from './pages/home/Home';
import ProductsCollectionList from './pages/products_collection_list/ProductsCollectionList';
import MainLayout from './layout/main-layout/MainLayout';
import ProductProfile from './pages/product_profile/ProductProfile';
import ScrollToTop from './components/general/ScrollToTop';
import PageLoader from './components/general/PageLoader/PageLoader';


function App() {
  const authContext = useAuth();

  const requireAuth = async () => {
    if (!authContext.token) {
      throw redirect('/');
    }
    return null;
  };

  const preventAuth = async () => {
    if (authContext.token) {
      throw redirect('/');
    }
    return null;
  };

  const requireVerification = async () => {
    if (!authContext.requiresVerification) {
      throw redirect('/');
    }
    return null;
  };

  const router = createBrowserRouter([
    {
      path: '/auth/callback',
      element: (
        <>
          <ScrollToTop />
          <PageLoader /> 
          <AuthCallback />
        </>
      ),
    },
    {
      path: '/',
      element: (
        <>
          <ScrollToTop />
          <PageLoader /> 
          <Home />
        </>
      ),
    },
    {
      path: '/welcome',
      loader: requireAuth,
      element: (
        <>
          <ScrollToTop />
          <PageLoader /> 
          <Welcome />
        </>
      ),
    },
    {
      path: '/auth',
      element: (
        <>
          <ScrollToTop />
          <PageLoader /> 
          <AuthLayout />
        </>
      ),
      children: [
        {
          index: true,
          loader: preventAuth,
          element: <LoginComponent />,
        },
        {
          path: 'login',
          loader: preventAuth,
          element: <LoginComponent />,
        },
        {
          path: 'register',
          loader: preventAuth,
          element: <RegisterComponent />,
        },
        {
          path: 'forget-password',
          loader: preventAuth,
          element: <ForgetPassword />,
        },
        {
          path: 'verify',
          loader: async () => {
            await preventAuth();
            await requireVerification();
            return null;
          },
          element: <VerifyCode />,
        },
      ],
    },
    {
      path: '/collection',
      element: (
        <>
          <ScrollToTop />
          <PageLoader /> 
          <MainLayout />
        </>
      ),
      children: [
        {
          path: ':collectionName',
          element: <ProductsCollectionList />,
        },
        {
          path: ':collectionName/:categoryName',
          element: <ProductsCollectionList />,
        },
        {
          path: ':collectionName/:categoryName/:subCategoryName/:productId',
          element: <ProductProfile />,
        },
      ],
    },
    {
      path: '*',
      element: (
        <>
          <ScrollToTop />
          <PageLoader /> 
          <div>page not found</div>
        </>
      ),
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
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