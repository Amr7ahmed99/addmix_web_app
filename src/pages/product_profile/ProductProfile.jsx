// import { useState, useRef, useEffect } from 'react';
// import { ChevronDown, Star, ChevronLeft, Clock, Package, Truck, ChevronRight } from 'lucide-react';
// import './ProductProfile.scss';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// const ProductProfile = () => {
//   const [selectedSize, setSelectedSize] = useState('M');
//   const [quantity, setQuantity] = useState(1);
//   const [descriptionExpanded, setDescriptionExpanded] = useState(false);
//   const [shippingExpanded, setShippingExpanded] = useState(false);
//   const [visibleReviews, setVisibleReviews] = useState(2);
//   const [thumbnailIndex, setThumbnailIndex] = useState(0);

//     const { productId } = useParams();
  

//   // const [productsIndex, setProductsIndex] = useState(0);
//   const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

//   const thumbnailContainerRef = useRef(null);
//   const productsContainerRef = useRef(null);

//   const handleSizeClick = (size) => {
//     setSelectedSize(size);
//   };

//   const handleQuantityChange = (type) => {
//     if (type === 'increment') {
//       setQuantity(prev => prev + 1);
//     } else if (type === 'decrement' && quantity > 1) {
//       setQuantity(prev => prev - 1);
//     }
//   };

//   const reviews = [
//     {
//       name: 'Alex Mathio',
//       date: '13 Oct 2024',
//       rating: 5,
//       text: 'NextGen\'s dedication to sustainability and ethical practices resonates strongly with me. The premium denim clothing is a true masterpiece, a joy to wear and an investment in my closet. I will definitely be back to purchase more!'
//     },
//     {
//       name: 'Jane Doe',
//       date: '10 Nov 2024',
//       rating: 4,
//       text: 'Great product, but it took a bit longer to arrive than expected. The quality is fantastic though!'
//     },
//     {
//       name: 'Peter Smith',
//       date: '20 Oct 2024',
//       rating: 5,
//       text: 'I love this hoodie! It\'s incredibly comfortable and the fit is perfect.'
//     },
//     {
//       name: 'Sarah Lee',
//       date: '25 Nov 2024',
//       rating: 4,
//       text: 'The quality is great for the price. I would definitely recommend it to a friend.'
//     },
//     {
//       name: 'John Williams',
//       date: '01 Dec 2024',
//       rating: 5,
//       text: 'Fast shipping and a fantastic product. I couldn\'t be happier with my purchase.'
//     }
//   ];

//   const products = [
//     {
//       name: 'Polo with Contrast Trims',
//       price: '$212',
//       oldPrice: '$250',
//       rating: 4.5,
//       image: '/assets/backpack.jpg',
//     },
//     {
//       name: 'Gradient Graphic T-shirt',
//       price: '$145',
//       oldPrice: '',
//       rating: 3.5,
//       image: '/assets/handbag.png',
//     },
//     {
//       name: 'Polo with Tipping Details',
//       price: '$180',
//       oldPrice: '',
//       rating: 5.0,
//       image: '/assets/backpack.jpg',
//     },
//     {
//       name: 'Striped Jacket',
//       price: '$120',
//       oldPrice: '$150',
//       rating: 4.0,
//       image: '/assets/backpack.jpg',
//     },
//     {
//       name: 'Plain White Shirt',
//       price: '$90',
//       oldPrice: '',
//       rating: 4.5,
//       image: '/assets/handbag.png',
//     },
//     {
//       name: 'Slim Fit Jeans',
//       price: '$75',
//       oldPrice: '$90',
//       rating: 4.2,
//       image: '/assets/backpack.jpg',
//     },
//   ];

//   const productThumbnails = [
//     '/assets/backpack.jpg',
//     '/assets/backpack.jpg',
//     '/assets/backpack.jpg',
//     '/assets/backpack.jpg',
//   ];

//   const renderStars = (rating) => {
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;
//     const stars = [];

