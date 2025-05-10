import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUserById } from "../../app/actions/user.actions";
import storage from "../../util/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import UserProfile from "./userProfile";

function Profile(props) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const userUpdate = {
      id: user.user.id,
      username,
      email,
      contactNumber,
      country,
      profileImage,
    };
    dispatch(updateUserById(userUpdate));
    props.closeModal();
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Please upload an image first!");
      return;
    }

    const storageRef = ref(storage, `/users/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setProfileImage(url);
        });
      }
    );
  };

  return (
    <div className="container" style={{ maxWidth: "500px" }}>
      <div className="card shadow-sm border-0 p-3">
        <h4 className="text-center fw-bold text-primary mb-3">My Profile</h4>
        <ul className="nav nav-tabs mb-3" id="profileTabs" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="view-tab"
              data-bs-toggle="tab"
              data-bs-target="#view"
              type="button"
              role="tab"
            >
              View
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="edit-tab"
              data-bs-toggle="tab"
              data-bs-target="#edit"
              type="button"
              role="tab"
            >
              Edit
            </button>
          </li>
        </ul>

        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="view"
            role="tabpanel"
            aria-labelledby="view-tab"
          >
            <UserProfile />
          </div>

          <div
            className="tab-pane fade"
            id="edit"
            role="tabpanel"
            aria-labelledby="edit-tab"
          >
            <form onSubmit={handleSubmit} className="mt-3">
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
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Country</label>
                <input
                  type="text"
                  className="form-control"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="mb-3">
                {profileImage && (
                  <img
                    src={profileImage}
                    className="img-fluid rounded mb-2"
                    alt="Profile"
                  />
                )}
                <label className="form-label fw-semibold">Profile Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={uploadImage}
                />
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger w-100 mt-2"
                  onClick={() =>
                    setProfileImage(
                      "https://i.discogs.com/57iTb7iRduipsfyksYodpaSpz_eEjtg52zPBhCwBPhI/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTY5Nzg2/ODEtMTU0OTgxMTIz/OC02NjMxLmpwZWc.jpeg"
                    )
                  }
                >
                  Remove Profile Picture
                </button>
              </div>

              <button
                type="button"
                className="btn btn-outline-secondary w-100 mb-2"
                onClick={props.closeModal}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-outline-success w-100 mb-2">
                Update
              </button>
              <button className="btn btn-outline-danger w-100">Delete</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
