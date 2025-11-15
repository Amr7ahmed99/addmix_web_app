// import { useEffect, useState } from "react";

// const CollectionProductsFilter = ({products, selectedCategory, setSelectedCategory, setFilteredProducts}) => {
//     const [selectedType, setSelectedType] = useState('All');
//     const [selectedColor, setSelectedColor] = useState('All');
//     const [selectedSize, setSelectedSize] = useState('All');
//     const [expandedSections, setExpandedSections] = useState({
//     type: true,
//     color: true,
//     size: true
//     });

//     const categories = ['Sweatshirt', 'Pants', 'Shoes', 'Caps'];
//     const types = ['All', 'Hoodies', 'Sweatshirts', 'T-Shirts', 'Vests'];
//     const colors = ['All', 'Black', 'White', 'Brown', 'Green', 'Orange', 'Red', 'Yellow'];
//     const sizes = ['All', 'S', 'M', 'L', 'XL'];
  

//     useEffect(() => {
//         let filtered = products.filter(product => product.category === selectedCategory);
        
//         if (selectedType !== 'All') {
//         filtered = filtered.filter(product => product.type === selectedType);
//         }
        
//         if (selectedColor !== 'All') {
//         filtered = filtered.filter(product => product.color === selectedColor);
//         }
        
//         if (selectedSize !== 'All') {
//         filtered = filtered.filter(product => product.size === selectedSize);
//         }
        
//         setFilteredProducts(filtered);
//     }, [selectedCategory, selectedType, selectedColor, selectedSize]);

//     const handleApplyFilters = () => {
//         // Trigger animation by temporarily clearing and refilling
//         setFilteredProducts([]);
//         setTimeout(() => {
//         let filtered = products.filter(product => product.category === selectedCategory);
        
//         if (selectedType !== 'All') {
//             filtered = filtered.filter(product => product.type === selectedType);
//         }
        
//         if (selectedColor !== 'All') {
//             filtered = filtered.filter(product => product.color === selectedColor);
//         }
        
//         if (selectedSize !== 'All') {
//             filtered = filtered.filter(product => product.size === selectedSize);
//         }
        
//         setFilteredProducts(filtered);
//         }, 100);
//     };

//    const toggleSection = (section) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   return (
//     <div className="filters-sidebar">
//       <h5 className="mb-4">Category</h5>

//       {/* Categories */}
//       <div className="filter-section mb-4">
//         {categories.map((category) => (
//           <div key={category} className="form-check">
//             <input
//               className="form-check-input"
//               type="radio"
//               name="category"
//               id={`category-${category}`}
//               checked={selectedCategory === category}
//               onChange={(e) => setSelectedCategory(category)}
//             />
//             <label
//               className="form-check-label"
//               htmlFor={`category-${category}`}
//             >
//               {category}
//             </label>
//           </div>
//         ))}
//       </div>

//       <h6>Filter by:</h6>

//       {/* Type Filter */}
//       <div className="filter-section mb-4">
//         <h6
//           className="filter-title collapsible"
//           onClick={() => toggleSection("type")}
//         >
//           Type
//           <i
//             className={`fas fa-chevron-${
//               expandedSections.type ? "up" : "down"
//             }`}
//           ></i>
//         </h6>
//         <div
//           className={`filter-content ${
//             expandedSections.type ? "expanded" : "collapsed"
//           }`}
//         >
//           {types.map((type) => (
//             <div key={type} className="form-check">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="type"
//                 id={`type-${type}`}
//                 checked={selectedType === type}
//                 onChange={(e) => setSelectedType(type)}
//               />
//               <label className="form-check-label" htmlFor={`type-${type}`}>
//                 {type}
//               </label>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Color Filter */}
//       <div className="filter-section mb-4">
//         <h6
//           className="filter-title collapsible"
//           onClick={() => toggleSection("color")}
//         >
//           Colour
//           <i
//             className={`fas fa-chevron-${
//               expandedSections.color ? "up" : "down"
//             }`}
//           ></i>
//         </h6>
//         <div
//           className={`filter-content ${
//             expandedSections.color ? "expanded" : "collapsed"
//           }`}
//         >
//           {colors.map((color) => (
//             <div key={color} className="form-check">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="color"
//                 id={`color-${color}`}
//                 checked={selectedColor === color}
//                 onChange={(e) => setSelectedColor(color)}
//               />
//               <label
//                 className="form-check-label color-label"
//                 htmlFor={`color-${color}`}
//               >
//                 {color !== "All" && (
//                   <span
//                     className="color-dot"
//                     style={{ backgroundColor: color.toLowerCase() }}
//                   ></span>
//                 )}
//                 {color}
//               </label>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Size Filter */}
//       <div className="filter-section mb-4">
//         <h6
//           className="filter-title collapsible"
//           onClick={() => toggleSection("size")}
//         >
//           Size
//           <i
//             className={`fas fa-chevron-${
//               expandedSections.size ? "up" : "down"
//             }`}
//           ></i>
//         </h6>
//         <div
//           className={`filter-content ${
//             expandedSections.size ? "expanded" : "collapsed"
//           }`}
//         >
//           {sizes.map((size) => (
//             <div key={size} className="form-check">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="size"
//                 id={`size-${size}`}
//                 checked={selectedSize === size}
//                 onChange={(e) => setSelectedSize(size)}
//               />
//               <label className="form-check-label" htmlFor={`size-${size}`}>
//                 {size}
//               </label>
//             </div>
//           ))}
//         </div>
//       </div>

//       <button
//         className="btn btn-primary apply-btn w-100"
//         onClick={handleApplyFilters}
//       >
//         Apply
//       </button>
//     </div>
//   );
// };


// export default CollectionProductsFilter;