//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(<Star key={i} size={16} fill="currentColor" className="ratingStars" />);
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(
//           <div key={i} className="position-relative">
//             <Star size={16} className="starEmpty" />
//             <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden' }}>
//               <Star size={16} fill="currentColor" className="ratingStars" />
//             </div>
//           </div>
//         );
//       } else {
//         stars.push(<Star key={i} size={16} className="starEmpty" />);
//       }
//     }
//     return stars;
//   };

//   const handleThumbnailScroll = (direction) => {
//     if (thumbnailContainerRef.current) {
//       const scrollAmount = thumbnailContainerRef.current.offsetWidth / 3;
//       if (direction === 'left') {
//         thumbnailContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
//       } else {
//         thumbnailContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//       }
//     }
//   };

//   const handleProductsScroll = (direction) => {
//     if (productsContainerRef.current) {
//       const scrollAmount = productsContainerRef.current.offsetWidth / 3;
//       if (direction === 'left') {
//         productsContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
//       } else {
//         productsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//       }
//     }
//   };

//   const handleSeeMoreReviews = () => {
//     setVisibleReviews(reviews.length);
//   };


//   // ======================================================================================================
//   // this is for fetching product details using productId from params, from java spring boot backend
//   const [product, setProduct] = useState(null);

//     useEffect(() => {
//       axios.get(`http://localhost:8080/api/products/${productId}`)
//         .then(res => setProduct(res.data))
//         .catch(err => console.error(err));
//     }, [productId]);

//     if (!product) return <p>Loading...</p>;

//   return (
//       <div className="productProfile">
//         <div className="container py-5">
//           {/* Breadcrumb */}
//           <div className="d-flex align-items-center text-sm text-muted mb-4">
//             <ChevronLeft size={16} />
//             <a href="#" className="ms-2 text-muted text-decoration-none">Home</a>
//             <span className="mx-2">&gt;</span>
//             <span className="text-dark">Product details</span>
//           </div>

//           {/* Product Grid */}
//           <div className="row g-4 mb-5">
//             {/* Left: Product Images */}
//             <div className="col-lg-6">
//               <div className={`w-100 cardShadow`} style={{ height: '600px' }}>
//                 <img src={productThumbnails[thumbnailIndex]} alt="Main product" className="productImage" />
//               </div>
//               <div className="d-flex justify-content-between align-items-center mt-3 position-relative">
//                 <button 
//                   onClick={() => handleThumbnailScroll('left')} 
//                   className="btn btn-light slider-control position-absolute start-0 translate-middle-y z-3" 
//                   style={{ top: '50%' }}>
//                   <ChevronLeft size={24} />
//                 </button>
//                 <div ref={thumbnailContainerRef} className="d-flex overflow-hidden">
//                   {productThumbnails.map((image, index) => (
//                     <div
//                       key={index}
//                       className={`me-3 cursor-pointer ${thumbnailIndex === index ? 'border border-dark' : ''}`}
//                       style={{ width: '128px', height: '128px' }}
//                       onClick={() => setThumbnailIndex(index)}
//                     >
//                       <img src={image} alt={`Product thumbnail ${index + 1}`} className="productImage" />
//                     </div>
//                   ))}
//                 </div>
//                 <button 
//                   onClick={() => handleThumbnailScroll('right')} 
//                   className="btn btn-light slider-control position-absolute end-0 translate-middle-y z-3" 
//                   style={{ top: '50%' }}>
//                   <ChevronRight size={24} />
//                 </button>
//               </div>
//             </div>

//             {/* Right: Product Details */}
//             <div className="col-lg-6">
//               <span className="text-sm fw-semibold text-muted">Men Fashion</span>
//               <h1 className="display-4 fw-semibold text-dark">Loose Fit Hoodie</h1>
//               <p className="fs-3 fw-bold text-dark">$24.99</p>
//               <p className="text-sm text-muted d-flex align-items-center">
//                 <Clock size={16} className="me-2" />
//                 <span>Order in 02:30:00 to get next day delivery</span>
//               </p>

//               {/* Size Selector */}
//               <div className="mt-4">
//                 <p className="fw-medium mb-2">Select Size</p>
//                 <div className="d-flex flex-wrap gap-2">
//                   {sizes.map(size => (
//                     <button
//                       key={size}
//                       onClick={() => handleSizeClick(size)}
//                       className={`btn sizeButton ${selectedSize === size ? 'active' : ''}`}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Add to Cart & Buy Now Buttons */}
//               <div className="d-flex mt-4">
//                 <button className={`btn flex-grow-1 me-3 buy-button`}>
//                   Add to Cart
//                 </button>
//                 <button className={`btn flex-grow-1 add-to-cart-button`}>
//                   Buy Now
//                 </button>
//               </div>

//               {/* Description & Fit */}
//               <div className="accordion mt-4 pt-4 border-top" id="descriptionAccordion">
//                 <div className="accordion-item">
//                   <h2 className="accordion-header">
//                     <button 
//                       className="accordion-button d-flex justify-content-between align-items-center" 
//                       type="button" 
//                       onClick={() => setDescriptionExpanded(!descriptionExpanded)}
//                     >
//                       <h2 className="h5 fw-semibold mb-0">Description & Fit</h2>
//                       <ChevronDown size={24} className={`text-muted transition-transform duration-300 ${descriptionExpanded ? 'rotate-180' : ''}`} />
//                     </button>
//                   </h2>
//                   <div className={`accordion-collapse collapse ${descriptionExpanded ? 'show' : ''}`}>
//                     <div className="accordion-body">
//                       <p className="text-sm text-muted">
//                         Loose-fit sweatshirt hoodie in medium-weight cotton-blend fabric with a generous, but not oversized, silhouette. Jersey-lined hood with a drawstring, dropped shoulders, and long sleeves. Ribbing at cuffs and hem. Soft, brushed inside.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Shipping */}
//               <div className="accordion mt-2 pt-2 border-top" id="shippingAccordion">
//                 <div className="accordion-item">
//                   <h2 className="accordion-header">
//                     <button 
//                       className="accordion-button d-flex justify-content-between align-items-center" 
//                       type="button" 
//                       onClick={() => setShippingExpanded(!shippingExpanded)}
//                     >
//                       <h2 className="h5 fw-semibold mb-0">Shipping</h2>
//                       <ChevronDown size={24} className={`text-muted transition-transform duration-300 ${shippingExpanded ? 'rotate-180' : ''}`} />
//                     </button>
//                   </h2>
//                   <div className={`accordion-collapse collapse ${shippingExpanded ? 'show' : ''}`}>
//                     <div className="accordion-body">
//                       <div className="row g-3">
//                         <div className="col-md-6 d-flex align-items-start">
//                           <Truck size={20} className="text-muted me-3 mt-1" />
//                           <div>
//                             <h3 className="h6 fw-semibold text-dark">Delivery</h3>
//                             <p className="text-sm mb-0">Free delivery on orders over $50.00</p>
//                             <p className="text-sm text-muted">4-6 Working Days</p>
//                           </div>
//                         </div>
//                         <div className="col-md-6 d-flex align-items-start">
//                           <Package size={20} className="text-muted me-3 mt-1" />
//                           <div>
//                             <h3 className="h6 fw-semibold text-dark">Return</h3>
//                             <p className="text-sm mb-0">Returns accepted within 30 days.</p>
//                             <p className="text-sm text-muted">10-12 October 2024</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-light py-5">
//           <div className="container">
//             {/* Rating & Reviews Section */}
//             <div className="row g-5 mb-5">
//               <div className="col-md-4 d-flex flex-column justify-content-start align-items-center">
//                 <h2 className="h4 fw-semibold mb-3">Rating & Reviews</h2>
//                 <div className="d-flex align-items-baseline">
//                   <span className="fs-1 fw-bold">4.5</span>
//                   <span className="fs-4 fw-light text-muted ms-2">/ 5</span>
//                 </div>
//                 <div className="d-flex align-items-center mt-1">
//                   {renderStars(4.5)}
//                 </div>
//                 <p className="mt-2 text-sm text-muted">({reviews.length} Total Reviews)</p>
//               </div>
//               <div className="col-md-8">
//                 {reviews.slice(0, visibleReviews).map((review, index) => (
//                   <div key={index} className={`reviewCard bg-white p-4 mb-3`}>
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                       <div className="d-flex align-items-center">
//                         <div className="rounded-circle bg-light me-3 overflow-hidden" style={{ width: '40px', height: '40px' }}>
//                           <img src={`https://placehold.co/100x100/A8A8A8/ffffff?text=${review.name.split(' ')[0][0]}${review.name.split(' ')[1][0]}`} alt={review.name} className="productImage" />
//                         </div>
//                         <span className="fw-semibold text-sm">{review.name}</span>
//                       </div>
//                       <div className="d-flex align-items-center text-sm text-muted">
//                         <div className="d-flex align-items-center me-2">
//                           {renderStars(review.rating)}
//                         </div>
//                         <span>{review.date}</span>
//                       </div>
//                     </div>
//                     <p className="text-sm text-muted mb-0">{review.text}</p>
//                   </div>
//                 ))}
//                 {visibleReviews < reviews.length && (
//                   <button 
//                     onClick={handleSeeMoreReviews} 
//                     className="btn btn-light w-100 mt-3"
//                   >
//                     See more reviews
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* You might also like section */}
//             <div className="mt-5">
//               <h2 className="fs-2 fw-semibold mb-4 text-center">You might also like</h2>
//               <div className="position-relative d-flex align-items-center">
//                 <button 
//                   onClick={() => handleProductsScroll('left')} 
//                   className="btn btn-light slider-control position-absolute start-0 translate-middle-y z-3" 
//                   style={{ top: '50%' }}>
//                   <ChevronLeft size={24} />
//                 </button>
//                 <div ref={productsContainerRef} className="slider-wrapper d-flex g-4">
//                   {products.map((product, index) => (
//                     <div className="slider-item" key={index}>
//                       <div className={`productCard bg-white h-100`}>
//                         <img src={product.image} alt={product.name} className="w-100" style={{ height: '250px', objectFit: 'contain' }} />
//                         <div className="p-3">
//                           <h3 className="h6 fw-semibold">{product.name}</h3>
//                           <div className="d-flex align-items-center mt-1">
//                             {renderStars(product.rating)}
//                             <span className="ms-2 text-sm text-muted">({product.rating})</span>
//                           </div>
//                           <div className="d-flex align-items-baseline mt-2">
//                             <span className="fs-5 fw-bold text-dark">{product.price}</span>
//                             {product.oldPrice && (
//                               <span className="ms-2 text-sm text-muted text-decoration-line-through">{product.oldPrice}</span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <button 
//                   onClick={() => handleProductsScroll('right')} 
//                   className="btn btn-light slider-control position-absolute end-0 translate-middle-y z-3" 
//                   style={{ top: '50%' }}>
//                   <ChevronRight size={24} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//   );
// };

