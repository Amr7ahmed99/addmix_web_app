// import { useState, useEffect, useMemo } from 'react';
// import { Filter, X, ChevronDown, ChevronUp, Search, Loader } from 'lucide-react';
// import './ProductsCollectionList.scss';
// import ProductsApiService from '../../services/ProductsApiService';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { getLanguage } from '../../utils/Helper';

// const ProductsCollectionList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [colorsAndSizes, setColorsAndSizes]= useState(null);
//   const lang= getLanguage();

//   // load Collections here
//   const { collectionName, categoryName } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const authContext = useAuth();

//   const queryParams = new URLSearchParams(location.search);
//   const subCategoriesParams = queryParams.get("sub_cat") ? queryParams.get("sub_cat").split(",") : [];

//   const [currentCollection, setCurrentCollection] = useState(null);
//   const [activeCategory, setActiveCategory] = useState(null);
  
//   // Pagination state
//   const [pagination, setPagination] = useState({
//     currentPage: 0,
//     pageSize: 10,
//     totalCount: 0,
//     totalPages: 0
//   });

//   // Filters state
//   const [filters, setFilters] = useState({
//     collectionId: currentCollection?.id,
//     categoryIds: [],
//     subCategoryIds: [],
//     brandIds: [],
//     colorIds: [],
//     sizeIds: [],
//     minPrice: null,
//     maxPrice: null,
//     search: '',
//     isNew: null,
//     isTrend: null,
//     isTopSeller: null,
//     sortBy: 'newest'
//   });

//   const [showFilters, setShowFilters] = useState(true);
//   const [expandedSections, setExpandedSections] = useState({
//     category: true,
//     subCategory: true,
//     brand: true,
//     color: true,
//     size: true,
//     status: true
//   });

//   // Filter options extracted from current collection
//   const filterOptions = useMemo(() => {
//     // const [currCollectionId, currCategoryId, currSubCategoryIds] = loadCollectionsData();
//     // console.log(currCollectionId , currCategoryId);

//     // incase the filters still in loading
//     if(!currentCollection || !colorsAndSizes) return {
//       categories: [],
//       subCategories: [],
//       brands: [],
//       colors: [],
//       sizes: []
//     };

//     const categories = new Map();
//     const subCategories = new Map();
//     const brands = new Map();
//     const colors = new Map();
//     const sizes = new Map();

//     currentCollection?.categories.forEach(cat => {
//       if (cat) categories.set(cat?.id, {...cat, nameEn: cat.name_url});
//       cat?.sub_categories.forEach(sub => {
//         if(sub) subCategories.set(sub?.id, {...sub, nameEn: sub.name_url});
//       });
//     });

//     currentCollection?.top_brands.forEach(brand => {
//       if (brand){
//         brands.set(brand?.id, {...brand, nameEn: brand.name_url});
//       }
//     })

//     colorsAndSizes?.colors.forEach(color => {
//         if(color) colors.set(color.id, color);
//     });

//     colorsAndSizes?.sizes.forEach(size => {
//         if(size) sizes.set(size.id, size);
//     });

//     return {
//       categories: Array.from(categories.values()),
//       subCategories: Array.from(subCategories.values()),
//       brands: Array.from(brands.values()),
//       colors: Array.from(colors.values()),
//       sizes: Array.from(sizes.values())
//     };
//   }, [currentCollection, colorsAndSizes]);


//   // Fetch products from backend
//   const fetchProducts = async () => {
//     if(!currentCollection || !colorsAndSizes) return;

//     try {
//       setLoading(true);
//       setError(null);
//       const queryParams = new URLSearchParams();
//       queryParams.append('page', pagination.currentPage);
//       queryParams.append('limit', pagination.pageSize);
      
//       queryParams.append('collectionId', currentCollection?.id);
//       if (filters.categoryIds.length) filters.categoryIds.forEach(id => queryParams.append('categoryIds', id));
//       if (filters.subCategoryIds.length) filters.subCategoryIds.forEach(id => queryParams.append('subCategoryIds', id));
//       if (filters.brandIds.length) filters.brandIds.forEach(id => queryParams.append('brandIds', id));
//       if (filters.colorIds.length) filters.colorIds.forEach(id => queryParams.append('colorIds', id));
//       if (filters.sizeIds.length) filters.sizeIds.forEach(id => queryParams.append('sizeIds', id));
//       if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
//       if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
//       if (filters.search) queryParams.append('search', filters.search);
//       if (filters.isNew !== null) queryParams.append('isNew', filters.isNew);
//       if (filters.isTrend !== null) queryParams.append('isTrend', filters.isTrend);
//       if (filters.isTopSeller !== null) queryParams.append('isTopSeller', filters.isTopSeller);
//       queryParams.append('sortBy', filters.sortBy);

//       const response = await ProductsApiService.getProductsListWithFilters(queryParams);
//       setProducts(response.products || []);
//       setPagination({
//         currentPage: response.currentPage,
//         pageSize: response.pageSize,
//         totalCount: response.totalCount,
//         totalPages: response.totalPages
//       });
//     } catch (err) {
//       setError(err.message);
//       setPagination({
//         currentPage: 0,
//         pageSize: 10,
//         totalCount: 0,
//         totalPages: 0
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // function loadCollectionsData(){
//   //   if (!authContext?.systemCollections?.length) return;

//   //   const collection = authContext.systemCollections.find(col =>
//   //     col.name_url.toLowerCase() === collectionName.split("-").join(" ").toLowerCase()
//   //   );
//   //   if (!collection) return;

//   //   setCurrentCollection(collection);

//   //   let filters = { collectionId: collection.id };
//   //   if (categoryName) {
//   //     const category = collection.categories.find(cat =>
//   //       cat.name_url.toLowerCase() === categoryName.split("-").join(" ").toLowerCase()
//   //     );
//   //     setActiveCategory(category);

