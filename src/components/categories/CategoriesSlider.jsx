import{ useState, useEffect, useRef } from 'react';
import './CategoriesSlider.scss';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getLanguage } from '../../utils/Helper';

const CategoriesSlider = ({ 
  autoSlideInterval = 500 
}) => {
  const lang= getLanguage();
  const [currentScroll, setCurrentScroll] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const authContext= useAuth();
  const navigate= useNavigate();

  const[categoriesData, setCategoriesData]= useState([]);

  // Calculate scroll limits
  const itemWidth = 150; // Fixed width for each category
  const gap = 20; // Gap between items
  const totalWidth = categoriesData.length * (itemWidth + gap);
  const containerWidth = containerRef.current?.offsetWidth || 0;
  const maxScroll = Math.max(0, totalWidth - containerWidth);

  

  // Manual navigation
  const scrollLeft = () => {
    setCurrentScroll(prev => Math.max(0, prev - (itemWidth + gap)));
  };

  const scrollRight = () => {
    setCurrentScroll(prev => Math.min(maxScroll, prev + (itemWidth + gap)));
  };


  // ----------------- Load Collection & Category -----------------
  const loadCollectionsData= ()=>{
    if (!authContext?.systemCollections?.length) return;
    let cats= [];
    authContext?.systemCollections.forEach(col => {
        cats= [...cats, ...col.categories.map(cat=> {return {...cat, collection: col.name, collection_url: col.name_url}})]
    });
    setCategoriesData(cats.sort((a,b)=> a.id - b.id));
  }
  const goToProductsCategory= (category)=>{
      const collectionName= category.collection_url.toString().toLowerCase().split(" ").join("-")
      const catName= category.name_url.toString().toLowerCase().split(" ").join("-")
      navigate(`/collection/${collectionName}/${catName}`);
    }

  // Auto slide effect
  useEffect(() => {
    if (isPaused || categoriesData.length === 0 || maxScroll === 0) return;

    const interval = setInterval(() => {
      setCurrentScroll(prev => {
        const nextScroll = prev + 2;
        if (nextScroll >= maxScroll) {
          return 0; 
        }
        return nextScroll;
      });
    }, autoSlideInterval / 10); 

    return () => clearInterval(interval);
  }, [currentScroll, isPaused, categoriesData.length, maxScroll, autoSlideInterval]);

  useEffect(()=>{
    if (authContext?.systemCollections?.length) loadCollectionsData();
  }, [authContext.systemCollections])

  // Reset scroll when data changes
  if (categoriesData.length === 0) {
    return <div className="slider_empty">No categories available</div>;
  }

  return (
    <div 
      className="container-fluid categories_slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="slider_header">
        <h2>{lang === "EN"? "Browse Categories": "تصفح أشهر الفئات لدينا"}</h2>
        <div className="slider_controls">
          <button 
            className="slider_control prev"
            onClick={scrollLeft}
            disabled={currentScroll === 0}
          >
            ‹
          </button>
          <button 
            className="slider_control next"
            onClick={scrollRight}
            disabled={currentScroll >= maxScroll}
          >
            ›
          </button>
        </div>
      </div>

      <div className="slider_container" ref={containerRef}>
        <div 
          className="slider_track"
          ref={sliderRef}
          style={{ 
            transform: `translateX(-${currentScroll}px)`,
            transition: 'transform 0.3s ease'
          }}
        >
          {categoriesData.map((category, i) => (
            <div 
              key={category.id} 
              className="category_item"
              onClick={()=> goToProductsCategory(category)}
            >
              <div className="category_image">
                <img 
                  src={category.image_url} 
                  alt={category.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150x150?text=Category';
                  }}
                />
              </div>
              <div className="category_info">
                <h4 className="category_name">{category.name}</h4>
                <span className="category_collection">{category.collection}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="slider_progress">
        <div 
          className="progress_fill"
          style={{ 
            width: `${maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0}%` 
          }}
        />
      </div>
    </div>
  );
};

export default CategoriesSlider;