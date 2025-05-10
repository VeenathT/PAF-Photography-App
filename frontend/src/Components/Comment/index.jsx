import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { MdDoneOutline } from "react-icons/md";
import UserImage from "../../assets/user.jpeg";
import { getPosts, getPostsByUserId } from "../../app/actions/post.actions";
import {
  deleteCommentById,
  updateCommentById,
} from "../../app/actions/comment.actions";

function Comment({ postId, comment, postUserId, fetchType }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [commentEditable, setCommentEditable] = useState(false);
  const [text, setText] = useState(comment.text);

  const handleSubmitComment = async () => {
    const updatedComment = {
      id: comment.id,
      postId: postId,
      userId: user.userId,
      text: text,
    };
    dispatch(updateCommentById(updatedComment));

    if (fetchType === "GET_ALL_POSTS") await dispatch(getPosts());
    if (fetchType === "GET_ALL_USER_POSTS") await dispatch(getPostsByUserId(postUserId));
    if (fetchType === "GET_ALL_POSTS_USER") await dispatch(getPostsByUserId(postUserId));

    setCommentEditable(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteCommentById(comment.id));
    if (fetchType === "GET_ALL_POSTS") await dispatch(getPosts());
    if (fetchType === "GET_ALL_USER_POSTS") await dispatch(getPostsByUserId(postUserId));
    if (fetchType === "GET_ALL_POSTS_USER") await dispatch(getPostsByUserId(postUserId));
  };

  return (
    <div className="bg-light rounded p-3 mb-2 shadow-sm d-flex align-items-start">
      <img
        src={comment.profileImage || UserImage}
        className="rounded-circle me-3"
        style={{ width: "40px", height: "40px", objectFit: "cover" }}
        alt="Profile"
      />

      <div className="flex-grow-1">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <strong className="text-dark">{comment.username}</strong>
            {commentEditable ? (
              <input
                type="text"
                className="form-control form-control-sm mt-1"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            ) : (
              <p className="mb-1">{comment.text}</p>
            )}
          </div>

          <div className="d-flex align-items-center ms-3">
            {commentEditable ? (
              <>
                <GiCancel
                  className="text-secondary me-2"
                  size={18}
                  style={{ cursor: "pointer" }}
                  onClick={() => setCommentEditable(false)}
                  title="Cancel"
                />
                <MdDoneOutline
                  className="text-success"
                  size={18}
                  style={{ cursor: "pointer" }}
                  onClick={handleSubmitComment}
                  title="Save"
                />
              </>
            ) : (
              user.userId === comment.userId && (
                <AiFillEdit
                  className="text-primary me-2"
                  size={18}
                  style={{ cursor: "pointer" }}
                  onClick={() => setCommentEditable(true)}
                  title="Edit"
                />
              )
            )}

            {(user.userId === comment.userId || user.userId === postUserId) && !commentEditable && (
              <AiFillDelete
                className="text-danger"
                size={18}
                style={{ cursor: "pointer" }}
                onClick={handleDelete}
                title="Delete"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
