import React, { useEffect } from "react";
import Posts from "../../Components/Posts";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../app/actions/post.actions";
import NewUsersSuggest from "../../Components/NewUsersSuggest";

function Home() {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="container mt-4 mb-5">
      <div className="row">
        <div className="col-md-2 d-none d-md-block"></div>

        <div className="col-md-7">
          <h2 className="mb-4 fw-bold text-dark">Photography Feed</h2>
          <Posts posts={post.posts} fetchType="GET_ALL_POSTS" />
        </div>

        <div className="col-md-3 mt-3 mt-md-0">
          <div className="p-3 bg-light rounded shadow-sm">
            <h5 className="fw-semibold mb-3 text-primary">Suggested Creators</h5>
            <NewUsersSuggest />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
