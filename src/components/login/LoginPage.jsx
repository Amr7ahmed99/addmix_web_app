import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi";
import "./LoginPage.css";
import {
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Custom validation function
  const validate = (values) => {
    const errors = {};

    // Email validation
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Invalid email address";
    }

    // Password validation
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Login attempt:", values);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div
      className="container-fluid login-page"
      style={{
        background: "linear-gradient(to bottom, #000000, #1e1502, #734e0aff)",
      }}
    >
      <div className="row">
        <div className="col-xl-6 col-md-12 d-md-none d-none d-xl-block p-3 vh-100">
          <img
            src={"/assets/login-img.jpg"}
            alt="login visual"
            className=" w-100 object-fit-fill login-img"
            style={{borderRadius: "10px", height: "100%"}}
          />
        </div>

        <div className="col-xl-6 col-md-12 d-flex align-items-center justify-content-center text-white min-vh-100">
          <div className="h-100 d-flex align-items-center justify-content-center position-relative form-div">
            {/* Login Form Container */}
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 my-4">
                  <div
                    className="card border-0 shadow-lg"
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
                        {({ isSubmitting, errors, touched, values }) => (
                          <Form>
                            {/* Email Field */}
                            <div className="mb-4 d-flex flex-column justify-content-center align-items-start">
                              <label
                                className="form-label text-white mb-2"
                                style={{ fontSize: "14px" }}
                              >
                                Email address
                              </label>
                              <div className="position-relative w-100">
                                <div
                                  className="position-absolute start-0 top-50 translate-middle-y ps-3"
                                  style={{ zIndex: 5 }}
                                >
                                  <HiMail size={20} className="text-white-50" />
                                </div>
                                <Field
                                  type="email"
                                  name="email"
                                  className={`form-control ps-5 py-3 border-0`}
                                  placeholder="Enter your email address"
                                  style={{
                                    background: "rgba(255, 255, 255, 0.1)",
                                    // backdropFilter: "blur(10px)",
                                    borderRadius: "12px",
                                    color: "white",
                                    fontSize: "16px",
                                  }}
                                />
                              </div>
                              <ErrorMessage
                                name="email"
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
                                  className={`form-control ps-5 pe-5 py-3 border-0`}
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
                                  className="btn position-absolute end-0 top-50 translate-middle-y pe-3 border-0 bg-transparent"
                                  onClick={() => setShowPassword(!showPassword)}
                                  style={{ zIndex: 5 }}
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
                              <a
                                href="#1"
                                className="text-white-50 text-decoration-underline text-left"
                                style={{ fontSize: "14px" }}
                              >
                                Forgot Password?
                              </a>
                            </div>

                            {/* Sign In Button */}
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="btn w-100 py-3 border-0 fw-semibold"
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
                              className="btn w-100 py-3 mb-4 border-0 d-flex align-items-center justify-content-center gap-2"
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
                              <a
                                href="#1"
                                className="text-white text-decoration-none fw-semibold"
                                style={{
                                  fontSize: "14px",
                                  color: "#FF6B6B !important",
                                }}
                              >
                                Sign up
                              </a>
                            </div>
                            {/* Social Links */}
                            <div className="d-flex justify-content-center gap-3">
                              <a
                                href="#1"
                                className="btn btn-outline-light rounded-circle p-2"
                                style={{
                                  width: "45px",
                                  height: "45px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: "rgba(255, 255, 255, 0.1)",
                                  border: "1px solid rgba(255, 255, 255, 0.2)",
                                  transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.background =
                                    "rgba(255, 255, 255, 0.2)";
                                  e.target.style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.background =
                                    "rgba(255, 255, 255, 0.1)";
                                  e.target.style.transform = "translateY(0)";
                                }}
                              >
                                <FaFacebook size={20} className="text-white" />
                              </a>
                              <a
                                href="#1"
                                className="btn btn-outline-light rounded-circle p-2"
                                style={{
                                  width: "45px",
                                  height: "45px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: "rgba(255, 255, 255, 0.1)",
                                  border: "1px solid rgba(255, 255, 255, 0.2)",
                                  transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.background =
                                    "rgba(255, 255, 255, 0.2)";
                                  e.target.style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.background =
                                    "rgba(255, 255, 255, 0.1)";
                                  e.target.style.transform = "translateY(0)";
                                }}
                              >
                                <FaTwitter size={20} className="text-white" />
                              </a>
                              <a
                                href="#1"
                                className="btn btn-outline-light rounded-circle p-2"
                                style={{
                                  width: "45px",
                                  height: "45px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: "rgba(255, 255, 255, 0.1)",
                                  border: "1px solid rgba(255, 255, 255, 0.2)",
                                  transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.background =
                                    "rgba(255, 255, 255, 0.2)";
                                  e.target.style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.background =
                                    "rgba(255, 255, 255, 0.1)";
                                  e.target.style.transform = "translateY(0)";
                                }}
                              >
                                <FaYoutube size={20} className="text-white" />
                              </a>
                              <a
                                href="#1"
                                className="btn btn-outline-light rounded-circle p-2"
                                style={{
                                  width: "45px",
                                  height: "45px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: "rgba(255, 255, 255, 0.1)",
                                  border: "1px solid rgba(255, 255, 255, 0.2)",
                                  transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.background =
                                    "rgba(255, 255, 255, 0.2)";
                                  e.target.style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.background =
                                    "rgba(255, 255, 255, 0.1)";
                                  e.target.style.transform = "translateY(0)";
                                }}
                              >
                                <FaInstagram size={20} className="text-white" />
                              </a>
                              <a
                                href="#1"
                                className="btn btn-outline-light rounded-circle p-2"
                                style={{
                                  width: "45px",
                                  height: "45px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: "rgba(255, 255, 255, 0.1)",
                                  border: "1px solid rgba(255, 255, 255, 0.2)",
                                  transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.background =
                                    "rgba(255, 255, 255, 0.2)";
                                  e.target.style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.background =
                                    "rgba(255, 255, 255, 0.1)";
                                  e.target.style.transform = "translateY(0)";
                                }}
                              >
                                <FaTiktok size={20} className="text-white" />
                              </a>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