//   //     const selectedSubIds = category?.sub_categories
//   //       .filter(subCat =>
//   //         subCategoriesParams.some(name =>
//   //           subCat.name_url.toLowerCase() === name.split("-").join(" ").toLowerCase()
//   //         )
//   //       )
//   //       .map(sub => sub.id) || [];

//   //     filters = { ...filters, categoryId: category.id, subCategoryIds: selectedSubIds };

//   //   }
    
//   //   return filters;
//   // }

//     // ----------------- Load Collection & Category -----------------
  
//   // function loadCollectionsData(){
//   //   if (!authContext?.systemCollections?.length) return;

//   //   const collection = authContext.systemCollections.find(col =>
//   //     col.name_url.toLowerCase() === collectionName.split("-").join(" ").toLowerCase()
//   //   );
//   //   if (!collection) return;

//   //   setCurrentCollection(collection);

//   //   if (categoryName) {
//   //     const category = collection.categories.find(cat =>
//   //       cat.name_url.toLowerCase() === categoryName.split("-").join(" ").toLowerCase()
//   //     );
//   //     setActiveCategory(category);

//   //     const selectedSubIds = category?.sub_categories
//   //       .filter(subCat =>
//   //         subCategoriesParams.some(name =>
//   //           subCat.name_url.toLowerCase() === name.split("-").join(" ").toLowerCase()
//   //         )
//   //       )
//   //       .map(sub => sub.id) || [];

//   //     // Update filters state with category and subcategory
//   //     setFilters(prev => ({
//   //       ...prev,
//   //       collectionId: collection.id,
//   //       categoryIds: category ? [category.id] : [],
//   //       subCategoryIds: selectedSubIds
//   //     }));
//   //   } else {
//   //     setFilters(prev => ({
//   //       ...prev,
//   //       collectionId: collection.id
//   //     }));
//   //   }
//   // }
  
//   // ----------------- Load Collection & Category -----------------
//   function loadCollectionsData(){
//     if (!authContext?.systemCollections?.length) return;

//     const collection = authContext.systemCollections.find(col =>
//       col.name_url.toLowerCase() === collectionName.split("-").join(" ").toLowerCase()
//     );
//     if (!collection) return;

//     setCurrentCollection(collection);

//     if (categoryName) {
//       const category = collection.categories.find(cat =>
//         cat.name_url.toLowerCase() === categoryName.split("-").join(" ").toLowerCase()
//       );
//       setActiveCategory(category);

//       const selectedSubIds = category?.sub_categories
//         .filter(subCat =>
//           subCategoriesParams.some(name =>
//             subCat.name_url.toLowerCase() === name.split("-").join(" ").toLowerCase()
//           )
//         )
//         .map(sub => sub.id) || [];

//       // Update filters state with category and subcategory
//       setFilters(prev => ({
//         ...prev,
//         collectionId: collection.id,
//         categoryIds: category ? [category.id] : [],
//         subCategoryIds: selectedSubIds
//       }));
//     } else {
//       setFilters(prev => ({
//         ...prev,
//         collectionId: collection.id
//       }));
//     }
//   }

//   async function fetchColorsAndSizes(){
//     try{
//       if(colorsAndSizes !== null || colorsAndSizes?.colors || colorsAndSizes?.sizes) return;
//       const response = await ProductsApiService.getAllColorsAndSizes();
//       setColorsAndSizes(response)
//     }catch(err){
//         console.error('Error fetching colors and sizes:', err);
//     }
//   }

//   useEffect(() => {
//     if(currentCollection && colorsAndSizes && pagination?.currentPage !== null){
//       fetchProducts();
//     }
//   }, [pagination.currentPage, currentCollection, colorsAndSizes]);

//   useEffect(()=>{
//     if(authContext?.systemCollections?.length > 0){
//       loadCollectionsData();
//     }
//   }, [authContext])

//   useEffect(()=>{
//     if (currentCollection){
//         fetchColorsAndSizes()
//     }
//   }, currentCollection)

//   // Trigger search after typing stops
//   useEffect(() => {
//     const debounceTimer = setTimeout(() => {
//       if (pagination.currentPage === 0) {
//         fetchProducts();
//       } else {
//         setPagination(prev => ({ ...prev, currentPage: 0 }));
//       }
//     }, 1000);

//     return () => clearTimeout(debounceTimer);
//   }, [filters]);

//   const toggleFilter = (filterType, id) => {
//     setFilters(prev => ({
//       ...prev,
//       [filterType]: prev[filterType].includes(id)
//         ? prev[filterType].filter(item => item !== id)
//         : [...prev[filterType], id]
//     }));
//   };

//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
//   };

//   const toggleStatusFilter = (statusType) => {
//     setFilters(prev => ({
//       ...prev,
//       [statusType]: prev[statusType] ? null : true
//     }));
//   };

//   const clearAllFilters = () => {
//     setFilters({
//       categoryIds: [],
//       subCategoryIds: [],
//       brandIds: [],
//       colorIds: [],
//       sizeIds: [],
//       minPrice: null,
//       maxPrice: null,
//       search: '',
//       isNew: null,
//       isTrend: null,
//       isTopSeller: null,
//       sortBy: 'newest'
//     });
//   };

//   const activeFiltersCount = 
//     filters.categoryIds.length + 
//     filters.subCategoryIds.length + 
//     filters.brandIds.length +
//     filters.colorIds.length + 
//     filters.sizeIds.length +
//     (filters.isNew ? 1 : 0) +
//     (filters.isTrend ? 1 : 0) +
//     (filters.isTopSeller ? 1 : 0);

//     const openProductProfile= (pro)=>{
//       const collectionName= pro.collection.nameEn.toString().toLowerCase().split(" ").join("-")
//       const catName= pro.category.nameEn.toString().toLowerCase().split(" ").join("-")
//       const subCatName= pro.subCategory.nameEn.toString().toLowerCase().split(" ").join("-")
//       navigate(`/collection/${collectionName}/${catName}/${subCatName}/${pro.id}`);
//     }

