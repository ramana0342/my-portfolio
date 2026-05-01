import "./admin.css";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import {
  postAdminLogin,
  sendOtp,
  verifyOtp
} from "../network/portfolioApiService/portfolioApiService";


export const getMessage = (res, fallback) => {
  return res?.status?.message || fallback;
};

const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  const [mode, setMode] = useState("password");
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");

  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [verfying, setVerfying] = useState(false)



  // OTP TIMER
  useEffect(() => {
    if (mode !== "otp" || step !== 2) return;

    setTimer(60);
    setCanResend(false);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [mode, step]);

  // PASSWORD LOGIN
  const onPasswordLogin = async (data) => {
    setLoading(true);

    try {
      const res = await postAdminLogin(data);

      if (res?.status?.code === 200) {
        localStorage.setItem("accesstoken", res.response.accessToken);

        toast.success(res.status.message);

        navigate("/admin-panel/user-messages");
      } else {
        toast.error(getMessage(res, "Login failed"));
      }

    } catch (err) {
      toast.error("Server error. Please try again");
    } finally {
      setLoading(false);
    }
  };

  // SEND OTP
  const onSendOtp = async (data) => {
    setLoading(true);

    try {
      const res = await sendOtp({ email: data.email });

      if (res?.status?.code === 200) {
        setOtpEmail(data.email);
        setStep(2);
        reset();

        toast.success(res.status.message);
      } else {
        toast.error(getMessage(res, "Failed to send OTP"));
      }

    } catch (err) {
      const { data } = err.response
      toast.error(getMessage(data, "Server error"));
    } finally {
      setLoading(false);
    }
  };

  // RESEND OTP
  const handleResendOtp = async () => {
    setLoading(true);

    try {
      const res = await sendOtp({ email: otpEmail });

      if (res?.status?.code === 200) {
        setTimer(60);
        setCanResend(false);

        toast.success(res.status.message);
      } else {
        toast.error(getMessage(res, "Failed to resend OTP"));
      }

    } catch (err) {
      const { data } = err.response
      toast.error(getMessage(data, "Server error"));
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
  const onVerifyOtp = async (data) => {
    setVerfying(true);

    try {
      const res = await verifyOtp({
        email: otpEmail,
        otp: data.otp
      });

      if (res?.status?.code === 200 && res?.response?.accessToken) {
        localStorage.setItem("accesstoken", res.response.accessToken);

        toast.success(res.status.message);

        navigate("/admin-panel/user-messages");
      } else {
        toast.error(getMessage(res, "Invalid OTP"));
      }

    } catch (err) {
      const { data } = err.response
      toast.error(getMessage(data, "Server error"));
    } finally {
      setVerfying(false);
    }
  };

  return (
    <div className="login-wrapper">

      <div className="login-card">

        {/* TITLE */}
        <h2>Admin Login</h2>

        {/* SWITCH */}
        <div className="login-switch">
          <button
            className={`login-flow-btn ` + (mode === "password" ? "active" : "")}
            onClick={() => {
              setMode("password");
              setStep(1);
              reset();
            }}
          >
            Password Login
          </button>

          <button
            className={`login-flow-btn ` + (mode === "otp" ? "active" : "")}
            onClick={() => {
              setMode("otp");
              setStep(1);
              reset();
            }}
          >
            OTP Login
          </button>
        </div>

        {/* PASSWORD LOGIN */}
        {mode === "password" && (
          <form onSubmit={handleSubmit(onPasswordLogin)}>

            <input
              className="login-flow-input"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && <small className="login-error-message">Email required</small>}

            <input
              className="login-flow-input"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && <small className="login-error-message">Password required</small>}

            <button className="login-flow-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>
        )}

        {/* OTP STEP 1 */}
        {mode === "otp" && step === 1 && (
          <form onSubmit={handleSubmit(onSendOtp)}>

            <input
              className="login-flow-input"
              placeholder="Enter Email"
              {...register("email", { required: true })}
            />

            <button className="login-flow-btn" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>

          </form>
        )}

        {/* OTP STEP 2 */}
        {mode === "otp" && step === 2 && (
          <form onSubmit={handleSubmit(onVerifyOtp)}>

            <p className="otp-text">
              OTP sent to <b>{otpEmail}</b>
            </p>

            <input
              className="login-flow-input"
              placeholder="Enter OTP"
              {...register("otp", { required: true })}
            />

            <p className="timer-text">
              {timer > 0
                ? `Resend OTP in ${timer}s`
                : "You can resend OTP now"}
            </p>

            <button className="login-flow-btn" disabled={verfying || loading}>
              {verfying ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              disabled={!canResend || loading}
              onClick={handleResendOtp}
              className="resend-btn login-flow-btn"
            >
              Resend OTP
            </button>

          </form>
        )}

        {/* FOOTER */}
        <div className="login-footer">
          <p>Aren't an admin?</p>
          <NavLink to="/">Go to Home</NavLink>
        </div>

      </div>
    </div>
  );
};

export default Login;