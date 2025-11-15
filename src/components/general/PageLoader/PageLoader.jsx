import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PageLoader.css';
import { getLanguage } from '../../../utils/Helper';

const PageLoader = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const lang= getLanguage();

  useEffect(() => {
    setLoading(true);
    

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!loading) return null;

  return (
    <div className="page-loader-overlay">
      <div className="page-loader-content">
        <div className="logo-container">
          <img 
            src="/assets/login-form-logo2.png" 
            alt="Loading..." 
            className="loader-logo"
          />
          <div className="loader-ring"></div>
          <div className="loader-ring-2"></div>
        </div>
        <div className="loader-text">
            {lang==="EN"? "Loading...":"جاري التحميل..."}
        </div>
      </div>
    </div>
  );
};

export default PageLoader;