//   return (
//     <div className="bg-light min-vh-100 pb-4">
//       <div className="container-fluid py-3 px-lg-5">
//         {/* Header */}
//         {/* <div className="mb-4">
//           <h1 className="display-5 fw-bold mb-2">Products</h1>
//           <p className="text-muted">
//             Showing {products?.length} of {pagination.totalCount} products
//           </p>
//         </div> */}

//         <div
//           className="col-12 mb-4"
//           // style={{ backgroundImage: `url("${currentCollection?.image_url}")` }}
//         >
//           <img src={currentCollection?.image_url} alt="" className='collection-image-section'/>
//         </div>

//         {/* Search Bar */}
//         {/* <div className="mb-4">
//           <div className="position-relative" style={{ maxWidth: '500px' }}>
//             <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={20} />
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="form-control ps-5 py-2"
//               value={filters.search}
//               onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
//             />
//           </div>
//         </div> */}

//         <div className="row g-4">
//           {/* Filters Sidebar */}
//           {showFilters && (
//             <div className="col-lg-3">
//               <div className="card shadow-sm filters-sidebar">
//                 <div className="card-body">
//                   <div className="d-flex align-items-center justify-content-between mb-4">
//                     <div className="d-flex align-items-center gap-2">
//                       <Filter size={20} className="text-primary" />
//                       <h5 className="mb-0 fw-bold">Filters</h5>
//                       {activeFiltersCount > 0 && (
//                         <span className="badge bg-primary rounded-pill">{activeFiltersCount}</span>
//                       )}
//                     </div>
//                     {activeFiltersCount > 0 && (
//                       <button onClick={clearAllFilters} className="btn btn-sm btn-link text-primary text-decoration-none p-0">
//                         Clear all
//                       </button>
//                     )}
//                   </div>

//                   {/* Status Filter */}
//                   <div className="filter-section border-bottom pb-3 mb-3">
//                     <button
//                       onClick={() => toggleSection('status')}
//                       className="btn btn-link text-decoration-none text-dark w-100 d-flex justify-content-between align-items-center p-0 mb-2"
//                     >
//                       <h6 className="mb-0 fw-semibold">{lang === "EN"? "Status": "حالة المنتج"}</h6>
//                       {expandedSections.status ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                     </button>
//                     {expandedSections.status && (
//                       <div className="filter-collapse">
//                         <div className="form-check mb-2">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             id="status-new"
//                             checked={filters.isNew === true}
//                             onChange={() => toggleStatusFilter('isNew')}
//                           />
//                           <label className="form-check-label" htmlFor="status-new">
//                             {lang==="EN"? "NEW ARRIVAL": "جديد"}
//                           </label>
//                         </div>
//                         <div className="form-check mb-2">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             id="status-trend"
//                             checked={filters.isTrend === true}
//                             onChange={() => toggleStatusFilter('isTrend')}
//                           />
//                           <label className="form-check-label" htmlFor="status-trend">
//                             {lang==="EN"? "TRENDING": "ترندات"}                            
//                           </label>
//                         </div>
//                         <div className="form-check mb-2">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             id="status-topseller"
//                             checked={filters.isTopSeller === true}
//                             onChange={() => toggleStatusFilter('isTopSeller')}
//                           />
//                           <label className="form-check-label" htmlFor="status-topseller">
//                             {lang==="EN"? "TOP SELLER": "أكثر مبيعا"}
//                           </label>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Category Filter */}
//                   {filterOptions.categories.length > 0 && (
//                     <div className="filter-section border-bottom pb-3 mb-3">
//                       <button
//                         onClick={() => toggleSection('category')}
//                         className="btn btn-link text-decoration-none text-dark w-100 d-flex justify-content-between align-items-center p-0 mb-2"
//                       >
//                       <h6 className="mb-0 fw-semibold">{lang === "EN"? "Category": "قسم"}</h6>
//                         {expandedSections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                       </button>
//                       {expandedSections.category && (
//                         <div className="filter-collapse">
//                           {filterOptions.categories.map(category => (
//                             <div key={category.id} className="form-check mb-2">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 id={`category-${category.id}`}
//                                 checked={
//                                   activeCategory? filters.categoryIds.includes(category.id): filters.categoryIds.includes(category.id) 
//                                 }
//                                 onChange={() => toggleFilter('categoryIds', category.id)}
//                               />
//                               <label className="form-check-label" htmlFor={`category-${category.id}`}>
//                                 {category.name}
//                               </label>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   )}

//                   {/* SubCategory Filter */}
//                   {filterOptions.subCategories.length > 0 && (
//                     <div className="filter-section border-bottom pb-3 mb-3">
//                       <button
//                         onClick={() => toggleSection('subCategory')}
//                         className="btn btn-link text-decoration-none text-dark w-100 d-flex justify-content-between align-items-center p-0 mb-2"
//                       >
//                       <h6 className="mb-0 fw-semibold">{lang === "EN"? "Sub Category": "فئة"}</h6>
//                         {expandedSections.subCategory ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                       </button>
//                       {expandedSections.subCategory && (
//                         <div className="filter-collapse">
//                           {filterOptions.subCategories.map(subCategory => (
//                             <div key={subCategory.id} className="form-check mb-2">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 id={`subCategory-${subCategory.id}`}
//                                 checked={filters.subCategoryIds.includes(subCategory.id)}
//                                 onChange={() => toggleFilter('subCategoryIds', subCategory.id)}
//                               />
//                               <label className="form-check-label" htmlFor={`subCategory-${subCategory.id}`}>
//                                 {subCategory.name}
//                               </label>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   )}

