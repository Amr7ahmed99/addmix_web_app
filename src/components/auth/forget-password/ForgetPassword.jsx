import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import VerifyCode from "../verify-code/VerifyCode";
import "./ForgetPassword.css";


export default function ForgetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const authContext = useAuth();
  const navigate = useNavigate();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const steps = [
    emailVerificationJSX,
    verifyEmail,
    newPasswordJSX,
  ];
  const [nextStepIdx, setNextStepIdx] = useState(0);

  // Custom validation function
  function validate (values){
    const errors = {};

    // Email validation
    if (nextStepIdx === 0 && !values.email) {
      errors.email = "Email is required";
    } else if (nextStepIdx === 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Invalid email address";
    }

    // Password validation
    if (nextStepIdx === 2 && !values.password) {
      errors.password = "Password is required";
    } else if (nextStepIdx === 2 && values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    // Confirm Password validation
    if (nextStepIdx === 2 && !values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (nextStepIdx === 2 && values.confirmPassword.length < 6) {
      errors.confirmPassword = "Confirm Password must be at least 6 characters";
    }else if(nextStepIdx === 2 && values.confirmPassword !== values.password){
      errors.confirmPassword = "Confirm Password doesn't match Password";
    }

    return errors;
  };

  async function handleSubmitEmail(values, { setSubmitting }) {
    setEmail(values.email);
    if (await authContext.submitEmailForCreateNewPasswordVerification(values.email,setSubmitting)) {
      setNextStepIdx( val=> ++val)
    }
  };

  async function handleSubmitNewPassword(values, { setSubmitting }){
    values= {...values, email}
    const user = await authContext.submitNewPassword(
      values,
      setSubmitting
    );
    if (user) {
      navigate("/welcome", {
        replace: true,
      });
    }
  };

  function emailVerificationJSX(){
    return (
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
                    Forgotten Password
                  </h2>
                  <p className="text-white-50 my-0" style={{ fontSize: "16px" }}>
                    Please enter your email below then we will have you to recover
                    your account
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

                {/* Email Form with Formik */}
                <Formik
                  initialValues={{
                    email: "",
                  }}
                  validate={validate}
                  onSubmit={handleSubmitEmail}
                >
                  {({ isSubmitting }) => (
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
                      
                      {/* Next Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn w-100 py-3 my-3 fw-semibold"
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
                            e.target.style.background = "rgba(0, 0, 0, 0.5)";
                            e.target.style.transform = "translateY(-2px)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSubmitting) {
                            e.target.style.background = "rgba(0, 0, 0, 0.3)";
                            e.target.style.transform = "translateY(0)";
                          }
                        }}
                      >
                        {isSubmitting ? (
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          "Next"
                        )}
                      </button>
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

  function newPasswordJSX(){
    return (
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
                    Nice
                  </h2>
                  <p className="text-white-50" style={{ fontSize: "16px" }}>
                    Let's create new password for your account
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

                {/* Forget Password Form with Formik */}
                <Formik
                  initialValues={{
                    password: "",
                    confirmPassword: "",
                  }}
                  validate={validate}
                  onSubmit={handleSubmitNewPassword}
                >
                  {({ isSubmitting }) => (
                    <Form>
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
                            <HiLockClosed size={20} className="text-white-50" />
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
                              <HiEyeOff size={20} className="text-white-50" />
                            ) : (
                              <HiEye size={20} className="text-white-50" />
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
                      <div className="mb-3 d-flex flex-column justify-content-center align-items-start">
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
                            <HiLockClosed size={20} className="text-white-50" />
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
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            style={{ zIndex: 5 }}
                          >
                            {showConfirmPassword ? (
                              <HiEyeOff size={20} className="text-white-50" />
                            ) : (
                              <HiEye size={20} className="text-white-50" />
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

                      {/* Next Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn w-100 py-3 my-3 fw-semibold"
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
                            e.target.style.background = "rgba(0, 0, 0, 0.5)";
                            e.target.style.transform = "translateY(-2px)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSubmitting) {
                            e.target.style.background = "rgba(0, 0, 0, 0.3)";
                            e.target.style.transform = "translateY(0)";
                          }
                        }}
                      >
                        {isSubmitting ? (
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          "Next"
                        )}
                      </button>
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

  function verifyEmail(){
    return <VerifyCode userEmailForNewPassword= {email} setNextStepIdx={setNextStepIdx}/>
  }

  return steps[nextStepIdx]();
}


