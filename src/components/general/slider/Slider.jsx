import { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import SliderProductCard from "../slider_product_card/SliderProductCard";
import "./Slider.scss";

const Slider = ({products, headerSectionContent }) => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };
  
  return (
    <div className="slider-section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {headerSectionContent && (
              <div className="header-section-content mb-4">
                {headerSectionContent}
              </div>
            )}
          </div>
          <div className="col-12">
            {/* Products Slider */}
            <div className="slider-content px-3">
              <button className="nav-button left" onClick={scrollLeft}>
                <MdChevronLeft />
              </button>

              <div className="products-slider" ref={sliderRef}>
                {products?.map((product, index) => (
                  <SliderProductCard key={index} product={product} />
                ))}
              </div>

              <button className="nav-button right" onClick={scrollRight}>
                <MdChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