//                   {/* Brand Filter */}
//                   {filterOptions.brands.length > 0 && (
//                     <div className="filter-section border-bottom pb-3 mb-3">
//                       <button
//                         onClick={() => toggleSection('brand')}
//                         className="btn btn-link text-decoration-none text-dark w-100 d-flex justify-content-between align-items-center p-0 mb-2"
//                       >
//                       <h6 className="mb-0 fw-semibold">{lang === "EN"? "Brand": "مركة"}</h6>
//                         {expandedSections.brand ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                       </button>
//                       {expandedSections.brand && (
//                         <div className="filter-collapse">
//                           {filterOptions.brands.map(brand => (
//                             <div key={brand.id} className="form-check mb-2">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 id={`brand-${brand.id}`}
//                                 checked={filters.brandIds.includes(brand.id)}
//                                 onChange={() => toggleFilter('brandIds', brand.id)}
//                               />
//                               <label className="form-check-label" htmlFor={`brand-${brand.id}`}>
//                                 {brand.nameEn}
//                               </label>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   )}

//                   {/* Color Filter */}
//                   {filterOptions.colors.length > 0 && (
//                     <div className="filter-section border-bottom pb-3 mb-3">
//                       <button
//                         onClick={() => toggleSection('color')}
//                         className="btn btn-link text-decoration-none text-dark w-100 d-flex justify-content-between align-items-center p-0 mb-2"
//                       >
//                       <h6 className="mb-0 fw-semibold">{lang === "EN"? "Color": "لون"}</h6>
//                         {expandedSections.color ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                       </button>
//                       {expandedSections.color && (
//                         <div className="filter-collapse d-flex flex-wrap gap-2">
//                           {filterOptions.colors.map(color => (
//                             <div
//                               key={color.id}
//                               className={`color-option ${filters.colorIds.includes(color.id) ? 'selected' : ''}`}
//                               style={{ backgroundColor: color.hexCode }}
//                               onClick={() => toggleFilter('colorIds', color.id)}
//                               title={color.nameEn || 'Color'}
//                             />
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   )}

//                   {/* Size Filter */}
//                   {filterOptions.sizes.length > 0 && (
//                     <div className="filter-section">
//                       <button
//                         onClick={() => toggleSection('size')}
//                         className="btn btn-link text-decoration-none text-dark w-100 d-flex justify-content-between align-items-center p-0 mb-2"
//                       >
//                       <h6 className="mb-0 fw-semibold">{lang === "EN"? "Size": "مقاس"}</h6>
//                         {expandedSections.size ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                       </button>
//                       {expandedSections.size && (
//                         <div className="filter-collapse d-flex flex-wrap gap-2">
//                           {filterOptions.sizes.map(size => (
//                             <div
//                               key={size.id}
//                               className={`size-option ${filters.sizeIds.includes(size.id) ? 'selected' : ''}`}
//                               onClick={() => toggleFilter('sizeIds', size.id)}
//                             >
//                               {size.nameEn}
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Products Grid */}
//           <div className={showFilters ? 'col-lg-9' : 'col-12'}>
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="btn btn-outline-primary d-lg-none mb-3"
//             >
//               <Filter size={16} className="me-2" />
//               {showFilters ? 'Hide' : 'Show'} Filters
//             </button>

//             {/* Sort Dropdown */}
//             <div className="d-flex justify-content-end mb-3">
//               <select 
//                 className="form-select w-auto"
//                 value={filters.sortBy}
//                 onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
//               >
//                 <option value="newest">Newest First</option>
//                 <option value="oldest">Oldest First</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//                 <option value="name-asc">Name: A to Z</option>
//                 <option value="name-desc">Name: Z to A</option>
//               </select>
//             </div>

//             {loading ? (
//               <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
//                 <Loader className="loader-spin" size={48} style={{ animation: 'spin 1s linear infinite' }} />
//               </div>
//             ) : products?.length === 0 ? (
//               <div className="text-center py-5 empty-state">
//                 <X size={64} className="text-muted mb-3" />
//                 <h3 className="fw-bold mb-2">{lang === "EN"? "No products found": "لا يتوفر منتجات"}</h3>
//                 <p className="text-muted mb-4">{lang === "EN"? "Try adjusting your filters": "يمكنك البحث عن منتجات أخري"}</p>
//                 <button onClick={clearAllFilters} className="btn btn-primary">
//                   {lang === "EN"? "Clear all filters": "أمسح الفلتر"}
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <div className="row g-4">
//                   {products?.map((product, index) => {
//                     const minPrice = product?.variants? 
//                       Math.min(...product?.variants?.map(v => v.discountPrice || v.price)): 0;
//                     const maxPrice = product?.variants?
//                       Math.max(...product?.variants?.map(v => v.price)): 0;
//                     const hasDiscount = product?.variants?
//                       product?.variants?.some(v => v.discountPrice): 0;
//                     const availableColors = product?.variants?
//                       [...new Set(product?.variants?.map(v => v.color?.hexCode).filter(Boolean))]: [];

//                     // return(<p>sss</p>);
//                     return (
//                       <div key={product?.id} className="col-md-6 col-xl-4">
//                         <div 
//                           className="card product-card h-100 shadow-sm border-0"
//                           style={{ animationDelay: `${index * 0.1}s` }}
//                         >
//                           <div className="product-image-wrapper">
//                             <img
//                               src={product?.primaryImageUrl || 'https://via.placeholder.com/400'}
//                               alt={product?.nameEn}
//                               className="product-image"
//                             />
                            
//                             {/* Brand Badge */}
//                             {product?.brand?.imageUrl && (
//                               <div className="brand-badge">
//                                 <img 
//                                   src={product?.brand?.imageUrl} 
//                                   alt={product?.brand?.nameEn}
//                                   className="brand-logo"
//                                 />
//                               </div>
//                             )}

