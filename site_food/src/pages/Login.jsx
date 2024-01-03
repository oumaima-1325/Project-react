import { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../userService";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await login(data.email, data.password);
    if (res.token) {
      localStorage.setItem("token", res.token);
      navigate("/");
    } else {
      setError(res);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <p className="title">Login</p>
        <form className="form">
          <div className="input-group">
            <label htmlFor="email">Email</label>

            <input
              type="email"
              name="email"
              id="email"
              placeholder=""
              value={data.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder=""
              value={data.password}
              onChange={handleChange}
            />

            <div className="forgot">
              <a rel="noopener noreferrer" href="#">
                Forgot Password ?
              </a>
            </div>
          </div>

          <button className="sign" onClick={handleSubmit}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
