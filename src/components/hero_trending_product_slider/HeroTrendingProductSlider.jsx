// import { useState, useEffect, useRef, useCallback } from 'react';
// import { BiPlayCircle } from 'react-icons/bi';
// import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
// import { LiaLongArrowAltRightSolid } from 'react-icons/lia';
// import ProductsApiService from '../../services/ProductsApiService';
// import './HeroTrendingProductSlider.scss';

// const PRODUCTS = [
//   {
//     id: 1,
//     name: "LAPTOPS MAX",
//     subtitle: "PROFESSIONAL",
//     model: "15-INCH",
//     description: "Made to Rule the Performance",
//     details: "ADAMIX | SPECIAL EDITION",
//     fullDescription: "Powerful M2 chip with 12-core CPU and 19-core GPU delivers exceptional performance for professional workflows. Features advanced thermal design.",
//     price: "From $1499.00",
//     monthlyPrice: "$64.62/mo",
//     imageUrl: "/assets/pro_card.png",
//     videoTitle: "WATCH PROMO",
//     ctaText: "DISCOVER LAPTOPS",
//     bgColor: "#1a1a1a",
//     accentColor: "gray"
//   },
//   // {
//   //   id: 2,
//   //   name: "SUBMERSIBLE",
//   //   subtitle: "AUTOMATIC",
//   //   model: "42MM CARBOTECH™",
//   //   description: "Official Campaign",
//   //   details: "ADAMIX | SPECIAL EDITION",
//   //   fullDescription: "Precision-crafted with advanced materials and cutting-edge technology. Built to withstand extreme conditions while maintaining elegance.",
//   //   price: "From $599.00",
//   //   monthlyPrice: "$49.91/mo",
//   //   image: "/assets/pro_card2.png",
//   //   videoTitle: "WATCH VIDEO",
//   //   ctaText: "DISCOVER SUBMERSIBLE",
//   //   bgColor: "#7a8471",
//   //   accentColor: "#7cb342"
//   // },
// ];

// const MOBILE_OR_TABLET_SCREEN = 991;

// const HeroTrendingProductSlider = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [, setIsMobile] = useState(window.innerWidth <= MOBILE_OR_TABLET_SCREEN);
//   const [products, setProducts]= useState();
//   const sliderRef = useRef(null);
//   const currentProduct = PRODUCTS[currentSlide];

//   async function fetchTrendedProducts(){
//     try{
//       const response = await ProductsApiService.fetchTrendedProducts();
//       //TODO: replace Dummy data of products with response.data
//       console.log(response);
//     }catch(err){
//       console.error('Error fetching products:', err);
//     }
//   }



//   // Callbacks with memoization
//   const changeSlide = useCallback((direction) => {
//     if (isAnimating) return;
//     setIsAnimating(true);

//     setCurrentSlide(prev =>
//       direction === 'next'
//         ? (prev + 1) % PRODUCTS.length
//         : (prev - 1 + PRODUCTS.length) % PRODUCTS.length
//     );
//   }, [isAnimating]);

//   const nextSlide = useCallback(() => changeSlide('next'), [changeSlide]);
//   const prevSlide = useCallback(() => changeSlide('prev'), [changeSlide]);

//   const goToSlide = useCallback((index) => {
//     if (isAnimating || index === currentSlide) return;
//     setIsAnimating(true);
//     setCurrentSlide(index);
//   }, [isAnimating, currentSlide]);

//   //Auto play (cleaner)
//   // useEffect(() => {
//   //   const interval = setInterval(() => {
//   //     if (!isAnimating) changeSlide('next');
//   //   }, 6000);
//   //   return () => clearInterval(interval);
//   // }, [changeSlide, isAnimating]);

//   // Use animationend instead of setTimeout
//   useEffect(() => {
//     const handleAnimationEnd = () => setIsAnimating(false);
//     const node = sliderRef.current;
//     if (node) node.addEventListener('animationend', handleAnimationEnd);
//     return () => node?.removeEventListener('animationend', handleAnimationEnd);
//   }, []);