// export default ProductProfile;







// =====================================                      =====================================================

// import { useState, useRef, useEffect } from 'react';
// import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
// import './ProductProfile.scss';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const ProductProfile = () => {
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [visibleReviews, setVisibleReviews] = useState(2);
//   const [thumbnailIndex, setThumbnailIndex] = useState(0);

//   const { productId } = useParams();
//   const thumbnailContainerRef = useRef(null);

//   const reviewsPages = {
//     page: 0,
//     limit: 5,
//   };

//   // ================= API =================
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     axios
//       .get(
//         `http://localhost:8080/api/products/${productId}?limitReviews=${reviewsPages.limit}&offsetReviews=${reviewsPages.page}`
//       )
//       .then((res) => setProduct(res.data))
//       .catch((err) => console.error(err));
//   }, [productId]);

//   console.log(product);
//   // ================= HANDLERS =================
//   const handleSizeClick = (size) => {
//     setSelectedSize(size);
//     setSelectedColor(null); // reset color when size changes
//     setSelectedVariant(null);
//   };

//   const handleQuantityChange = (type) => {
//     if (type === 'increment') {
//       setQuantity((prev) => prev + 1);
//     } else if (type === 'decrement' && quantity > 1) {
//       setQuantity((prev) => prev - 1);
//     }
//   };

