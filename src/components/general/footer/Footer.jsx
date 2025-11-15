import { Link, useNavigate } from 'react-router-dom';
import SocialLinks from '../social-links/SocialLinks';
import { useAuth } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';
import { HiClock, HiPhone } from 'react-icons/hi';
import './Footer.scss';
import { getLanguage } from '../../../utils/Helper';

const Footer = () => {
  // const footerSections = [
  //   {
  //     title: "MEN'S COLLECTION",
  //     links: [
  //       { name: "Summer Vibes", url: "#1" },
  //       { name: "Woody Scents", url: "#1" },
  //       { name: "Citrus Fresh", url: "#1" },
  //       { name: "Backpacks", url: "#1" },
  //       { name: "HandBag", url: "#1" },
  //       { name: "Messenger Bags", url: "#1" },
  //       { name: "Wallets", url: "#1" },
  //       { name: "Caps & Hats", url: "#1" },
  //       { name: "Analog Watches", url: "#1" },
  //       { name: "Digital Watches", url: "#1" },
  //       { name: "Aviators", url: "#1" },
  //       { name: "Wayfarers", url: "#1" }
  //     ]
  //   },
  //   {
  //     title: "WOMEN'S COLLECTION",
  //     links: [
  //       { name: "Floral Bouquet", url: "#1" },
  //       { name: "Fruity Scents", url: "#1" },
  //       { name: "Handbags", url: "#1" },
  //       { name: "Shoulder Bags", url: "#1" },
  //       { name: "Crossbody Bags", url: "#1" },
  //       { name: "Earrings", url: "#1" },
  //       { name: "Necklaces", url: "#1" },
  //       { name: "Wide Brim Hats", url: "#1" },
  //       { name: "Fashion Watches", url: "#1" },
  //       { name: "Cat Eye Sunglasses", url: "#1" },
  //       { name: "Clutch Wallets", url: "#1" },
  //       { name: "Card Holders", url: "#1" }
  //     ]
  //   },
  //   {
  //     title: "HOME & KITCHEN",
  //     links: [
  //       { name: "Lighting", url: "#1" },
  //       { name: "Wall Art", url: "#1" },
  //       { name: "Vases & Planters", url: "#1" },
  //       { name: "Clocks", url: "#1" },
  //       { name: "Mirrors", url: "#1" },
  //       { name: "Rugs & Carpets", url: "#1" },
  //       { name: "Cushions & Throws", url: "#1" },
  //       { name: "Water Bottles", url: "#1" },
  //       { name: "Travel Mugs", url: "#1" },
  //       { name: "Thermos Flasks", url: "#1" }
  //     ]
  //   },
  //   {
  //     title: "BEAUTY & CARE",
  //     links: [
  //       { name: "Men's Perfumes", url: "#1" },
  //       { name: "Women's Perfumes", url: "#1" },
  //       { name: "Summer Collection", url: "#1" },
  //       { name: "Winter Collection", url: "#1" },
  //       { name: "Luxury Fragrances", url: "#1" },
  //       { name: "Daily Essentials", url: "#1" },
  //       { name: "Gift Sets", url: "#1" },
  //       { name: "Body Care", url: "#1" },
  //       { name: "Skincare", url: "#1" },
  //       { name: "Hair Care", url: "#1" }
  //     ]
  //   },
  //   {
  //     title: "ACCESSORIES",
  //     links: [
  //       { name: "Smart Watches", url: "#1" },
  //       { name: "Luxury Watches", url: "#1" },
  //       { name: "Sports Watches", url: "#1" },
  //       { name: "Designer Bags", url: "#1" },
  //       { name: "Travel Bags", url: "#1" },
  //       { name: "School Bags", url: "#1" },
  //       { name: "Premium Sunglasses", url: "#1" },
  //       { name: "Sports Sunglasses", url: "#1" },
  //       { name: "Reading Glasses", url: "#1" },
  //       { name: "Fashion Accessories", url: "#1" }
  //     ]
  //   },
  //   {
  //     title: "TOP BRANDS",
  //     links: [
  //       { name: "Adidas", url: "#1" },
  //       { name: "Reebok", url: "#1" },
  //       { name: "Puma", url: "#1" },
  //       { name: "Jack and Jones", url: "#1" },
  //       { name: "American Eagle", url: "#1" },
  //       { name: "Tommy Hilfiger", url: "#1" },
  //       { name: "Calvin Klein", url: "#1" },
  //       { name: "Seventy Five", url: "#1" },
  //       { name: "Skechers", url: "#1" },
  //       { name: "Nike", url: "#1" },
  //       { name: "Samsung", url: "#1" },
  //       { name: "Apple", url: "#1" }
  //     ]
  //   }
  // ];

  const authContext= useAuth();
  const [footerData, setFooterData]= useState([]);
  const navigate= useNavigate();
  const lang = getLanguage();
  
  const handleCollectionPaht= path =>{
    return path.toString().toLowerCase().split(" ").join("-", " ");
  }

  useEffect(() => {
    if (authContext?.systemCollections) {
      setFooterData(authContext.systemCollections);
    }
  }, [authContext?.systemCollections]);

  return (
    <footer className="footer-section">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mt-4 pt-4">
            <Link to={"/"} className="logo-container">
              <img
                  src={"/assets/login-form-logo.png"}
                  alt="footer visual"
                  className="object-fit-fill mx-2 footer-logo"
                  style={{
                    borderRadius: "10px",
                    height: "auto",
                  }}
                />
            </Link>
          </div>

          <div className="col-12">
            {/* App Download Section */}
              <div className="app-section align-items-center pt-3">
                  <div className="social-section">
                    <SocialLinks />
                  </div>
              </div>
          </div>

          {/* Main Footer Content */}
          <div className="footer-content mx-lg-4 mx-0 px-lg-0 px-3">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4 text-start">
                <p className='text-light'>
                
                {
                  lang === 'EN'?
                  "Addmix Store is a comprehensive online store that offers a smooth and secure shopping experience, featuring a wide variety of high-quality products at competitive prices. Our goal is to meet our customers’ needs in one place and deliver orders quickly and professionally."
                  :"أدميكس هو متجر إلكتروني متكامل يوفّر تجربة تسوّق سهلة وآمنة، مع مجموعة متنوعة من المنتجات عالية الجودة بأسعار تنافسية. هدفنا هو تلبية احتياجات عملائنا من مكان واحد وتوصيل الطلبات بسرعة واحترافية."
                }
                </p>
                <div className="footer-info-icon text-light">
                  <p>
                    <HiPhone/>
                    <span className='px-2'> 01234567891 </span>
                  </p>
                  <p>
                    <HiClock/>
                    <span className='px-2'>
                      Sat - Thu
                      8:30 am - 11:00 pm
                    </span>
                  </p>
                </div>
              </div>

              {footerData.map((collection, index) => (
                <div key={index} className="col-lg-2 col-md-4 col-sm-6 mb-4">
                  <h6 
                    className="footer-heading"
                    onClick={()=> navigate(handleCollectionPaht(`/collection/${collection.name_url}`))}

                  >
                    {collection.name}
                  </h6>
                  <ul className="footer-links">
                    {collection?.categories.map(category=> (
                      <li key={category.id}>
                        <Link 
                          to={handleCollectionPaht(`/collection/${collection.name_url}/${category.name_url}`)}
                          className="footer-link"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>


          {/* Bottom Footer */}
          <div className="footer-bottom">
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="footer-logo w-100">
                  <p className="copyright m-auto">©  <b>Addmix-Store</b> 2025, All rights reserved developed by Addmix Dev Team.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;