import { useEffect, useRef, useState } from "react";
import { executeResendVerificationCode } from "../../../services/AuthenticationApiService";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { Form, Field, ErrorMessage, Formik } from "formik";
import { useAuth } from "../../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { MdPerson } from "react-icons/md";

export default function VerifyCode({userIdentifierForNewPassword, setNextStepIdx}) {
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const authContext = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const identifier = !userIdentifierForNewPassword? queryParams.get("identifier"): userIdentifierForNewPassword;
  const inputRefs = useRef([]);

  const handleInputChange = (index, ev, setFieldValue, values) => {
    // Only allow digits
    const digit = ev.value.replace(/\D/g, "");

    // Update the OTP string
    const otpArray = values.otp.split("");
    otpArray[index] = digit;
    const newOtp = otpArray.join("");

    setFieldValue("otp", newOtp);

    // Auto-focus next input
    if (digit && index < 5) {
      inputRefs.current[index + 1].disabled = false; // enable
      inputRefs.current[index + 1].style.opacity = 1;
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index, setFieldValue, values) => {
    // Handle backspace
    if (e.key === "Backspace") {
      e.preventDefault();
      const otpArray = values.otp.split("");

      if (otpArray[index]) {
        // Clear current digit
        otpArray[index] = "";
        setFieldValue("otp", otpArray.join(""));
      } else if (index > 0) {
        // Move to previous input and clear it
        otpArray[index - 1] = "";
        setFieldValue("otp", otpArray.join(""));
        inputRefs.current[index].disabled = true; // disable
        inputRefs.current[index].style.opacity = 0.5;
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e, setFieldValue) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pastedData.length <= 6) {
      setFieldValue("otp", pastedData.padEnd(6, ""));
      // Focus the next empty input or last input
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
      [0, 1, 2, 3, 4, 5].forEach( idx=> {
        inputRefs.current[idx].disabled= false;
        inputRefs.current[idx].style.opacity= "1";
      })
    }
  };

  const handleVerification = async (
    values,
    { setSubmitting, setFieldError }
  ) => {
    if(values.otp.length < 6){
      setFieldError("otp", "OTP must be 6 digits");
      return;
    }
    values = { ...values, emailOrMobile: identifier , verifiyForResetPassword: userIdentifierForNewPassword? true: false};
    if (await authContext.verifyCodeForEmail(values, setFieldError, setSubmitting)) {
      if(setNextStepIdx){
        setNextStepIdx(val=> ++val);
        return;
      }
    }
    
  };

  const handleResend = async () => {
    try {
      setIsResending(true);
      const response = await executeResendVerificationCode(identifier);
      if (response.status === HttpStatusCode.Ok) {
        toast.success("new code is sended");
        setIsResending(false);
        // Reset timer
        setTimeLeft(120);
        setCanResend(false);
      }
    } catch (err) {
      const errMsg = err?.response?.data;
      if (errMsg) {
        toast.error(errMsg);
      } else {
        toast.error("something went wrong, try again");
      }
      setIsResending(false);
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  return (
    // {/* Verify OTP Form Container */}
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
                  Verify Your identifier
                </h2>
                <p className="text-light my-0 py-0">
                  {/* We've sent a verification code to your email address */}
                  Enter the 6-digit OTP sent to{" "}
                  <MdPerson size={20} className="text-white-50" />
                  <strong> {identifier} </strong>
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

              {/* Verify OTP Form with Formik */}
              <Formik
                initialValues={{
                  otp: ""
                }}
                onSubmit={handleVerification}
              >
                {({ values, setFieldValue, errors, touched, isSubmitting}) => {
                  return (
                    <Form className="verify-form">
                      <div className="mb-2 row flex-row justify-content-center align-items-start">
                        {/* OTP Input Fields */}
                        <div className="d-flex justify-content-center gap-2 mb-3">
                          {[0, 1, 2, 3, 4, 5].map((index) => (
                            <Field
                              disabled= {index > 0 ?? true}
                              key={index}
                              ref={(el) => (inputRefs.current[index] = el)}
                              type="text"
                              maxLength="1"
                              name="otp"
                              className={`form-control text-center fw-semibold ${
                                errors.otp && touched.otp ? "is-invalid" : ""
                              }`}
                              style={{
                                width: "50px",
                                height: "50px",
                                fontSize: "1.1rem",
                                opacity: index > 0 ? "0.5": "1" 
                              }}
                              value={values.otp[index] || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  e.target,
                                  setFieldValue,
                                  values
                                )
                              }
                              onKeyDown={(e) =>
                                handleKeyDown(e, index, setFieldValue, values)
                              }
                              onPaste={(e) => handlePaste(e, setFieldValue)}
                              onFocus={(e) => e.target.select()}
                            />
                          ))}
                        </div>

                        {/* Error message */}
                        <ErrorMessage
                            name="otp"
                            component="div"
                            className="text-danger text-center small mb-3"
                            style={{ fontSize: "12px" }}
                          />
                      </div>

                      {/* Verify Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn w-100 py-3"
                        style={{
                          background: isSubmitting
                            ? "transparent"
                            : "rgba(0, 0, 0, 0.3)",
                          border: isSubmitting ? "1px solid #fff" : "none",
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
                        {!isSubmitting? 
                          (<span>Verify</span>): 
                          (
                            <>
                              <span> Verifying...</span>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            </>
                          )
                        }
                      </button>

                      {/* Divider */}
                      <div className="d-flex align-items-center">
                        <hr
                          className="flex-grow-1"
                          style={{
                            borderColor: "rgba(255, 255, 255, 0.3)",
                          }}
                        />
                        <hr
                          className="flex-grow-1"
                          style={{
                            borderColor: "rgba(255, 255, 255, 0.3)",
                          }}
                        />
                      </div>

                      {/* Resend Button */}

                      <div className="d-flex justify-content-center align-items-center text-center text-light mt-2">
                        <p className="d-inline mr-2 my-0">
                          Didn't get the OTP?
                        </p>

                        <button
                          onClick={handleResend}
                          disabled={!canResend || isResending}
                          className="btn w-auto py-3"
                          style={{
                            background: "transparent",
                            fontWeight: 700,
                            border: "none",
                            color: canResend ? "rgb(240, 173, 49)" : "gray",
                            fontSize: "16px",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {isResending
                            ? "Resending..."
                            : canResend
                            ? "Resend OTP via email"
                            : `Resend available in ${formatTime(timeLeft)}`}
                        </button>
                      </div>

                      <div className="text-center text-light mt-2">
                        <img
                          src={"/assets/light-bulb.svg"}
                          alt="login visual"
                          className="object-fit-fill login-img"
                          style={{ width: "30px", borderRadius: "10px" }}
                        />

                        <span>
                          OTP verification protects your account from
                          unauthorized access.
                        </span>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
