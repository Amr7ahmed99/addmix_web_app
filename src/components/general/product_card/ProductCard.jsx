import './ProductCard.css'
const ProductCard = ({ product }) => {

  return (
    <div className="col-lg-4 col-md-6 col-12 my-2">
        <div className="card product-hero-card border-0 h-100">
        <div className="card-body p-4">
            <span className="badge badge-brand badge-custom mb-3">
            {product.subtitle}
            </span>
            <h3 className="card-title h4 fw-bold text-white mb-3">{product.title}</h3>
            <div className="text-white mb-4">
            <div className="fw-semibold">{product.price}</div>
            <div className="small opacity-75">{product.monthlyPrice}</div>
            </div>
            <div className="product-image-placeholder">
                <img
                    src={"/assets/pro_card.png"}
                    alt="login visual"
                    className="object-fit-fill"
                    style={{borderRadius: "10px", height: "100%", width:"auto"}}
                />
            </div>
        </div>
        </div>
    </div>
  );
};

export default ProductCard;