//   const renderStars = (rating) => {
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;
//     const stars = [];

//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(<Star key={i} size={16} fill="currentColor" className="rating_stars" />);
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(
//           <div key={i} className="position-relative">
//             <Star size={16} className="star_empty" />
//             <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden' }}>
//               <Star size={16} fill="currentColor" className="rating_stars" />
//             </div>
//           </div>
//         );
//       } else {
//         stars.push(<Star key={i} size={16} className="star_empty" />);
//       }
//     }
//     return stars;
//   };

//   const handleThumbnailScroll = (direction) => {
//     if (thumbnailContainerRef.current) {
//       const scrollAmount = thumbnailContainerRef.current.offsetWidth / 3;
//       thumbnailContainerRef.current.scrollBy({
//         left: direction === 'left' ? -scrollAmount : scrollAmount,
//         behavior: 'smooth',
//       });
//     }
//   };

//   const handleSeeMoreReviews = () => {
//     setVisibleReviews(product.reviews?.length || 0);
//   };

//   // ================== DATA ==================
//   const images = product?.images || [];

//   // unique sizes
//   const sizes = [
//     ...new Set(
//       product?.variants.flatMap((v) =>
//         v.attributes.filter((attr) => attr.nameEn === 'Size').map((attr) => attr.valueEn)
//       )
//     ),
//   ];

//   // get available colors for selected size
//   const getColorsForSize = (size) => {
//     if (!size) {
//       return [
//         ...new Set(
//           product?.variants.flatMap((v) =>
//             v.attributes.filter((attr) => attr.nameEn === 'Color').map((attr) => attr.valueEn)
//           )
//         ),
//       ];
//     }
//     return [
//       ...new Set(
//         product?.variants
//           .filter((v) =>
//             v.attributes.some((attr) => attr.nameEn === 'Size' && attr.valueEn === size)
//           )
//           .flatMap((v) =>
//             v.attributes.filter((attr) => attr.nameEn === 'Color').map((attr) => attr.valueEn)
//           )
//       ),
//     ];
//   };

//   // auto-update selectedVariant when both size + color selected
//   useEffect(() => {
//     if (selectedSize && selectedColor) {
//       const variant = product?.variants.find(
//         (v) =>
//           v.attributes.some((a) => a.nameEn === 'Size' && a.valueEn === selectedSize) &&
//           v.attributes.some((a) => a.nameEn === 'Color' && a.valueEn === selectedColor)
//       );
//       setSelectedVariant(variant || null);
//     }
//   }, [selectedSize, selectedColor, product?.variants]);

//   const price =
//     selectedVariant?.discountPrice ||
//     selectedVariant?.price ||
//     product?.variants[0]?.price;

//   if (!product) {
//     return (
//       <div className="container py-5">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="product_profile">
//       <div className="container py-2 py-lg-5">
//         {/* Product Grid */}
//         <div className="row g-4 mb-5">
//           {/* Left: Product Images */}
//           <div className="col-lg-6">
//             <div className={`w-100 card_shadow`}>
//               <img src={images[thumbnailIndex]?.url} alt="Main product" className="product_image" />
//             </div>
//             <div className="d-flex justify-content-between align-items-center mt-3 position-relative">
//               <button
//                 onClick={() => handleThumbnailScroll('left')}
//                 className="btn btn-light slider_control position-absolute start-0 translate-middle-y z-3"
//                 style={{ top: '50%' }}
//               >
//                 <ChevronLeft size={24} />
//               </button>
//               <div ref={thumbnailContainerRef} className="d-flex overflow-hidden">
//                 {images.map((img, index) => (
//                   <div
//                     key={index}
//                     className={`me-3 cursor-pointer ${thumbnailIndex === index ? 'border border-dark' : ''}`}
//                     style={{ width: '128px', height: '128px' }}
//                     onClick={() => setThumbnailIndex(index)}
//                   >
//                     <img src={img.url} alt={`Product thumbnail ${index + 1}`} className="product_image" />
//                   </div>
//                 ))}
//               </div>
//               <button
//                 onClick={() => handleThumbnailScroll('right')}
//                 className="btn btn-light slider_control position-absolute end-0 translate-middle-y z-3"
//                 style={{ top: '50%' }}
//               >
//                 <ChevronRight size={24} />
//               </button>
//             </div>
//           </div>

//           {/* Right: Product Details */}
//           <div className="col-lg-6">
//             <span className="text-sm fw-semibold text-muted attribute_title">{product.brandNameEn}</span>
//             <h4 className="fw-semibold text-dark">{product.nameEn}</h4>
//             <p className="fs-3 fw-bold text-dark">${price}</p>

//             {/* Size Selector */}
//             <div className="mt-4">
//               <p className="fw-medium mb-2 attribute_title">Select Size</p>
//               <div className="d-flex flex-wrap gap-2">
//                 {sizes.map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => handleSizeClick(size)}
//                     className={`btn size_button ${selectedSize === size ? 'active' : ''}`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Color Selector */}
//             <div className="mt-4">
//               <p className="fw-medium mb-2 attribute_title">Select Color</p>
//               <div className="d-flex flex-wrap gap-2">
//                 {getColorsForSize(selectedSize).map((color) => (
//                   <div
//                     key={color}
//                     className={`color_circle ${selectedColor === color ? 'active' : ''}`}
//                     style={{ backgroundColor: color.toString().toLowerCase() }}
//                     onClick={() => setSelectedColor(color)}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Add to Cart & Buy Now Buttons */}
//             <div className="d-flex mt-4">
//               <button className={`btn flex-grow-1 me-3 add_to_cart_button`}>Add to Cart</button>
//               <button className={`btn flex-grow-1  buy_button`}>Buy Now</button>
//             </div>

//             {/* Description */}
//             <div className="accordion mt-4 pt-4 border-top">
//               <div className="accordion_item">
//                 <h2 className="accordion_header">
//                   <h2 className="h5 fw-semibold mb-0 attribute_title">Description:</h2>
//                 </h2>
//                 <div className="accordion_body">
//                   <p className="text-sm text-muted attribute_title">{product.descriptionEn}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Reviews */}
//         <div className="bg-light py-5">
//           <div className="container">
//             <h2 className="h4 fw-semibold mb-3">Reviews</h2>
//             {(product.reviews || []).slice(0, visibleReviews).map((review, index) => (
//               <div key={index} className="bg-white p-3 mb-2 rounded shadow-sm review_card">
//                 <p className="fw-semibold">{review.userName}</p>
//                 <div className="d-flex">{renderStars(review.rating)}</div>
//                 <p className="text-muted">{review.comment}</p>
//               </div>
//             ))}
//             {visibleReviews < (product.reviews?.length || 0) && (
//               <button onClick={handleSeeMoreReviews} className="btn btn-light w-100 mt-3">
//                 See more reviews
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductProfile;




import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight, Package, Truck, Shield } from 'lucide-react';
import { useParams } from 'react-router-dom';
import './ProductProfile.scss';
import ProductsApiService from '../../services/ProductsApiService';

