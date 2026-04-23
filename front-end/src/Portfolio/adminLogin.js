import "./admin.css"
import { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {


  let navigate = useNavigate()
  const [userLogin, setuserLogin] = useState({ email: "", password: "" });
  const [LoginError, setLoginError] = useState()
  const [LoginSuccess, setLoginSuccess] = useState()
  const [loginBtnstatus, setloginBtnstatus] = useState()
  const [LoginStatus, setLoginStatus] = useState()



  const handleChange = (field, value) => {
    setLoginError()
    setLoginSuccess()
    setuserLogin({ ...userLogin, [field]: value })
  }

  const handleAdminLogin = async () => {
    setloginBtnstatus(true)
    try {
      const { data } = await axios.post(
        "http://localhost:5000/my-portfolio/api/admin/login", userLogin
      );

      if (data?.status?.code === 200) {
        sessionStorage.setItem("token", JSON.stringify(data?.response?.token))
        toast.success(data?.status?.message);
        navigate("/adminPanel/UserMessage")
      } else {
        toast.error(data?.status?.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setloginBtnstatus()
    }
  };

  return (<>


    <div class="Logincontainer">
      <div className="Loginform">
        <h3><b>Plese LogIn</b></h3>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"><b>Email address:</b></label><br />
          <input
            onChange={(e) => { handleChange("email", e.target.value) }}
            type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter Your Email" />

        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label"><b>Password:</b></label><br />
          <input
            onChange={(e) => { handleChange("password", e.target.value) }}
            type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Your Password" />
        </div>
        <div className="Login-btn">
          {loginBtnstatus ? <button class="btn btn-primary" type="button" disabled><span class="spinner-border spinner-border-sm" aria-hidden="true"></span><span role="status">Loading...</span></button>
            : <button style={{ width: "100px" }} onClick={() => { handleAdminLogin() }} type="submit" class="btn btn-primary" id="submit">LogIn</button>}
        </div>
        <div style={{ marginTop: "10px", textAlign: "center" }}><b>Aren't An Admin ?</b> <NavLink to="/"><b style={{ color: "Highlight" }}>Home</b></NavLink></div>
        <div style={{ marginTop: "10px", textAlign: "center" }}><NavLink to="/forgotPassword"><b style={{ color: "Highlight" }}>Forgot Password ?</b></NavLink></div>
        <div>{LoginSuccess ? <b style={{ color: "green" }}>Logged Succesfully , Plese Wait</b> : ""}
          {LoginError ? <b style={{ color: "red" }}>! {LoginError}</b> : ""}
        </div>
      </div>
    </div>



  </>)
}


export default Login