import react from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import CommentsList from "../../components/CommentsList/CommentsList";
import "./AddCommentPage.css";
const AddCommentPage = ({}) => {
  const [commentText, setCommentText] = useState("");
  const [user, token] = useAuth();
  const { postId } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Post ID:", postId);
    // console.log("Comment Text:", commentText);
    try {
      const response = await axios.post(
        `https://localhost:5001/api/comments/comments/${postId}`,
        {
          Text: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response data:", response.data);
      alert("Comment submitted!");
    } catch (error) {
      console.log("Error:", error.response.data);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
      <div className="comment-page">
        <CommentsList />
      </div>
    </div>
  );
};

export default AddCommentPage;
