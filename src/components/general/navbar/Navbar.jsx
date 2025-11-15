import { useEffect, useState } from 'react';
import { Search, ShoppingCart, Heart, Globe, User, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getLanguage, setLanguage } from '../../../utils/Helper';
import "./Navbar.scss"; 

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(getLanguage());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const authContext= useAuth();
  const [welcomeText, setWelcomeText] = useState('Login');
  const [navData, setNavData]= useState([]);
  const navigate= useNavigate();

  const handleCollectionPaht= (collectionName, categoryName= null, subCategory= null) =>{
    let path= `/collection/${collectionName}`
    path+= categoryName? `/${categoryName}`: "";
    path+= subCategory? `?sub_cat=${subCategory}`: "";
    return path.toString().toLowerCase().split(" ").join("-", " ");
  }

  // const handleLanguage= ()=>{
  //     setCurrentLanguage(prev => {
  //       const newLang = prev === 'EN' ? 'AR' : 'EN';
  //       setLanguage(newLang);
  //       return newLang;
  //     });
  // }

  const handleLanguage = () => {
    const newLang = currentLanguage === 'EN' ? 'AR' : 'EN';
    setLanguage(newLang);
    setCurrentLanguage(newLang);
    window.location.reload();
  };


  useEffect(() => {
    if( authContext?.user){
      setWelcomeText(`Ahlan ${authContext.username}`);
    }

    if (authContext?.systemCollections?.length > 0) {
      setNavData(authContext.systemCollections);
    }
    
  }, [authContext?.systemCollections, authContext?.user, authContext?.username]);

  return (
    <nav className="navbar-container navbar navbar-expand-lg shadow-sm sticky-top">
      {/* Top Bar */}
      {/* <div className="top-bar  d-lg-flex d-none">
        <div className="container-fluid">
          <div className="row align-items-center text-sm">
            <div className="col-auto">
              <span>📞 Hotline: +20 123 456 7890</span>
            </div>
            <div className="col text-center d-none d-md-block">
              <span>✨ Free Shipping Over 1500 EGP & Free Returns</span>
            </div>
            <div className="col-auto d-none d-md-block">
              <span>🚚 Fast Delivery Available</span>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Navbar */}
      <div className="container-fluid">
        <div className="row w-100 align-items-center">

          {/* Search Bar */}
          <div className="col-lg-12 px-0 mb-2">
            <div className="search-container">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                className="search-input"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Logo */}
          <div className="col-lg-1 col-6 px-0">
            <Link to={"/"} className="logo-container">
              <img
                  src={"/assets/login-form-logo.png"}
                  alt="login visual"
                  className="object-fit-fill mx-2"
                  style={{
                    borderRadius: "10px",
                    height: "auto",
                    width: "100px",
                  }}
                />
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="col-lg-7 desktop-nav px-0 text-left d-lg-block d-none">
            <ul className="navbar-nav justify-content-center">
              {navData.map((collection, index) => (
                <li 
                  key={index}
                  className={`nav-item ${collection?.categories.length > 0 ? 'has-dropdown' : ''}`}
                  onMouseEnter={() => collection?.categories.length > 0 && setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <p
                    className="nav-link"
                    // to={handleCollectionPaht(collection.name_url)}
                    onClick={()=> window.location.href= (handleCollectionPaht(collection.name_url))}
                  >
                    {collection.name}
                  </p>
                  
                  {collection?.categories.length > 0 && activeDropdown === index && (
                    <div className="mega-dropdown show">
                      <div className="container-fluid">
                        <div className="row">
                          {collection?.categories.map((category, catIndex) => (
                            <div key={catIndex} className="col-md-2 my-2">
                              <div>
                                <h6 
                                  className="dropdown-header text-uppercase fw-bold" 
                                  // onClick={()=> navigate(handleCollectionPaht(collection.name_url, category.name_url))}
                                    onClick={()=> window.location.href= (handleCollectionPaht(collection.name_url, category.name_url))}
                                >
                                  {category.name}
                                </h6>
                                <div>
                                  {category?.sub_categories.map((subItem, subIndex) => (
                                    <p 
                                      key={subIndex}
                                      className="dropdown-item"
                                      onClick={()=> window.location.href= (handleCollectionPaht(collection.name_url, category.name_url, subItem.name_url))}
                                    >
                                      {subItem.name}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="row">
                          {/* Brands Section */}
                          <div className="col-12 brands-section">
                            <h6 className="text-uppercase fw-bold mb-3">TOP BRANDS</h6>
                            <div className="d-flex align-items-center justify-content-start">
                              {collection.top_brands.map((brand, brandIndex) => (
                                <div key={brandIndex} className="col-auto brand-item">
                                  <div className="brand-logo-container d-flex flex-column align-items-center">
                                    <img 
                                      src={brand.image_url} 
                                      alt={brand.name}
                                      className="brand-logo mb-1"
                                      onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                      }}
                                    />
                                    <div className="brand-placeholder" style={{display: 'none'}}>
                                      {brand.name.charAt(0)}
                                    </div>
                                    <small className="text-muted brand-name">{brand.name}</small>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Items */}
          <div className="col-lg-4 col-6 px-0">
            <div className="d-flex align-items-center action-items justify-content-end">
              {/* Language Selector */}
              <button 
                className="language-selector d-lg-block d-none"
                onClick={() => handleLanguage()}
              >
                <Globe size={16} />
                <span>{currentLanguage}</span>
              </button>

              {/* User Account */}
              <Link to={"/auth"} className="action-item">
                <User size={20} />
                <span className="ms-1 d-none d-lg-inline">
                  {authContext?.user ? welcomeText : 'Login'}
                </span>
              </Link>

              {/* Wishlist */}
              <Link to={"#1"} className="action-item">
                <Heart size={20} />
                <span className="badge">3</span>
                <span className="ms-1 d-none d-lg-inline">Wishlist</span>
              </Link>

              {/* Cart */}
              <Link to={"#1"} className="action-item">
                <ShoppingCart size={20} />
                <span className="badge">5</span>
                <span className="ms-1 d-none d-lg-inline">Cart</span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button 
                className="mobile-menu-toggle"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
          
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <div className="logo-container">
            <img 
              src={"/assets/login-form-logo.png"}
              alt="login visual"
              className="object-fit-fill"
              style={{
                borderRadius: "10px",
                height: "auto",
                width: "100px",
              }}
            />
          </div>
          <button 
            className="close-mobile-menu"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="mobile-nav">
          {navData.map((collection, index) => (
            <div key={index} className="mb-2">
              <button
                className="nav-link fw-bold w-100 text-start d-flex justify-content-between align-items-center"
                onClick={() =>
                  setActiveDropdown(activeDropdown === index ? null : index)
                }
              >
                {collection.name}
                {collection.categories.length > 0 && (
                  <span>{activeDropdown === index ? "−" : "+"}</span>
                )}
              </button>

              {collection.categories.length > 0 && activeDropdown === index && (
                <div className="ms-3 mt-2">
                  {collection.categories.map((category, catIndex) => (
                    <div key={catIndex} className="mb-2">
                      <div className="fw-semibold text-light small mt-4">
                        <h4
                          className="dropdown-header text-uppercase" 
                          // onClick={()=> navigate(handleCollectionPaht(collection.name_url, category.name_url))}
                          onClick={()=> window.location.href= (handleCollectionPaht(collection.name_url, category.name_url))}
                        >
                        {category.name}
                        </h4>
                      </div>
                      {category.sub_categories.map((subItem, subIndex) => (
                        <p
                          key={subIndex}
                          // to={handleCollectionPaht(collection.name_url, category.name_url, subItem.name_url)}
                          onClick={()=> window.location.href= (handleCollectionPaht(collection.name_url, category.name_url, subItem.name_url))}
                          className="d-block text-decoration-none text-secondary small p-0 m-1 sub-category-title"
                        >
                          {subItem.name}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;