import './BestSellingSlider.scss';
import Slider from '../general/slider/Slider';
import { useTopSellers } from '../../hooks/useTopSellers';


const BestSellingSlider = () => {

  const { topSellers, loading, error, refetch } = useTopSellers();


  if (loading) {
    return (
      <div className="top-sellers-section">
        <div className="section-header">
          <h2>🔥 Top Sellers</h2>
        </div>
        <div className="loading-state">
          <span
            className="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          ></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="top-sellers-section">
        <div className="section-header">
          <h2>🔥 Top Sellers</h2>
        </div>
        <div className="err-state">
          <p>Faild To load Top=Sellers</p>
        </div>
      </div>
    );
  }

  if (!topSellers || topSellers.length === 0) {
    return (
      <div className="top-sellers-section">
        <div className="section-header">
          <h2>🔥 Top Sellers</h2>
        </div>
        <div className="empty-state">
          <p>No top sellers available at the moment</p>
        </div>
      </div>
    );
  }


  const headerSectionContent = () => {
    return (
        <div className="section-header mt-4">
          <h2 className="section-title text-dark">Featured Collection</h2>
          <p className="section-subtitle text-dark">
            Top 10 Most Sold
          </p>
        </div>
    );
  };

  return (
    <section className="best-selling-container">
      {

        !loading &&
        <Slider
            headerSectionContent={headerSectionContent()}
            products={topSellers}
          />
      }


    </section>
  );
};

export default BestSellingSlider;
