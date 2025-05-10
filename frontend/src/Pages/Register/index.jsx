import React from "react";
import { useDispatch } from "react-redux";
import { register } from "../../app/actions/user.actions";

function Register() {
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, password };
    dispatch(register(user));
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="card shadow-lg p-4" style={{ maxWidth: "450px", width: "100%" }}>
        <div className="card-body">
          <h2 className="text-center mb-4 text-primary fw-bold">SignUp </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-semibold">Username</label>
              <input
                type="text"
                className="form-control rounded-pill px-3 py-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
              />
              <div className="form-text">We'll never share your username.</div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control rounded-pill px-3 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-success fw-bold rounded-pill py-2">
                SIGN UP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