//                             {/* Status Badges */}
//                             <div className="badge-overlay">
//                               {product?.isNew && (
//                                 <span className="badge bg-success badge-tag">{lang==="EN"? "NEW": "جديد"}</span>
//                               )}
//                               {product?.isTrend && (
//                                 <span className="badge badge-tag" style={{backgroundColor: '#6f42c1', color: 'white'}}> {lang==="EN"? "TRENDING": "ترند"}</span>
//                               )}
//                               {product?.isTopSeller && (
//                                 <span className="badge bg-warning text-dark badge-tag"> {lang==="EN"? "TOP SELLER": "أكثر مبيعا"}</span>
//                               )}
//                             </div>

//                             {/* Sale Badge */}
//                             {hasDiscount && (
//                               <span className="badge bg-danger sale-badge badge-tag">{lang==="EN"? "SALE": "تخفيض"}</span>
//                             )}
//                           </div>

//                           <div className="card-body">
//                             <p className="text-muted small mb-1">{product?.brand?.nameEn}</p>
//                             <h5 className="card-title fw-bold mb-2 text-truncate">{lang === "EN"? product?.nameEn: product?.nameAr}</h5>
//                             <p className="card-text text-muted small mb-3 text-truncate-2">
//                               {lang === "EN"? product?.descriptionEn: product?.descriptionAr}
//                             </p>

//                             {/* Colors */}
//                             {availableColors.length > 0 && (
//                               <div className="d-flex align-items-center gap-2 mb-3">
//                                 {availableColors.slice(0, 5).map((color, i) => (
//                                   <div
//                                     key={i}
//                                     style={{
//                                       width: '24px',
//                                       height: '24px',
//                                       borderRadius: '50%',
//                                       backgroundColor: color,
//                                       border: '2px solid #dee2e6'
//                                     }}
//                                   />
//                                 ))}
//                                 {availableColors.length > 5 && (
//                                   <span className="text-muted small">+{availableColors.length - 5}</span>
//                                 )}
//                               </div>
//                             )}

//                             {/* Price */}
//                             <div className="d-flex align-items-center gap-2 mb-3">
//                               <span className="price-badge">EGP {minPrice.toFixed(0)}</span>
//                               {hasDiscount && (
//                                 <span className="original-price">EGP {maxPrice.toFixed(0)}</span>
//                               )}
//                             </div>

//                             <button 
//                               onClick={()=> openProductProfile(product)}
//                               className="btn w-100 view-details-btn text-light"
//                             >
//                               {lang === "EN"? "View Details": "تفاصيل المنتج"}
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {/* Pagination */}
//                 {pagination.totalPages > 1 && (
//                   <nav className="mt-5">
//                     <ul className="pagination justify-content-center">
//                       <li className={`page-item ${pagination.currentPage === 0 ? 'disabled' : ''}`}>
//                         <button 
//                           className="page-link" 
//                           onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
//                           disabled={pagination.currentPage === 0}
//                         >
//                           Previous
//                         </button>
//                       </li>
                      
//                       {[...Array(pagination.totalPages)].map((_, i) => (
//                         <li key={i} className={`page-item ${pagination.currentPage === i ? 'active' : ''}`}>
//                           <button 
//                             className="page-link"
//                             onClick={() => setPagination(prev => ({ ...prev, currentPage: i }))}
//                           >
//                             {i + 1}
//                           </button>
//                         </li>
//                       ))}
                      
//                       <li className={`page-item ${pagination.currentPage >= pagination.totalPages - 1 ? 'disabled' : ''}`}>
//                         <button 
//                           className="page-link"
//                           onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
//                           disabled={pagination.currentPage >= pagination.totalPages - 1}
//                         >
//                           Next
//                         </button>
//                       </li>
//                     </ul>
//                   </nav>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsCollectionList;


import { useState, useEffect, useMemo } from 'react';
import { Filter, X, ChevronDown, ChevronUp, Search, Loader } from 'lucide-react';
import './ProductsCollectionList.scss';
import ProductsApiService from '../../services/ProductsApiService';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getLanguage } from '../../utils/Helper';

