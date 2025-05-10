import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../app/actions/user.actions";

function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState(user?.user?.username);
  const [email, setEmail] = useState(user?.user?.email);
  const [contactNumber, setContactNumber] = useState(user?.user?.contactNumber);
  const [country, setCountry] = useState(user?.user?.country);
  const [profileImage, setProfileImage] = useState(
    user?.user?.profileImage ? user.user.profileImage : null
  );

  useEffect(() => {
    dispatch(getUser(user.userId));
  }, [dispatch]);

  return (
    <div className="container" style={{ maxWidth: "500px" }}>
      <div className="card border-0 shadow-sm p-4">
        <div className="text-center mb-4">
          {profileImage && (
            <img
              src={profileImage}
              className="img-fluid profile-image"
              alt="Profile"
            />
          )}
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Contact Number</label>
          <input
            type="text"
            className="form-control"
            value={contactNumber}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Country</label>
          <input
            type="text"
            className="form-control"
            value={country}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
