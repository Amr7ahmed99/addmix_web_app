import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi";
import "./LoginComponent.scss";
import {FaGoogle} from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import SocialLinks from "../../general/social-links/SocialLinks";
import { MdPerson } from "react-icons/md";

const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const authContext= useAuth();
  const navigate = useNavigate();

  // Custom validation function
  const validate = (values) => {
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/; // accepts 10–15 digits

    if (!values.emailOrMobile) {
      errors.emailOrMobile = "Email or mobile number is required";
    } else if (!emailRegex.test(values.emailOrMobile) && !phoneRegex.test(values.emailOrMobile)) {
      errors.emailOrMobile = "Enter a valid email address or mobile number";
    }

    // Password validation
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
      const user= await authContext.login(values.emailOrMobile, values.password, setFieldError, setSubmitting);
      if(user){
          navigate(user.active? "/": `/auth/verify?identifier=${values.emailOrMobile}`, { replace: true });
      }
  }

  const handleGoogleLogin = () => {
      // Redirect to Spring Boot OAuth2 endpoint
      const backendUrl = process.env.REACT_APP_ADDMIX_STORE_API_BASE_URL || "http://localhost:8080";
      window.location.href = `${backendUrl}/oauth2/authorization/google`;
  };

  return (
    // {/* Login Form Container */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 my-4"> 
            <div
              className="card  shadow-lg"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                // backdropFilter: "blur(10px)",
                borderRadius: "20px",
              }}
            >
              <div className="card-body p-5">
                {/* Header */}
                <div className="d-none mb-4 d-xl-flex flex-column justify-content-center align-items-start">
                  <p
                    className="text-white-50 mb-2"
                    style={{ fontSize: "14px" }}
                  >
                    Login your account
                  </p>
                  <h2
                    className="text-white fw-bold mb-3"
                    style={{ fontSize: "2.5rem" }}
                  >
                    Welcome Back!
                  </h2>
                  <p
                    className="text-white-50"
                    style={{ fontSize: "16px" }}
                  >
                    Enter your email and password
                  </p>
                </div>

                <div className="d-xl-none mb-4 d-flex flex-column justify-content-center align-items-start">
                  <img
                    src={"/assets/login-form-logo.png"}
                    alt="login visual"
                    className=" w-100 object-fit-fill login-img"
                    style={{ height: "100%", borderRadius: "10px" }}
                  />
                </div>

                {/* Login Form with Formik */}
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validate={validate}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      {/* Email or Mobile Field */}
                      <div className="mb-4 d-flex flex-column justify-content-center align-items-start">
                        <label
                          className="form-label text-white mb-2"
                          style={{ fontSize: "14px" }}
                        >
                          Email or Mobile
                        </label>
                        <div className="position-relative w-100">
                          <div
                            className="position-absolute start-0 top-50 translate-middle-y ps-3"
                            style={{ zIndex: 5 }}
                          >
                            <MdPerson size={20} className="text-white-50" />
                          </div>
                          <Field
                            type="text"
                            name="emailOrMobile"
                            className={`form-control ps-5 py-3`}
                            placeholder="Enter your email or mobile number"
                            style={{
                              background: "rgba(255, 255, 255, 0.1)",
                              borderRadius: "12px",
                              color: "white",
                              fontSize: "16px",
                            }}
                          />
                        </div>
                        <ErrorMessage
                          name="emailOrMobile"
                          component="div"
                          className="text-danger mt-1"
                          style={{ fontSize: "12px" }}
                        />
                      </div>

                      {/* Password Field */}
                      <div className="mb-3 d-flex flex-column justify-content-center align-items-start">
                        <label
                          className="form-label text-white mb-2 d-flex flex-column justify-content-center align-items-start"
                          style={{ fontSize: "14px" }}
                        >
                          Password
                        </label>
                        <div className="position-relative w-100">
                          <div
                            className="position-absolute start-0 top-50 translate-middle-y ps-3"
                            style={{ zIndex: 5 }}
                          >
                            <HiLockClosed
                              size={20}
                              className="text-white-50"
                            />
                          </div>
                          <Field
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className={`form-control ps-5 pe-5 py-3 `}
                            placeholder="Enter your password"
                            style={{
                              background: "rgba(255, 255, 255, 0.1)",
                              // backdropFilter: "blur(10px)",
                              borderRadius: "12px",
                              color: "white",
                              fontSize: "16px",
                            }}
                          />
                          <button
                            type="button"
                            className="btn position-absolute end-0 top-50 translate-middle-y pe-3  bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ zIndex: 5 }}
                            tabIndex={-1}
                          >
                            {showPassword ? (
                              <HiEyeOff
                                size={20}
                                className="text-white-50"
                              />
                            ) : (
                              <HiEye
                                size={20}
                                className="text-white-50"
                              />
                            )}
                          </button>
                        </div>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger mt-1"
                          style={{ fontSize: "12px" }}
                        />
                      </div>

                      {/* Forgot Password Link */}
                      <div className="mb-4 d-flex">
                        <Link
                          to={"forget-password"}
                          className="text-white-50 text-decoration-underline text-left"
                          style={{ fontSize: "14px" }}
                        >
                          Forgot Password?
                        </Link>
                      </div>

                      {/* Sign In Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn w-100 py-3  fw-semibold"
                        style={{
                          background: "rgba(0, 0, 0, 0.3)",
                          borderRadius: "12px",
                          color: "white",
                          fontSize: "16px",
                          transition: "all 0.3s ease",
                          opacity: isSubmitting ? 0.7 : 1,
                        }}
                        onMouseEnter={(e) => {
                          if (!isSubmitting) {
                            e.target.style.background =
                              "rgba(0, 0, 0, 0.5)";
                            e.target.style.transform = "translateY(-2px)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSubmitting) {
                            e.target.style.background =
                              "rgba(0, 0, 0, 0.3)";
                            e.target.style.transform = "translateY(0)";
                          }
                        }}
                      >
                        {isSubmitting ? "Signing in..." : "Sign in"}
                      </button>

                      {/* OR Divider */}
                      <div className="d-flex align-items-center mb-4">
                        <hr
                          className="flex-grow-1"
                          style={{
                            borderColor: "rgba(255, 255, 255, 0.3)",
                          }}
                        />
                        <span
                          className="px-3 text-white-50"
                          style={{ fontSize: "14px" }}
                        >
                          or
                        </span>
                        <hr
                          className="flex-grow-1"
                          style={{
                            borderColor: "rgba(255, 255, 255, 0.3)",
                          }}
                        />
                      </div>

                      {/* Login with Google */}
                      <button
                        type="button"
                        className="btn w-100 py-3 mb-4  d-flex align-items-center justify-content-center gap-2"
                        style={{
                          background: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "12px",
                          color: "#333",
                          fontSize: "16px",
                          fontWeight: "500",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background =
                            "rgba(255, 255, 255, 1)";
                          e.target.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background =
                            "rgba(255, 255, 255, 0.9)";
                          e.target.style.transform = "translateY(0)";
                        }}

                        onClick={handleGoogleLogin}
                      >
                        <FaGoogle size={20} />
                        Login with Google
                      </button>

                      {/* Sign Up Link */}
                      <div className="text-center mb-4">
                        <span
                          className="text-white-50"
                          style={{ fontSize: "14px" }}
                        >
                          Don't have an account?{" "}
                        </span>
                        <Link
                          to={'register'}
                          className="text-white text-decoration-none fw-semibold"
                          style={{
                            fontSize: "14px",
                            color: "#FF6B6B !important",
                          }}
                        >
                          Sign up
                        </Link>
                      </div>
                      {/* Social Links */}
                      <SocialLinks />
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default LoginComponent;