const ProductsCollectionList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [colorsAndSizes, setColorsAndSizes]= useState(null);
  const lang= getLanguage();

  const { collectionName, categoryName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const authContext = useAuth();

  const queryParams = new URLSearchParams(location.search);
  const subCategoriesParams = queryParams.get("sub_cat") ? queryParams.get("sub_cat").split(",") : [];

  const [currentCollection, setCurrentCollection] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  
  const [pagination, setPagination] = useState({
    currentPage: 0,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0
  });

  const [filters, setFilters] = useState({
    collectionId: currentCollection?.id,
    categoryIds: [],
    subCategoryIds: [],
    brandIds: [],
    colorIds: [],
    sizeIds: [],
    minPrice: null,
    maxPrice: null,
    search: '',
    isNew: null,
    isTrend: null,
    isTopSeller: null,
    sortBy: 'newest'
  });

  const [showFilters, setShowFilters] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    subCategory: true,
    brand: true,
    color: true,
    size: true,
    status: true
  });

  const filterOptions = useMemo(() => {
    if(!currentCollection || !colorsAndSizes) return {
      categories: [],
      subCategories: [],
      brands: [],
      colors: [],
      sizes: []
    };

    const categories = new Map();
    const subCategories = new Map();
    const brands = new Map();
    const colors = new Map();
    const sizes = new Map();

    currentCollection?.categories.forEach(cat => {
      if (cat) categories.set(cat?.id, {...cat, nameEn: cat.name_url});
      cat?.sub_categories.forEach(sub => {
        if(sub) subCategories.set(sub?.id, {...sub, nameEn: sub.name_url, categoryId: cat.id});
      });
    });

    currentCollection?.top_brands.forEach(brand => {
      if (brand){
        brands.set(brand?.id, {...brand, nameEn: brand.name_url});
      }
    })

    colorsAndSizes?.colors.forEach(color => {
        if(color) colors.set(color.id, color);
    });

    colorsAndSizes?.sizes.forEach(size => {
        if(size) sizes.set(size.id, size);
    });

    let filteredSubCategories = Array.from(subCategories.values());
    if (filters.categoryIds.length > 0) {
      filteredSubCategories = filteredSubCategories.filter(sub => 
        filters.categoryIds.includes(sub.categoryId)
      );
    }

    return {
      categories: Array.from(categories.values()),
      subCategories: filteredSubCategories,
      brands: Array.from(brands.values()),
      colors: Array.from(colors.values()),
      sizes: Array.from(sizes.values())
    };
  }, [currentCollection, colorsAndSizes, filters.categoryIds]);

  const fetchProducts = async () => {
    if(!currentCollection || !colorsAndSizes) return;

    try {
      setLoading(true);
      setError(null);
      const queryParams = new URLSearchParams();
      queryParams.append('page', pagination.currentPage);
      queryParams.append('limit', pagination.pageSize);
      
      queryParams.append('collectionId', currentCollection?.id);
      if (filters.categoryIds.length) filters.categoryIds.forEach(id => queryParams.append('categoryIds', id));
      if (filters.subCategoryIds.length) filters.subCategoryIds.forEach(id => queryParams.append('subCategoryIds', id));
      if (filters.brandIds.length) filters.brandIds.forEach(id => queryParams.append('brandIds', id));
      if (filters.colorIds.length) filters.colorIds.forEach(id => queryParams.append('colorIds', id));
      if (filters.sizeIds.length) filters.sizeIds.forEach(id => queryParams.append('sizeIds', id));
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.isNew !== null) queryParams.append('isNew', filters.isNew);
      if (filters.isTrend !== null) queryParams.append('isTrend', filters.isTrend);
      if (filters.isTopSeller !== null) queryParams.append('isTopSeller', filters.isTopSeller);
      queryParams.append('sortBy', filters.sortBy);

      const response = await ProductsApiService.getProductsListWithFilters(queryParams);
      setProducts(response.products || []);
      setPagination({
        currentPage: response.currentPage,
        pageSize: response.pageSize,
        totalCount: response.totalCount,
        totalPages: response.totalPages
      });
    } catch (err) {
      setError(err.message);
      setPagination({
        currentPage: 0,
        pageSize: 10,
        totalCount: 0,
        totalPages: 0
      });
    } finally {
      setLoading(false);
    }
  };

  function loadCollectionsData(){
    if (!authContext?.systemCollections?.length) return;

    const collection = authContext.systemCollections.find(col =>
      col.name_url.toLowerCase() === collectionName.split("-").join(" ").toLowerCase()
    );
    if (!collection) return;

    setCurrentCollection(collection);

    if (categoryName) {
      const category = collection.categories.find(cat =>
        cat.name_url.toLowerCase() === categoryName.split("-").join(" ").toLowerCase()
      );
      setActiveCategory(category);

      const selectedSubIds = category?.sub_categories
        .filter(subCat =>
          subCategoriesParams.some(name =>
            subCat.name_url.toLowerCase() === name.split("-").join(" ").toLowerCase()
          )
        )
        .map(sub => sub.id) || [];

      setFilters(prev => ({
        ...prev,
        collectionId: collection.id,
        categoryIds: category ? [category.id] : [],
        subCategoryIds: selectedSubIds
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        collectionId: collection.id
      }));
    }
  }
  
  async function fetchColorsAndSizes(){
    try{
      if(colorsAndSizes !== null || colorsAndSizes?.colors || colorsAndSizes?.sizes) return;
      const response = await ProductsApiService.getAllColorsAndSizes();
      setColorsAndSizes(response)
    }catch(err){
        console.error('Error fetching colors and sizes:', err);
    }
  }

  useEffect(() => {
    if(currentCollection && colorsAndSizes && pagination?.currentPage !== null){
      fetchProducts();
    }
  }, [pagination.currentPage, currentCollection, colorsAndSizes]);

  useEffect(()=>{
    if(authContext?.systemCollections?.length > 0){
      loadCollectionsData();
    }
  }, [authContext])

  useEffect(()=>{
    if (currentCollection){
        fetchColorsAndSizes()
    }
  }, currentCollection)

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (pagination.currentPage === 0) {
        fetchProducts();
      } else {
        setPagination(prev => ({ ...prev, currentPage: 0 }));
      }
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [filters]);

  const toggleFilter = (filterType, id) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [filterType]: prev[filterType].includes(id)
          ? prev[filterType].filter(item => item !== id)
          : [...prev[filterType], id]
      };

      if (filterType === 'categoryIds' && prev[filterType].includes(id)) {
        const subCatsToRemove = filterOptions.subCategories
          .filter(sub => sub.categoryId === id)
          .map(sub => sub.id);
        
        newFilters.subCategoryIds = prev.subCategoryIds.filter(
          subId => !subCatsToRemove.includes(subId)
        );
      }

      return newFilters;
    });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleStatusFilter = (statusType) => {
    setFilters(prev => ({
      ...prev,
      [statusType]: prev[statusType] ? null : true
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      categoryIds: [],
      subCategoryIds: [],
      brandIds: [],
      colorIds: [],
      sizeIds: [],
      minPrice: null,
      maxPrice: null,
      search: '',
      isNew: null,
      isTrend: null,
      isTopSeller: null,
      sortBy: 'newest'
    });
  };

  const activeFiltersCount = 
    filters.categoryIds.length + 
    filters.subCategoryIds.length + 
    filters.brandIds.length +
    filters.colorIds.length + 
    filters.sizeIds.length +
    (filters.isNew ? 1 : 0) +
    (filters.isTrend ? 1 : 0) +
    (filters.isTopSeller ? 1 : 0);

  const openProductProfile= (pro)=>{
    const collectionName= pro.collection.nameEn.toString().toLowerCase().split(" ").join("-")
    const catName= pro.category.nameEn.toString().toLowerCase().split(" ").join("-")
    const subCatName= pro.subCategory.nameEn.toString().toLowerCase().split(" ").join("-")
    navigate(`/collection/${collectionName}/${catName}/${subCatName}/${pro.id}`);
  }

  return (
    <div className="bg-light min-vh-100 pb-4">
      <div className="container-fluid py-3 px-lg-5">
        <div className="col-12 mb-4">
          <img src={currentCollection?.image_url} alt="" className='collection-image-section'/>
        </div>

        <div className="row g-4">
          {showFilters && (
            <div className="col-lg-3">
              <div className="card shadow-sm filters-sidebar">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center gap-2">
                      <Filter size={20} className="text-primary" />
                      <h5 className="mb-0 fw-bold">Filters</h5>
                      {activeFiltersCount > 0 && (
                        <span className="badge bg-primary rounded-pill">{activeFiltersCount}</span>
                      )}
                    </div>
                    {activeFiltersCount > 0 && (
                      <button onClick={clearAllFilters} className="btn btn-sm btn-link text-primary text-decoration-none p-0">
                        Clear all
                      </button>
                    )}
                  </div>

                  <div className="filter-section border-bottom pb-3 mb-3">
                    <button
                      onClick={() => toggleSection('status')}
                      className="btn btn-link text-decoration-none text-dark w-100 d-flex justify-content-between align-items-center p-0 mb-2"
                    >
                      <h6 className="mb-0 fw-semibold">{lang === "EN"? "Status": "حالة المنتج"}</h6>
                      {expandedSections.status ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {expandedSections.status && (
                      <div className="filter-collapse">
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="status-new"
                            checked={filters.isNew === true}
                            onChange={() => toggleStatusFilter('isNew')}
                          />
                          <label className="form-check-label" htmlFor="status-new">
                            {lang==="EN"? "NEW ARRIVAL": "جديد"}
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="status-trend"
                            checked={filters.isTrend === true}
                            onChange={() => toggleStatusFilter('isTrend')}
                          />
                          <label className="form-check-label" htmlFor="status-trend">
                            {lang==="EN"? "TRENDING": "ترندات"}                            
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="status-topseller"
                            checked={filters.isTopSeller === true}
                            onChange={() => toggleStatusFilter('isTopSeller')}
                          />
                          <label className="form-check-label" htmlFor="status-topseller">
                            {lang==="EN"? "TOP SELLER": "أكثر مبيعا"}
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {filterOptions.categories.length > 0 && (
                    <div className="filter-section border-bottom pb-3 mb-3">
                      <button
                        onClick={() => toggleSection('category')}
                        className="btn btn-link text-decoration-none text-dark w-100 d-flex justify-content-between align-items-center p-0 mb-2"
                      >
                        <h6 className="mb-0 fw-semibold">{lang === "EN"? "Category": "قسم"}</h6>
                        {expandedSections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {expandedSections.category && (
                        <div className="filter-collapse">
                          {filterOptions.categories.map(category => (
                            <div key={category.id} className="form-check mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`category-${category.id}`}
                                checked={filters.categoryIds.includes(category.id)}
                                onChange={() => toggleFilter('categoryIds', category.id)}
                              />
                              <label className="form-check-label" htmlFor={`category-${category.id}`}>
                                {category.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {filterOptions.subCategories.length > 0 && (
                    <div className="filter-section border-bottom pb-3 mb-3">
                      <button
                        onClick={() => toggleSection('subCategory')}
                        className="btn btn-link text-decoration-none text-dark w-100 d-flex justify-content-between align-items-center p-0 mb-2"
                      >
                        <h6 className="mb-0 fw-semibold">{lang === "EN"? "Sub Category": "فئة"}</h6>
                        {expandedSections.subCategory ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {expandedSections.subCategory && (
                        <div className="filter-collapse">
                          {filterOptions.subCategories.map(subCategory => (
                            <div key={subCategory.id} className="form-check mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`subCategory-${subCategory.id}`}
                                checked={filters.subCategoryIds.includes(subCategory.id)}
                                onChange={() => toggleFilter('subCategoryIds', subCategory.id)}
                              />
                              <label className="form-check-label" htmlFor={`subCategory-${subCategory.id}`}>
                                {subCategory.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {filterOptions.brands.length > 0 && (
                    <div className="filter-section border-bottom pb-3 mb-3">
                      <button
                        onClick={() => toggleSection('brand')}
                        className="btn btn-link text-decoration-none text-dark w-100 d-flex justify-content-between align-items-center p-0 mb-2"
                      >
                        <h6 className="mb-0 fw-semibold">{lang === "EN"? "Brand": "مركة"}</h6>
                        {expandedSections.brand ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {expandedSections.brand && (
                        <div className="filter-collapse">
                          {filterOptions.brands.map(brand => (
                            <div key={brand.id} className="form-check mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`brand-${brand.id}`}
                                checked={filters.brandIds.includes(brand.id)}
                                onChange={() => toggleFilter('brandIds', brand.id)}
                              />
                              <label className="form-check-label" htmlFor={`brand-${brand.id}`}>
                                {brand.nameEn}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {filterOptions.colors.length > 0 && (
                    <div className="filter-section border-bottom pb-3 mb-3">
                      <button
                        onClick={() => toggleSection('color')}
                        className="btn btn-link text-decoration-none text-dark w-100 d-flex justify-content-between align-items-center p-0 mb-2"
                      >
                        <h6 className="mb-0 fw-semibold">{lang === "EN"? "Color": "لون"}</h6>
                        {expandedSections.color ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {expandedSections.color && (
                        <div className="filter-collapse d-flex flex-wrap gap-2">
                          {filterOptions.colors.map(color => (
                            <div
                              key={color.id}
                              className={`color-option ${filters.colorIds.includes(color.id) ? 'selected' : ''}`}
                              style={{ backgroundColor: color.hexCode }}
                              onClick={() => toggleFilter('colorIds', color.id)}
                              title={color.nameEn || 'Color'}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {filterOptions.sizes.length > 0 && (
                    <div className="filter-section">
                      <button
                        onClick={() => toggleSection('size')}
                        className="btn btn-link text-decoration-none text-dark w-100 d-flex justify-content-between align-items-center p-0 mb-2"
                      >
                        <h6 className="mb-0 fw-semibold">{lang === "EN"? "Size": "مقاس"}</h6>
                        {expandedSections.size ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {expandedSections.size && (
                        <div className="filter-collapse d-flex flex-wrap gap-2">
                          {filterOptions.sizes.map(size => (
                            <div
                              key={size.id}
                              className={`size-option ${filters.sizeIds.includes(size.id) ? 'selected' : ''}`}
                              onClick={() => toggleFilter('sizeIds', size.id)}
                            >
                              {size.nameEn}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className={showFilters ? 'col-lg-9' : 'col-12'}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-outline-primary d-lg-none mb-3"
            >
              <Filter size={16} className="me-2" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>

            <div className="d-flex justify-content-end mb-3">
              <select 
                className="form-select w-auto"
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>

            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <Loader className="loader-spin" size={48} style={{ animation: 'spin 1s linear infinite' }} />
              </div>
            ) : products?.length === 0 ? (
              <div className="text-center py-5 empty-state">
                <X size={64} className="text-muted mb-3" />
                <h3 className="fw-bold mb-2">{lang === "EN"? "No products found": "لا يتوفر منتجات"}</h3>
                <p className="text-muted mb-4">{lang === "EN"? "Try adjusting your filters": "يمكنك البحث عن منتجات أخري"}</p>
                <button onClick={clearAllFilters} className="btn btn-primary">
                  {lang === "EN"? "Clear all filters": "أمسح الفلتر"}
                </button>
              </div>
            ) : (
              <>
                <div className="row g-4">
                  {products?.map((product, index) => {
                    const minPrice = product?.variants? 
                      Math.min(...product?.variants?.map(v => v.discountPrice || v.price)): 0;
                    const maxPrice = product?.variants?
                      Math.max(...product?.variants?.map(v => v.price)): 0;
                    const hasDiscount = product?.variants?
                      product?.variants?.some(v => v.discountPrice): 0;
                    const availableColors = product?.variants?
                      [...new Set(product?.variants?.map(v => v.color?.hexCode).filter(Boolean))]: [];

                    return (
                      <div key={product?.id} className="col-md-6 col-xl-4">
                        <div 
                          className="card product-card h-100 shadow-sm border-0"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="product-image-wrapper">
                            <img
                              src={product?.primaryImageUrl || 'https://via.placeholder.com/400'}
                              alt={product?.nameEn}
                              className="product-image"
                            />
                            
                            {product?.brand?.imageUrl && (
                              <div className="brand-badge">
                                <img 
                                  src={product?.brand?.imageUrl} 
                                  alt={product?.brand?.nameEn}
                                  className="brand-logo"
                                />
                              </div>
                            )}

                            <div className="badge-overlay">
                              {product?.isNew && (
                                <span className="badge bg-success badge-tag">{lang==="EN"? "NEW": "جديد"}</span>
                              )}
                              {product?.isTrend && (
                                <span className="badge badge-tag" style={{backgroundColor: '#6f42c1', color: 'white'}}> {lang==="EN"? "TRENDING": "ترند"}</span>
                              )}
                              {product?.isTopSeller && (
                                <span className="badge bg-warning text-dark badge-tag"> {lang==="EN"? "TOP SELLER": "أكثر مبيعا"}</span>
                              )}
                            </div>

                            {hasDiscount && (
                              <span className="badge bg-danger sale-badge badge-tag">{lang==="EN"? "SALE": "تخفيض"}</span>
                            )}
                          </div>

                          <div className="card-body">
                            <p className="text-muted small mb-1">{product?.brand?.nameEn}</p>
                            <h5 className="card-title fw-bold mb-2 text-truncate">{lang === "EN"? product?.nameEn: product?.nameAr}</h5>
                            <p className="card-text text-muted small mb-3 text-truncate-2">
                              {lang === "EN"? product?.descriptionEn: product?.descriptionAr}
                            </p>

                            {availableColors.length > 0 && (
                              <div className="d-flex align-items-center gap-2 mb-3">
                                {availableColors.slice(0, 5).map((color, i) => (
                                  <div
                                    key={i}
                                    style={{
                                      width: '24px',
                                      height: '24px',
                                      borderRadius: '50%',
                                      backgroundColor: color,
                                      border: '2px solid #dee2e6'
                                    }}
                                  />
                                ))}
                                {availableColors.length > 5 && (
                                  <span className="text-muted small">+{availableColors.length - 5}</span>
                                )}
                              </div>
                            )}

                            <div className="d-flex align-items-center gap-2 mb-3">
                              <span className="price-badge">EGP {minPrice.toFixed(0)}</span>
                              {hasDiscount && (
                                <span className="original-price">EGP {maxPrice.toFixed(0)}</span>
                              )}
                            </div>

                            <button 
                              onClick={()=> openProductProfile(product)}
                              className="btn w-100 view-details-btn text-light"
                            >
                              {lang === "EN"? "View Details": "تفاصيل المنتج"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {pagination.totalPages > 1 && (
                  <nav className="mt-5">
                    <ul className="pagination justify-content-center">
                      <li className={`page-item ${pagination.currentPage === 0 ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                          disabled={pagination.currentPage === 0}
                        >
                          Previous
                        </button>
                      </li>
                      
                      {[...Array(pagination.totalPages)].map((_, i) => (
                        <li key={i} className={`page-item ${pagination.currentPage === i ? 'active' : ''}`}>
                          <button 
                            className="page-link"
                            onClick={() => setPagination(prev => ({ ...prev, currentPage: i }))}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      
                      <li className={`page-item ${pagination.currentPage >= pagination.totalPages - 1 ? 'disabled' : ''}`}>
                        <button 
                          className="page-link"
                          onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                          disabled={pagination.currentPage >= pagination.totalPages - 1}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCollectionList;