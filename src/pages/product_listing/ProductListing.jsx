
import { useState, useEffect } from 'react';
import './ProductListing.scss';
import { Link } from 'react-router-dom';

const ProductListing = () => {
  const [selectedCategory, setSelectedCategory] = useState('Sweatshirt');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    type: true,
    color: true,
    size: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Sample products data
  const products = [
    {
      id: 1,
      name: 'Line-Pattern Zipper Sweatshirt',
      price: 200,
      originalPrice: null,
      image: '/assets/pro_card.png',
      category: 'Sweatshirt',
      type: 'Hoodies',
      color: 'White',
      size: 'M',
      isNew: true,
      isBestSeller: false
    },
    {
      id: 2,
      name: 'Black Fantasy Sweatshirt',
      price: 200,
      originalPrice: null,
      image: '/assets/pro_card2.png',
      category: 'Sweatshirt',
      type: 'Sweatshirts',
      color: 'Black',
      size: 'L',
      isNew: false,
      isBestSeller: false
    },
    {
      id: 3,
      name: 'Brooklyn NYC Sweatshirt',
      price: 200,
      originalPrice: 240,
      image: '/assets/pro_card.png',
      category: 'Sweatshirt',
      type: 'Sweatshirts',
      color: 'Brown',
      size: 'XL',
      isNew: false,
      isBestSeller: true
    },
    {
      id: 4,
      name: 'Basic Plain Shirt',
      price: 200,
      originalPrice: 240,
      image: '/assets/pro_card.png',
      category: 'Sweatshirt',
      type: 'T-Shirts',
      color: 'Green',
      size: 'S',
      isNew: false,
      isBestSeller: false
    },
    {
      id: 5,
      name: 'Basic Orange Sweatshirt',
      price: 200,
      originalPrice: null,
      image: '/assets/pro_card.png',
      category: 'Sweatshirt',
      type: 'Sweatshirts',
      color: 'Orange',
      size: 'M',
      isNew: true,
      isBestSeller: false
    },
    {
      id: 6,
      name: 'Alx Sweatshirt X Advent G',
      price: 200,
      originalPrice: null,
      image: '/assets/pro_card.png',
      category: 'Sweatshirt',
      type: 'Sweatshirts',
      color: 'Green',
      size: 'L',
      isNew: false,
      isBestSeller: false
    },
    {
      id: 7,
      name: 'Flowers Printed Sweatshirt',
      price: 200,
      originalPrice: 240,
      image: '/assets/pro_card.png',
      category: 'Sweatshirt',
      type: 'Sweatshirts',
      color: 'Red',
      size: 'M',
      isNew: false,
      isBestSeller: false
    },
    {
      id: 8,
      name: 'Reissued Fit Printed Sweatshirt',
      price: 200,
      originalPrice: null,
      image: '/assets/pro_card.png',
      category: 'Sweatshirt',
      type: 'Sweatshirts',
      color: 'White',
      size: 'XL',
      isNew: true,
      isBestSeller: false
    },
    {
      id: 9,
      name: 'Letter Pattern Knitted Vest',
      price: 200,
      originalPrice: null,
      image: '/assets/pro_card.png',
      category: 'Sweatshirt',
      type: 'Vests',
      color: 'Yellow',
      size: 'S',
      isNew: false,
      isBestSeller: false
    }
  ];

  const categories = ['Sweatshirt', 'Pants', 'Shoes', 'Caps'];
  const types = ['All', 'Hoodies', 'Sweatshirts', 'T-Shirts', 'Vests'];
  const colors = ['All', 'Black', 'White', 'Brown', 'Green', 'Orange', 'Red', 'Yellow'];
  const sizes = ['All', 'S', 'M', 'L', 'XL'];

  useEffect(() => {
    let filtered = products.filter(product => product.category === selectedCategory);
    
    if (selectedType !== 'All') {
      filtered = filtered.filter(product => product.type === selectedType);
    }
    
    if (selectedColor !== 'All') {
      filtered = filtered.filter(product => product.color === selectedColor);
    }
    
    if (selectedSize !== 'All') {
      filtered = filtered.filter(product => product.size === selectedSize);
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, selectedType, selectedColor, selectedSize]);

  const handleApplyFilters = () => {
    // Trigger animation by temporarily clearing and refilling
    setFilteredProducts([]);
    setTimeout(() => {
      let filtered = products.filter(product => product.category === selectedCategory);
      
      if (selectedType !== 'All') {
        filtered = filtered.filter(product => product.type === selectedType);
      }
      
      if (selectedColor !== 'All') {
        filtered = filtered.filter(product => product.color === selectedColor);
      }
      
      if (selectedSize !== 'All') {
        filtered = filtered.filter(product => product.size === selectedSize);
      }
      
      setFilteredProducts(filtered);
    }, 100);
  };

  return (
    <div className="product-listing">
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar Filters */}
          <div className="col-lg-3 col-md-4 mb-4">
            <div className="filters-sidebar">
              <h5 className="mb-4">Category</h5>
              
              {/* Categories */}
              <div className="filter-section mb-4">
                {categories.map(category => (
                  <div key={category} className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="category"
                      id={`category-${category}`}
                      checked={selectedCategory === category}
                      onChange={(e) => setSelectedCategory(category)}
                    />
                    <label className="form-check-label" htmlFor={`category-${category}`}>
                      {category}
                    </label>
                  </div>
                ))}
              </div>

              <h6>Filter by:</h6>
              
              {/* Type Filter */}
              <div className="filter-section mb-4">
                <h6 
                  className="filter-title collapsible" 
                  onClick={() => toggleSection('type')}
                >
                  Type
                  <i className={`fas fa-chevron-${expandedSections.type ? 'up' : 'down'}`}></i>
                </h6>
                <div className={`filter-content ${expandedSections.type ? 'expanded' : 'collapsed'}`}>
                  {types.map(type => (
                    <div key={type} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="type"
                        id={`type-${type}`}
                        checked={selectedType === type}
                        onChange={(e) => setSelectedType(type)}
                      />
                      <label className="form-check-label" htmlFor={`type-${type}`}>
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="filter-section mb-4">
                <h6 
                  className="filter-title collapsible" 
                  onClick={() => toggleSection('color')}
                >
                  Colour
                  <i className={`fas fa-chevron-${expandedSections.color ? 'up' : 'down'}`}></i>
                </h6>
                <div className={`filter-content ${expandedSections.color ? 'expanded' : 'collapsed'}`}>
                  {colors.map(color => (
                    <div key={color} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="color"
                        id={`color-${color}`}
                        checked={selectedColor === color}
                        onChange={(e) => setSelectedColor(color)}
                      />
                      <label className="form-check-label color-label" htmlFor={`color-${color}`}>
                        {color !== 'All' && (
                          <span 
                            className="color-dot" 
                            style={{backgroundColor: color.toLowerCase()}}
                          ></span>
                        )}
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="filter-section mb-4">
                <h6 
                  className="filter-title collapsible" 
                  onClick={() => toggleSection('size')}
                >
                  Size
                  <i className={`fas fa-chevron-${expandedSections.size ? 'up' : 'down'}`}></i>
                </h6>
                <div className={`filter-content ${expandedSections.size ? 'expanded' : 'collapsed'}`}>
                  {sizes.map(size => (
                    <div key={size} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="size"
                        id={`size-${size}`}
                        checked={selectedSize === size}
                        onChange={(e) => setSelectedSize(size)}
                      />
                      <label className="form-check-label" htmlFor={`size-${size}`}>
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                className="btn btn-primary apply-btn w-100"
                onClick={handleApplyFilters}
              >
                Apply
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-lg-9 col-md-8">
            <div className="products-header d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0">{selectedCategory}</h2>
              <div className="d-flex align-items-center">
                <span className="me-3">Sort by</span>
                <select className="form-select sort-select">
                  <option>Best match</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            <div className="row products-grid">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="col-xl-4 col-lg-6 col-md-6 col-sm-6 mb-4 px-lg-3 px-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="product-card">
                    <div className="product-image-wrapper">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="product-image"
                      />
                      <div className="product-badges">
                        {product.isNew && <span className="badge badge-new">NEW</span>}
                        {product.isBestSeller && <span className="badge badge-bestseller">BEST SELLER</span>}
                      </div>
                      <div className="product-actions">
                        <button className="btn-action">
                          <i className="far fa-heart"></i>
                        </button>
                        <button className="btn-action btn-cart">
                          <i className="fas fa-shopping-cart"></i>
                        </button>
                      </div>
                    </div>
                    <div className="product-info">
                      <h6 className="product-name">{product.name}</h6>
                      <div className="product-price">
                        <span className="current-price">${product.price}</span>
                        {product.originalPrice && (
                          <span className="original-price">${product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="no-products text-center py-5">
                <h4>No products found</h4>
                <p>Try adjusting your filters to see more results</p>
              </div>
            )}

            {/* Pagination */}
            <div className="pagination-wrapper d-flex justify-content-center mt-5">
              <div>
                <ul className="pagination">
                  <li className="page-item">
                    <Link className="page-link" to={"#1"}>Previous</Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" to={"#1"}>1</Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to={"#1"}>2</Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to={"#1"}>3</Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to={"#1"}>Next</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;