import { Link, useNavigate } from "react-router-dom";
import "./PromoSection.scss";

const PromoSection = () => {
  const navigate= useNavigate();
  return (
    <section className="container promo-section pb-3">
      <div className="row g-3">
        {/* Left side big banner */}
        <div className="col-lg-6 col-md-12">
          <div className="promo-card large-card d-flex align-items-center justify-content-between men-acssesories">
            <div className="promo-text">
              <p className="new">New Arrivals</p>
              <h2>Men's Acssesories</h2>
              <p className="discount">Up to 70% Off</p>
              <button className="btn btn-outline-dark" onClick={()=> navigate("/collection/men's-collection/men's-accessories")}>Shop Now →</button>
            </div>
            <img 
              src={"./assets/bracelets.webp"} 
              alt="Men's Acssesories" 
              className="img-fluid promo-img"
            />
          </div>
        </div>

        {/* Right side grid */}
        <div className="col-lg-6 col-md-12">
          <div className="row g-3">
            <div className="col-6">
              <div className="promo-card small-card men-backpack">
                <span className="badge discount-badge">25% OFF</span>
                <img 
                  src={"./assets/backpack.jpg"} 
                  alt="Backpack" 
                  className="img-fluid img-with-badge"
                />
                <h5 className="m-0">Backpack</h5>
                <Link to={"/collection/men's-collection/men's-bags"} className="shop-now">Shop Now →</Link>
              </div>
            </div>
            <div className="col-6">
              <div className="promo-card small-card men-watches">
                <span className="badge discount-badge">45% OFF</span>
                <img src={"./assets/watch.jpg"} alt="Watch" className="img-fluid img-with-badge"/>
                <h5 className="m-0">Watch</h5>
                <Link to={"/collection/men's-collection/men's-watches"} className="shop-now">Shop Now →</Link>
              </div>
            </div>
            <div className="col-12">
              <div className="promo-card wide-card hand-bag" >
                <h4>Handbag</h4>
                <p className="discount">Min. 40–80% Off</p>
                <img 
                  src={"./assets/handbag.png"} 
                  alt="Handbag" 
                  className="img-fluid promo-img"
                />
                <Link to={"/collection/women's-collection/women's-bags"} className="shop-now">Shop Now →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;

