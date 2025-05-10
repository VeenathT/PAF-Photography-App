import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByUserId, savePost } from "../../app/actions/post.actions";
import storage from "../../util/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function PostAdd() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const fileInputRef = useRef(null);

  const [caption, setCaption] = React.useState("");
  const [imgLink, setImgLink] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = {
      userId: user.userId,
      caption,
      imgLink,
    };
    await dispatch(savePost(post));
    await dispatch(getPostsByUserId(user.userId));
    setCaption("");
    setImgLink("");
    fileInputRef.current.value = "";
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Please upload an image first!");
      return;
    }

    const storageRef = ref(storage, `/posts/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgLink(url);
        });
      }
    );
  };

  return (
    <div className="container mb-4">
      <div className="card shadow-lg border-0">
        <div className="card-body p-4">
          <h2 className="mb-4 text-primary fw-bold">Share Your Photo</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-semibold">Caption</label>
              <input
                type="text"
                className="form-control rounded-pill px-3 py-2"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write something about your photo..."
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Upload Image</label>
              <input
                type="file"
                className="form-control"
                onChange={uploadImage}
                ref={fileInputRef}
              />
            </div>

            {imgLink && (
              <div className="mb-4">
                <img
                  src={imgLink}
                  alt="Uploaded preview"
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: "400px" }}
                />
              </div>
            )}

            <button type="submit" className="btn btn-success fw-bold rounded-pill px-4 py-2">
              CREATE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostAdd;
