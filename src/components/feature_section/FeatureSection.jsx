import './FeatureSection.css'
import { getLanguage } from '../../utils/Helper';

const FeatureSection = () => {
  const lang = getLanguage();

  const features = [
    {
      icon: "🚚",
      titleEn: "Free Shipping",
      subtitleEn: "From all orders over 1500 EGP",
      titleAr: "توصيل مجاني",
      subtitleAr: "لكل الطلبات فوق 1500 جنيه"
    },
    {
      icon: "🎧",
      titleEn: "Support 24/7",
      subtitleEn: "Shop with an expert",
      titleAr: "دعم على مدار الساعة",
      subtitleAr: "تسوق مع خبير"
    },
    {
      icon: "🎁",
      titleEn: "Daily Surprise Offers",
      subtitleEn: "Save up to 25% off",
      titleAr: "عروض مفاجئة يومية",
      subtitleAr: "وفر حتى 25%"
    },
    {
      icon: "💲",
      titleEn: "Affordable Prices",
      subtitleEn: "Get Factory direct price",
      titleAr: "أسعار مناسبة",
      subtitleAr: "احصل على سعر المصنع مباشرة"
    },
    {
      icon: "🛡️",
      titleEn: "Secure Payments",
      subtitleEn: "Protected Payments 100%",
      titleAr: "مدفوعات آمنة",
      subtitleAr: "حماية 100% للمدفوعات"
    }
  ];

  return (
    <section className='featured-section container'>
      <div className="card border-0 shadow-sm">
        <div className="card-body py-3">
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-lg col-md-4 col-6">
                <div className="text-center feature-item">
                  <div className="feature-icon bg-light mb-3">{feature.icon}</div>
                  <h5 className="fw-semibold mb-2">
                    {lang === "EN" ? feature.titleEn : feature.titleAr}
                  </h5>
                  <p className="text-muted small mb-0">
                    {lang === "EN" ? feature.subtitleEn : feature.subtitleAr}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;