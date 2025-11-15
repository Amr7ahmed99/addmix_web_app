import { FaShoppingBag } from "react-icons/fa";
import { useState } from 'react';
import { BiHeart } from "react-icons/bi";
import './SliderProductCard.scss';
import { useNavigate } from "react-router-dom";

const SliderProductCard = ({product}) => {
  const [favorites, setFavorites] = useState(new Set());
  const navigate= useNavigate();

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };


  const openProductProfile= ()=>{
    const collectionName= product.collectionNameUrl.toString().toLowerCase().split(" ").join("-")
    const catName= product.categoryNameUrl.toString().toLowerCase().split(" ").join("-")
    const subCatName= product.subCategoryNameUrl.toString().toLowerCase().split(" ").join("-")
    navigate(`/collection/${collectionName}/${catName}/${subCatName}/${product.id}`);
  }

  return (
    <div className="slider-product-card" onClick={openProductProfile}>
      <div className="product-image">
        <div className="badges">
          {product.discountPrice && <div className="save-badge">Save EGP {product.price - product.discountPrice}</div>}

          {product.isNew && (
            <div className="new-badge">New</div>
          )}

          {product.isTrend && (
            <div className="trend-badge">🔥Trend</div>
          )}
    
        </div>

        <button
          className={`favorite-btn ${
            favorites.has(product.id) ? "active" : ""
          }`}
          onClick={() => toggleFavorite(product.id)}
        >
          <BiHeart
            size={18}
            color={favorites.has(product.id) ? "white" : "black"}
        />
        </button>

        <button className="shopping-bag-icon">
          <FaShoppingBag size={18} />
        </button>

        <img
            src={product.imageUrl? product.imageUrl: "/assets/pro_card.png"}
            alt="login visual"
            className="object-fit-fill"
            style={{borderRadius: "10px", width:"auto"}}
        />
      </div>

      <div className="product-info">
        <div className="brand-name">{product.brandNameEn}</div>
        <h6 className="product-name">{product.nameEn}</h6>
        <p className="product-description">{product.descriptionEn}</p>
        <div className="price-container">
          <span className="currency-text">
              EGP
          </span>
          {product.discountPrice &&(
              <strong>
                <span className="current-price">{product.discountPrice}</span>
              </strong>
            )
          }
          <span className={`${product.discountPrice? "discount-price": "current-price"}`}>
            {product.price}
          </span>
        </div>
      

        <div className="color-section">
          <div className="color-options">
            {product?.colors?.map((color, index) => (
              <div
                key={index}
                className="color-option"
                style={{ backgroundColor: color?.hexCode }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderProductCard;