//   // handle resize once, instead of using window directly
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= MOBILE_OR_TABLET_SCREEN);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(()=>{
//     fetchTrendedProducts();
//   }, [])

//   return (
//     <div
//       ref={sliderRef}
//       className="slider-container position-relative overflow-hidden"
//       style={{
//         background: currentProduct.bgColor,
//         transition: 'background 0.8s ease-in-out',
//       }}
//     >

//       {/* Main Content */}
//       <div className="container-fluid slide-product-data p-0">
//         <div className="row w-100 slide-product-data p-0 m-0">
//           {/* Left Content */}
//           <div className="col-lg-9 col-12 text-white p-5">
//             <div className={`slide-content ${isAnimating ? 'slide-out' : 'slide-in'}`} key={currentSlide}>
//               <h1 
//                 className="display-1 fw-bold mb-0 text-uppercase slide-element"
//                 style={{
//                   fontSize: 'clamp(2.5rem, 8vw, 6rem)',
//                   lineHeight: '0.9',
//                   letterSpacing: '-2px',
//                   animationDelay: '0.1s'
//                 }}
//               >
//                 {currentProduct.name}
//               </h1>
//               <h2 
//                 className="display-4 fw-light mb-3 text-uppercase slide-element"
//                 style={{
//                   fontSize: 'clamp(1.8rem, 5vw, 4rem)',
//                   lineHeight: '0.9',
//                   letterSpacing: '-1px',
//                   animationDelay: '0.2s'
//                 }}
//               >
//                 {currentProduct.subtitle}
//               </h2>
//               <p 
//                 className="h4 mb-4 text-uppercase tracking-wide slide-element"
//                 style={{
//                   color: currentProduct.accentColor,
//                   letterSpacing: '2px',
//                   animationDelay: '0.3s'
//                 }}
//               >
//                 {currentProduct.model}
//               </p>

//               {/* Video Button */}
//               <div 
//                 className="d-flex align-items-center mb-4 slide-element"
//                 style={{ animationDelay: '0.4s'}}
//               >
//                 <button 
//                   className="btn btn-link text-white p-0 d-flex align-items-center gap-3"
//                   style={{ textDecoration: 'none' }}
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   <div 
//                     className="d-flex align-items-center justify-content-center rounded-circle"
//                     style={{
//                       width: '60px',
//                       height: '60px',
//                       border: `2px solid ${currentProduct.accentColor}`,
//                       color: currentProduct.accentColor,
//                       transition: 'all 0.3s ease'
//                     }}
//                   >
//                     <BiPlayCircle size={20}/>
//                   </div>
//                   <div className="text-start">
//                     <div className="fw-bold">{currentProduct.description}</div>
//                     <small className="text-light">{currentProduct.videoTitle}</small>
//                   </div>
//                 </button>
//               </div>

//               {/* Product Details */}
//               <div 
//                 className="mb-4 slide-element"
//                 style={{ animationDelay: '0.5s' }}
//               >
//                 <p className="text-uppercase fw-bold mb-2" style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>
//                   {currentProduct.details}
//                 </p>
//                 <p className="text-light mb-4" style={{ maxWidth: '400px' }}>
//                   {currentProduct.fullDescription}
//                 </p>
//               </div>

//               {/* Pricing */}
//               <div 
//                 className="mb-4 slide-element"
//                 style={{ animationDelay: '0.6s' }}
//               >
//                 <div className="d-flex align-items-center gap-3 mb-2">
//                   <span className="h3 mb-0 fw-bold" style={{ color: currentProduct.accentColor }}>
//                     {currentProduct.price}
//                   </span>
//                   {currentProduct.originalPrice && (
//                     <span className="text-muted text-decoration-line-through">
//                       {currentProduct.originalPrice}
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* CTA Button */}
//               <button 
//                 className="btn btn-link text-white p-0 d-flex align-items-center gap-2 text-uppercase fw-bold slide-element"
//                 style={{
//                   fontSize: '0.9rem',
//                   letterSpacing: '1px',
//                   textDecoration: 'none',
//                   color: currentProduct.accentColor + ' !important',
//                   animationDelay: '0.7s',
//                 }}
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {currentProduct.ctaText}
//                 <LiaLongArrowAltRightSolid size={20}/>
//               </button>
//             </div>
//           </div>

//           {/* Right Content - Product Image */}
//           <div className="col-lg-3 col-12 text-center" style={{background: window.innerWidth <= MOBILE_OR_TABLET_SCREEN? currentProduct.bgColor: '#fff' }}>
//             <div 
//               className={`product-showcase ${isAnimating ? 'product-out' : 'product-in'}`}
//               key={`product-${currentSlide}`}
//             >
//               <div 
//                 className="position-relative d-inline-block"
//                 style={{
//                   transform: 'scale(1)',
//                   transition: 'transform 0.8s ease-in-out'
//                 }}
//               >
//                 {/* Product placeholder - replace with actual images */}
//                 <div 
//                   className="d-flex align-items-center justify-content-center rounded-3"
//                   style={{
//                     height: 'auto',
//                     width:"100%",
//                   }}
//                 >
//                   <img
//                     src={PRODUCTS[currentSlide].imageUrl}
//                     alt="login visual"
//                     className="object-fit-fill"
//                     style={{height: "100%", width:"auto"}}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Navigation */}
//       <div className="position-absolute bottom-0 w-100">
//         <div className="container-fluid">
//           <div className="row align-items-center">
//             {/* Slide Indicators */}
//             <div className="col-6">
//               <div className="d-flex gap-2">
//                 {PRODUCTS.map((_, index) => (
//                   <button
//                     key={index}
//                     className={`border-0 ${
//                       index === currentSlide ? 'bg-white' : 'bg-secondary'
//                     }`}
//                     style={{
//                       width: index === currentSlide ? '40px' : '12px',
//                       height: '3px',
//                       transition: 'all 0.3s ease',
//                       cursor: 'pointer'
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       goToSlide(index);
//                     }}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Navigation Arrows */}
//             <div className="col-6 text-end">
//               <button 
//                 className="btn btn-link text-dark p-2 me-2"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   prevSlide();
//                 }}
//                 style={{ fontSize: '1.5rem' }}
//                 disabled={isAnimating}
//               >
//                 <IoIosArrowBack
//                   size={22}
//                   color={window.innerWidth <= MOBILE_OR_TABLET_SCREEN? '#fff': currentProduct.bgColor}
//                 />
//               </button>
//               <button 
//                 className="btn btn-link text-dark p-2"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   nextSlide();
//                 }}
//                 style={{ fontSize: '1.5rem'}}
//                 disabled={isAnimating}
//               >
//                 <IoIosArrowForward 
//                   size={22}
//                   color={window.innerWidth <= MOBILE_OR_TABLET_SCREEN? '#fff': currentProduct.bgColor}
//                 />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroTrendingProductSlider;


import { useState, useEffect, useCallback } from 'react';
import { ShoppingCart, ChevronRight } from 'lucide-react';
import ProductsApiService from '../../services/ProductsApiService'
import './HeroTrendingProductSlider.scss';
import { useNavigate } from 'react-router-dom';
import { getLanguage } from '../../utils/Helper';
const HeroTrendingProductSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([
        {
          id: 2,
          nameEn: "Adidas Running Shoes",
          nameAr: "أديداس أحذية جري",
          collectionNameEn: "Sport Collection",
          collectionNameAr: null,
          categoryNameEn: "Running Shoes",
          categoryNameAr: "أحذية جري",
          brandNameEn: "Adidas",
          brandNameAr: "أديداس",
          brandImageUrl: "https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo.png",
          imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
          price: 120.0,
          discountPrice: 100.0,
          colors: [
            { id: 1, hexCode: "#FF0000", nameEn: "Red", nameAr: "أحمر" },
            { id: 2, hexCode: "#0000FF", nameEn: "Blue", nameAr: "أزرق" },
            { id: 3, hexCode: "#FFFFFF", nameEn: "White", nameAr: "أبيض" }
          ],
          savings: null
        }
      ]);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState('next');

  const currentProduct = products[currentSlide];

  const navigate= useNavigate();

  const lang= getLanguage();


  const fetchTrendedProducts = async () => {
    try {
      setLoading(true);
      const response = await ProductsApiService.fetchTrendedProducts();
      setProducts([...response, ...response]);
      console.log(response);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = useCallback(() => {
    setDirection('next');
    setCurrentSlide((prev) => (prev + 1) % products.length);
  }, [products.length]);

  const prevSlide = useCallback(() => {
    setDirection('prev');
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  }, [products.length]);

  const openProductProfile= ()=>{
    const collectionName= currentProduct.collectionNameEn.toString().toLowerCase().split(" ").join("-")
    const catName= currentProduct.categoryNameEn.toString().toLowerCase().split(" ").join("-")
    const subCatName= currentProduct.subCategoryNameEn.toString().toLowerCase().split(" ").join("-")
    navigate(`/collection/${collectionName}/${catName}/${subCatName}/${currentProduct.id}`);
  }

  useEffect(() => {
    fetchTrendedProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, products.length]);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: '#f5f5f5' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: '#f5f5f5' }}>
        <p>No trending products available</p>
      </div>
    );
  }


  return (
    <div 
      className="position-relative overflow-hidden"
      style={{
        minHeight: '100vh',
        background: '#f8f9fa',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      }}
    >
      <div className="container-fluid h-100">
        <div className="row h-100 align-items-center" style={{ minHeight: '100vh' }}>
          {/* Left Content */}
          <div className="col-lg-5 col-md-6 col-12 py-5 px-4 px-md-5">
            <div 
              key={currentSlide}
              style={{
                animation: 'fadeInUp 0.8s ease-out'
              }}
            >
              {/* Brand Logo */}
              {currentProduct.brandImageUrl && (
                <div className="mb-4">
                  <img 
                    src={currentProduct.brandImageUrl} 
                    alt={currentProduct.brandNameEn}
                    style={{ 
                      height: '32px',
                      width: 'auto',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              )}

              {/* Product Name */}
              <h1 
                className="mb-3"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: '400',
                  lineHeight: '1.2',
                  color: '#1a1a1a',
                  fontFamily: 'Georgia, serif'
                }}
              >
                {lang === "EN"? currentProduct.nameEn: currentProduct.nameAr}
              </h1>

              {/* Price */}
              <div className="mb-4">
                <span 
                  style={{
                    fontSize: '2rem',
                    fontWeight: '300',
                    color: '#1a1a1a'
                  }}
                >
                  {currentProduct.discountPrice || currentProduct.price} EGP
                </span>
                {currentProduct.discountPrice && (
                  <span 
                    className="ms-3 text-decoration-line-through text-muted"
                    style={{ fontSize: '1.2rem' }}
                  >
                    {currentProduct.price} EGP
                  </span>
                )}
              </div>

              {/* Description */}
              {currentProduct.descriptionEn && (
                <p 
                  className="mb-4"
                  style={{
                    color: '#666',
                    fontSize: '1rem',
                    lineHeight: '1.6',
                  }}
                >
                  {lang === "EN"? currentProduct.descriptionEn: currentProduct.descriptionAr}
                </p>
              )}

              {/* Colors */}
              {currentProduct.colors && currentProduct.colors.length > 0 && (
                <div className="mb-4">
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    {currentProduct.colors.map((color, index) => (
                      <button
                        key={index}
                        className="border-0 rounded-circle"
                        style={{
                          width: '40px',
                          height: '40px',
                          background: color.hexCode,
                          cursor: 'pointer',
                          transition: 'transform 0.2s ease',
                          boxShadow: color.hexCode === '#FFFFFF' || color.hexCode === '#ffffff' 
                            ? '0 0 0 1px #ddd inset' 
                            : 'none'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        title={color.nameEn}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Button */}
              <button
                className="btn d-inline-flex align-items-center gap-2 px-4 py-3 border-2 cta-button"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1a1a1a';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#1a1a1a';
                }}
              >
                <ShoppingCart size={18} />
                
                {lang === "EN"? "ADD To Cart": "أضف الي السلة"}
              </button>
            </div>
          </div>

          {/* Center - Product Image */}
          <div className="col-lg-5 col-md-6 col-12 d-flex align-items-center justify-content-center py-5">
            <div 
              key={`product-${currentSlide}`}
              className="position-relative product-primary-image"
              style={{
                animation: direction === 'next' ? 'slideInRight 0.8s ease-out' : 'slideInLeft 0.8s ease-out',
                maxWidth: '500px',
                width: '100%'
              }}
              onClick={openProductProfile}
            >
              <img
                src={currentProduct.imageUrl}
                alt={currentProduct.nameEn}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '600px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))'
                }}
              />
            </div>
          </div>

          {/* Right - Thumbnails & Navigation */}
          <div className="col-lg-2 col-12 d-flex flex-lg-column align-items-center justify-content-center gap-4 pt-2 pb-5 overflow-auto">
            {/* Slide Counter */}
            <div 
              className="text-center mb-lg-4"
              style={{
                fontSize: '0.9rem',
                color: '#999',
                fontWeight: '500'
              }}
            >
              {String(currentSlide + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
            </div>

            {/* Thumbnails */}
            <div className="d-flex flex-lg-column flex-row gap-3">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => {
                    setDirection(index > currentSlide ? 'next' : 'prev');
                    setCurrentSlide(index);
                  }}
                  className="border-0 p-0 bg-transparent"
                  style={{
                    width: '80px',
                    height: '80px',
                    opacity: index === currentSlide ? 1 : 0.4,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = index === currentSlide ? 1 : 0.4}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.nameEn}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Next Product Button */}
            <button
              onClick={nextSlide}
              className="btn d-flex align-items-center gap-2 border-0 p-3 mt-lg-4"
              style={{
                background: 'transparent',
                color: '#1a1a1a',
                fontSize: '0.75rem',
                fontWeight: '600',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
            >
              {lang === "EN"? "Next Product": "المنتج التالي"}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroTrendingProductSlider;