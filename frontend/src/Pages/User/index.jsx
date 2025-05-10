import React, { useEffect } from "react";
import Posts from "../../Components/Posts";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByUserId } from "../../app/actions/post.actions";
import PostAdd from "../../Components/PostAdd";

function User() {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.userId) {
      dispatch(getPostsByUserId(user.userId));
    }
  }, [dispatch, user.userId]);

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="text-dark fw-bold mb-4">My Photography Wall</h2>
          <PostAdd />
          <Posts posts={post.posts} fetchType="GET_ALL_USER_POSTS" />
        </div>
      </div>
    </div>
  );
}

export default User;