const ProductProfile = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Replace with your actual API endpoint
        const response = await ProductsApiService.getProductDetails(productId)
        const data = response;
        setProduct(data);
        
        // Set first variant as default
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product not found</h2>
      </div>
    );
  }

  const currentPrice = selectedVariant?.discountPrice || selectedVariant?.price || 0;
  const originalPrice = selectedVariant?.price || 0;
  const hasDiscount = selectedVariant?.discountPrice && selectedVariant.discountPrice < selectedVariant.price;
  const discountPercentage = hasDiscount ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;
  
  // Get unique colors and sizes
  const availableColors = [...new Map(product.variants.map(v => [v.color?.id, v.color])).values()].filter(Boolean);
  const availableSizes = [...new Map(product.variants.map(v => [v.size?.id, v.size])).values()].filter(Boolean);

  const handleColorChange = (color) => {
    const variant = product.variants.find(v => v.color?.id === color.id);
    if (variant) {
      setSelectedVariant(variant);
    }
  };

  // const handleSizeChange = (size) => {
  //   const variant = product.variants.find(v => 
  //     v.size?.id === size.id && v.color?.id === selectedVariant?.color?.id
  //   );
  //   if (variant) {
  //     setSelectedVariant(variant);
  //   }
  // };

  const handleSizeChange = (size) => {
    // Try to find variant with same color first
    let variant = product.variants.find(v => 
      v.size?.id === size.id && v.color?.id === selectedVariant?.color?.id
    );
    
    // If not found with same color, get first variant with this size
    if (!variant) {
      variant = product.variants.find(v => v.size?.id === size.id);
    }
    
    if (variant) {
      setSelectedVariant(variant);
    }
  };

  const handleAddToCart = () => {
    console.log('Adding to cart:', { product, variant: selectedVariant, quantity });
    // Add your cart logic here
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="product-profile bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row g-4">
          {/* Image Gallery */}
          <div className="col-lg-6">
            <div className="image-gallery">
              {/* Main Image */}
              <div className="main-image-container position-relative">
                <img
                  src={product.images[selectedImageIndex]?.image_url}
                  alt={product.nameEn}
                  className="main-image rounded-3"
                />
                
                {/* Badges */}
                <div className="position-absolute top-0 start-0 m-3">
                  {hasDiscount && (
                    <span className="badge bg-danger badge-lg me-2">-{discountPercentage}%</span>
                  )}
                  {product.isTopSeller && (
                    <span className="badge bg-warning text-dark badge-lg">TOP SELLER</span>
                  )}
                </div>

                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button 
                      className="btn btn-light btn-sm position-absolute top-50 start-0 translate-middle-y ms-2 rounded-circle"
                      onClick={prevImage}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      className="btn btn-light btn-sm position-absolute top-50 end-0 translate-middle-y me-2 rounded-circle"
                      onClick={nextImage}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="thumbnails d-flex gap-2 mt-3">
                  {product.images.map((img, index) => (
                    <div
                      key={img.id}
                      className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img src={img.image_url} alt={`${product.nameEn} ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="col-lg-6">
            <div className="product-profile-details">

              {/* Price */}
              <div className="price-section mb-4">
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <h2 className="current-price mb-0">EGP {currentPrice.toFixed(2)}</h2>
                  {hasDiscount && (
                    <>
                      <h4 className="original-price mb-0 text-decoration-line-through text-muted">
                        EGP {originalPrice.toFixed(2)}
                      </h4>
                      <span className="badge bg-success">Save EGP {(originalPrice - currentPrice).toFixed(2)}</span>
                    </>
                  )}
                </div>
                {hasDiscount && selectedVariant?.priceEndDate && (
                  <p className="text-danger small mb-0 mt-2">
                    Offer ends: {new Date(selectedVariant.priceEndDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Brand */}
              {product.brand && (
                <div className="brand-section mb-3">
                  <img 
                    src={product.brand.imageUrl} 
                    alt={product.brand.nameEn}
                    className="brand-image"
                  />
                </div>
              )}

              {/* Title */}
              <h1 className="product-profile-title mb-2">{product.nameEn}</h1>
              
              {/* Category */}
              <p className="text-muted mb-3">
                {product.collection?.nameEn} / {product.category?.nameEn} / {product.subCategory?.nameEn}
              </p>



              {/* Stock Status */}
              {/* <div className="stock-status mb-4">
                {selectedVariant?.stockStatus === "In Stock" ? (
                  <div className="d-flex align-items-center gap-2 text-success">
                    <Check size={20} />
                    <span className="fw-semibold">In Stock ({selectedVariant.availableQuantity} available)</span>
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-2 text-danger">
                    <span className="fw-semibold">Out of Stock</span>
                  </div>
                )}
                {selectedVariant?.sku && (
                  <p className="text-muted small mb-0">SKU: {selectedVariant.sku}</p>
                )}
              </div> */}

              {/* Color Selection */}
              {availableColors.length > 0 && (
                <div className="variant-section my-4">
                  <h6 className="mb-3">
                    Color: <span className="fw-normal">{selectedVariant?.color?.nameEn}</span>
                  </h6>
                  <div className="d-flex gap-2 flex-wrap">
                    {availableColors.map((color) => (
                      <div
                        key={color.id}
                        className={`color-selector ${selectedVariant?.color?.id === color.id ? 'selected' : ''}`}
                        style={{ backgroundColor: color.hexCode }}
                        onClick={() => handleColorChange(color)}
                        title={color.nameEn}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {availableSizes.length > 0 && (
                <div className="variant-section mb-4">
                  <h6 className="mb-3 ">
                    Size: <span className="fw-normal">{selectedVariant?.size?.nameEn}</span>
                  </h6>
                  <div className="d-flex gap-2 flex-wrap">
                    {availableSizes.map((size) => (
                      <button
                        key={size.id}
                        className={`btn size-selector ${selectedVariant?.size?.id === size.id ? 'selected' : ''}`}
                        onClick={() => handleSizeChange(size)}
                      >
                        {size.nameEn}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="quantity-section mb-4">
                <h6 className="mb-3">Quantity</h6>
                <div className="d-flex align-items-center justify-content-start gap-3">
                  <div className="quantity-controls d-flex align-items-center border rounded">
                    <button 
                      className="btn btn-sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <input 
                      type="text"
                      disabled 
                      className="form-control text-center border-0"
                      style={{ width: '60px' }}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      max={selectedVariant?.availableQuantity || 1}
                    />
                    <button 
                      className="btn btn-sm"
                      onClick={() => setQuantity(Math.min(selectedVariant?.availableQuantity || 1, quantity + 1))}
                    >
                      +
                    </button>
                  </div>
                  {/* <span className="text-muted small">
                    Max: {selectedVariant?.availableQuantity || 0}
                  </span> */}
                </div>
              </div>

              {/* Description Section */}
              <div className="row my-3">
                <div className="col-12">
                  <div className="description-card">
                    <div className="p-4">
                      <h4 className="mb-4 text-start">Description:</h4>
                      <p className="text-muted">{product.descriptionEn}</p>
                    </div>
                  </div>
                </div>
              </div>
              

              {/* Action Buttons */}
              <div className="action-buttons d-flex gap-3 mb-4">
                <button 
                  className="btn btn-primary flex-grow-1 btn-lg"
                  onClick={handleAddToCart}
                  disabled={selectedVariant?.stockStatus !== "In Stock"}
                >
                  <ShoppingCart size={20} className="me-2" />
                  Add to Cart
                </button>
                <button 
                  className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-danger'} btn-lg`}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
                <button className="btn btn-outline-secondary btn-lg">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Features */}
              <div className="features-section">
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="feature-card text-center p-3">
                      <Truck size={32} className="text-primary mb-2" />
                      <p className="small mb-0 fw-semibold">Free Delivery</p>
                      <p className="small text-muted mb-0">On orders over EGP 500</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="feature-card text-center p-3">
                      <Package size={32} className="text-primary mb-2" />
                      <p className="small mb-0 fw-semibold">Easy Returns</p>
                      <p className="small text-muted mb-0">30-day return policy</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="feature-card text-center p-3">
                      <Shield size={32} className="text-primary mb-2" />
                      <p className="small mb-0 fw-semibold">Secure Payment</p>
                      <p className="small text-muted mb-0">100% secure</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductProfile;