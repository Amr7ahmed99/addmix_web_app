// AuthLayout.js
import { Outlet } from "react-router-dom";
import "./MainLayout.scss";
import Navbar from "../../components/general/navbar/Navbar";
import Footer from "../../components/general/footer/Footer";

export default function MainLayout() {
  return (
    <section className="main-layout">
      <Navbar />
      <Outlet />
      <Footer />
    </section>
  );
}
