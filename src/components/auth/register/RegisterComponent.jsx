import { Formik, Form, Field, ErrorMessage } from "formik";
import {useState } from "react";
import { HiMail, HiLockClosed, HiEye, HiEyeOff, HiUser } from "react-icons/hi";
import "./RegisterComponent.css";
import {FaSignInAlt} from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import SocialLinks from "../../general/social-links/SocialLinks";

const RegisterComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const authContext= useAuth();
  const navigate= useNavigate();


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

    // Confirm Password validation
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (values.confirmPassword.length < 6) {
      errors.confirmPassword = "Confirm Password must be at least 6 characters";
    }else if(values.confirmPassword !== values.password){
      errors.confirmPassword = "Confirm Password doesn't match Password";
    }

    // Phone validation
    if (!values.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^\d+$/.test(values.phone)) {
      errors.phone = "Phone number must contain only numbers";
    } else if (values.phone.length < 10) {
      errors.phone = "Phone number must be at least 10 digits";
    } else if (values.phone.length > 15) {
      errors.phone = "Phone number must not exceed 15 digits";
    }

    // First name validation
    if (!values.firstName) {
      errors.firstName = "firstname is required";
    }

    // Last name validation
    if (!values.lastName) {
      errors.lastName = "lastname is required";
    }

    return errors;
  };

  const handleSubmitRegistration = async (values, { setSubmitting }) => {
    const user= await authContext.register(values, setSubmitting);
      if(user){
          navigate(`/verify?identifier=${user?.email}`, { replace: true });
      }
  }

  return (
    // {/* Register Form Container */}
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
              <div className="d-none mb-4 d-xl-flex flex-column justify-content-center align-items-center">
                <h2
                  className="text-white fw-bold mb-3"
                  style={{ fontSize: "2.5rem" }}
                >
                  Sign Up
                </h2>
                
              </div>

              <div className="d-xl-none mb-4 d-flex flex-column justify-content-center align-items-start">
                <img
                  src={"/assets/login-form-logo.png"}
                  alt="login visual"
                  className=" w-100 object-fit-fill login-img"
                  style={{ height: "100%", borderRadius: "10px" }}
                />
              </div>

              {/* Register Form with Formik */}
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  confirmPassword: "",
                  firstName: "",
                  lastName: "",
                  phone: ""
                }}
                validate={validate}
                onSubmit={handleSubmitRegistration}
              >
                {({ isSubmitting }) => (
                    <Form className="register-form">
                      <div className="mb-4 row flex-row justify-content-center align-items-start">
                        {/* Email Field */}
                        <div className="col-xl-6 col-12 py-2 d-flex flex-column justify-content-center align-items-start">
                          <label
                            className="form-label text-white mb-2"
                            style={{ fontSize: "14px" }}
                          >
                            Email
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
                              className={`form-control ps-5 py-3 `}
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
                        {/* Phone Field */}
                        <div className="col-xl-6 col-12 py-2 d-flex flex-column justify-content-center align-items-start">
                          <label
                            className="form-label text-white mb-2"
                            style={{ fontSize: "14px" }}
                          >
                            Mobile number
                          </label>
                          <div className="position-relative w-100">
                            <div
                              className="position-absolute start-0 top-50 translate-middle-y ps-3"
                              style={{ zIndex: 5 }}
                            >
                              <HiDevicePhoneMobile size={20} className="text-white-50" />
                            </div>
                            <Field
                              type="phone"
                              name="phone"
                              className={`form-control ps-5 py-3 `}
                              placeholder="Enter your mobile number"
                              onKeyPress={(e) => {
                                // Allow only numbers
                                if (!/[0-9]/.test(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                              onInput={(e) => {
                                // Remove any non-numeric characters
                                e.target.value = e.target.value.replace(/\D/g, '');
                              }}
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
                            name="phone"
                            component="div"
                            className="text-danger mt-1"
                            style={{ fontSize: "12px" }}
                          />
                        </div>
                      </div>

                      <div className="mb-4 row flex-row justify-content-center align-items-start">
                        {/* Firstname Field */}
                        <div className="col-xl-6 col-12 py-2 d-flex flex-column justify-content-center align-items-start">
                          <label
                            className="form-label text-white mb-2"
                            style={{ fontSize: "14px" }}
                          >
                            Firstname
                          </label>
                          <div className="position-relative w-100">
                            <div
                              className="position-absolute start-0 top-50 translate-middle-y ps-3"
                              style={{ zIndex: 5 }}
                            >
                              <HiUser size={20} className="text-white-50" />
                            </div>
                            <Field
                              type="text"
                              name= "firstName"
                              className={`form-control ps-5 py-3 `}
                              placeholder="Enter your firstname"
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
                            name="firstName"
                            component="div"
                            className="text-danger mt-1"
                            style={{ fontSize: "12px" }}
                          />
                        </div>
                        {/* Lastname Field */}
                        <div className="col-xl-6 col-12 py-2 d-flex flex-column justify-content-center align-items-start">
                          <label
                            className="form-label text-white mb-2"
                            style={{ fontSize: "14px" }}
                          >
                            Lastname
                          </label>
                          <div className="position-relative w-100">
                            <div
                              className="position-absolute start-0 top-50 translate-middle-y ps-3"
                              style={{ zIndex: 5 }}
                            >
                              <HiUser size={20} className="text-white-50" />
                            </div>
                            <Field
                              type="text"
                              name="lastName"
                              className={`form-control ps-5 py-3 `}
                              placeholder="Enter your lastname"
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
                            name="lastName"
                            component="div"
                            className="text-danger mt-1"
                            style={{ fontSize: "12px" }}
                          />
                        </div>
                      </div>

                      <div className="mb-4 row flex-row justify-content-center align-items-start">
                        {/* Password Field */}
                        <div className="col-xl-6 col-12 py-2 d-flex flex-column justify-content-center align-items-start">
                          <label
                            className="form-label text-white mb-2"
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
                              tabIndex={-1}
                              className="btn position-absolute end-0 top-50 translate-middle-y pe-3  bg-transparent"
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
                        {/* Confirm Password Field */}
                        <div className="col-xl-6 col-12 py-2 d-flex flex-column justify-content-center align-items-start">
                          <label
                            className="form-label text-white mb-2"
                            style={{ fontSize: "14px" }}
                          >
                            Confirm Password
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
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                className={`form-control ps-5 pe-5 py-3 `}
                                placeholder="confirm your password"
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
                                tabIndex={-1}
                                className="btn position-absolute end-0 top-50 translate-middle-y pe-3  bg-transparent"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{ zIndex: 5 }}
                              >
                                {showConfirmPassword ? (
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
                              name="confirmPassword"
                              component="div"
                              className="text-danger mt-1"
                              style={{ fontSize: "12px" }}
                            />
                        </div>
                      </div>

                      {/* Register Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn w-100 py-3  fw-semibold"
                        style={{
                          background: isSubmitting? "transparent": "rgba(0, 0, 0, 0.3)",
                          border: isSubmitting? "1px solid #fff": "none",
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
                        {!isSubmitting? 
                          "Register":
                          (<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>)
                        }
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

                      {/* Back To Login */}
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
                        onClick={()=> navigate('/login')}
                      >
                        <FaSignInAlt size={20} />
                        Back To Login
                      </button>
                    
                      {/* Social Links */}
                      <SocialLinks />
                    </Form>
                  )
                }
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
