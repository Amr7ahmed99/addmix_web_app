// AuthLayout.js
import { Outlet } from "react-router-dom";
import "./AuthLayout.css";

export default function AuthLayout() {
  return (
    <div
      className="container-fluid auth-container"
      style={{
        background: "linear-gradient(to bottom, #000000, #1e1502, #734e0aff)",
      }}
    >
      <div className="row">
        <div className="auth-left col-xl-6 col-md-12 d-md-none d-none d-xl-block p-3 vh-100">
          <img
            src={"/assets/login-img.jpg"}
            alt="login visual"
            className=" w-100 object-fit-fill login-img"
            style={{ borderRadius: "10px", height: "100%" }}
          />
        </div>

        {/* Right dynamic section (changes by route) */}
        <div className="auth-right col-xl-6 col-md-12 d-flex align-items-center justify-content-center text-white min-vh-100">
          <div className="h-100 d-flex align-items-center justify-content-center position-relative form-div">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
