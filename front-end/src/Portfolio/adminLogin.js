import "./admin.css"
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { postAdminLogin } from "../network/portfolioApiService/portfolioApiService";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  let navigate = useNavigate()
  const [loginBtnstatus, setloginBtnstatus] = useState()

  const handleAdminLogin = async (data) => {
    setloginBtnstatus(true);

    try {
      const res = await postAdminLogin(data);
      if (res?.status?.code === 200) {
        localStorage.setItem("token", JSON.stringify(res?.response?.token));
        toast.success(res?.status?.message);
        navigate("/admin-panel/user-messages");
      } else {
        toast.error(res?.status?.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setloginBtnstatus(false);
    }
  };

  return (<>


    <div class="Logincontainer">
      <div className="Loginform">
        <h3><b>Plese LogIn</b></h3>
        <form onSubmit={handleSubmit(handleAdminLogin)}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"><b>Email address:</b></label><br />
            <input
              type="email"
              className="form-control"
              placeholder="Enter Your Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter valid email address",
                },
              })}
            />

            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}

          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"><b>Password:</b></label><br />
            <input
              type="password"
              className="form-control"
              placeholder="Enter Your Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />

            {errors.password && (
              <p style={{ color: "red" }}>{errors.password.message}</p>
            )}
          </div>
          <div className="Login-btn">
            {loginBtnstatus ? <button class="btn btn-primary" type="button" disabled><span class="spinner-border spinner-border-sm" aria-hidden="true"></span><span role="status">Loading...</span></button>
              : <button style={{ width: "100px" }} type="submit" class="btn btn-primary" id="submit">LogIn</button>}
          </div>
        </form>
        <div style={{ marginTop: "10px", textAlign: "center" }}><b>Aren't An Admin ?</b> <NavLink to="/"><b style={{ color: "Highlight" }}>Home</b></NavLink></div>
        <div style={{ marginTop: "10px", textAlign: "center" }}><NavLink to="/forgotPassword"><b style={{ color: "Highlight" }}>Forgot Password ?</b></NavLink></div>
      </div>
    </div>



  </>)
}


export default Login