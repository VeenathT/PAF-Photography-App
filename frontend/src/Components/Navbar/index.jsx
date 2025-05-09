import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../../app/actions/user.actions";
import { logout } from "../../app/slices/user.slice";
import Profile from "../../Pages/Profile";
import NotificationDropdown from "../NotificationDropdown";
import UserImage from "../../assets/user.jpeg";

Modal.setAppElement("div");

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    if (
      sessionStorage.getItem("Authorization") &&
      sessionStorage.getItem("userId")
    ) {
      if (!user.loginStatus) {
        dispatch(getUser(sessionStorage.getItem("userId")));
      }
    }

    if (!sessionStorage.getItem("Authorization")) {
      navigate("/login");
    }
  }, [dispatch, user.loginStatus]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark text-light p-3 shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold text-white fs-4" to="/">
            PhotographyLife
          </Link>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon text-light"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

            {!user.loginStatus && (
              <div className="d-flex">
                <Link to="/login" className="btn btn-outline-light me-2 fw-semibold">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary me-2 fw-semibold">
                  Signup
                </Link>
              </div>
            )}

            {user.loginStatus && (
              <div className="d-flex align-items-center">
                <Link className="nav-link me-3 text-light fw-semibold" to="/user">
                  Home
                </Link>
                <Link className="nav-link me-3 text-light fw-semibold" to="/sharedposts">
                  Shared
                </Link>

                <Link
                  onClick={openModal}
                  className="text-light text-decoration-none d-flex align-items-center"
                >
                  <img
                    src={
                      user?.user?.profileImage ? user.user.profileImage : UserImage
                    }
                    className="rounded-circle border border-light me-2"
                    alt="Profile"
                    width="36"
                    height="36"
                  />
                  <span className="fw-bold">{user?.user?.username}</span>
                </Link>

                <NotificationDropdown />

                <button
                  className="btn btn-outline-danger ms-3 fw-semibold"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Profile Modal"
      >
        <div className="p-2">
          <Profile closeModal={closeModal} />
        </div>
      </Modal>
    </div>
  );
}

export default Navbar;
