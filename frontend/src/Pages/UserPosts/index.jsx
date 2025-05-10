import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByUserId } from "../../app/actions/post.actions";
import { getPostShareByUserId } from "../../app/actions/postshare.actions";
import Posts from "../../Components/Posts";
import SharedPostsList from "../../Components/SharedPostsList";

function UserPosts() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const postshare = useSelector((state) => state.postshare);
  const [postOptionSelected, setPostOptionSelected] = useState(true);

  useEffect(() => {
    if (userId) {
      dispatch(getPostsByUserId(userId));
      dispatch(getPostShareByUserId(userId));
    }
  }, [dispatch, userId]);

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="d-flex justify-content-center mb-4">
            {postOptionSelected ? (
              <button
                className="btn btn-outline-primary fw-semibold w-100"
                onClick={() => setPostOptionSelected(false)}
              >
                CLICK TO VIEW SHARED PHOTOS
              </button>
            ) : (
              <button
                className="btn btn-outline-primary fw-semibold w-100"
                onClick={() => setPostOptionSelected(true)}
              >
                CLICK TO VIEW PHOTOS
              </button>
            )}
          </div>

          <div className="mt-4">
            {postOptionSelected ? (
              <>
                <h4 className="text-dark fw-bold">Creaters Photos</h4>
                <hr />
                <Posts posts={post.posts} fetchType="GET_ALL_POSTS_USER" />
              </>
            ) : (
              <>
                <h4 className="text-dark fw-bold">Shared Photos</h4>
                <hr />
                <SharedPostsList posts={postshare.posts} fetchType="GET_ALL_POSTS_USER" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPosts;
