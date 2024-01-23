import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CommentsList.css";

const CommentsList = ({}) => {
  const [comments, setComments] = useState([]);
  const [user, token] = useAuth();
  const { postId } = useParams();

  const fetchComments = async () => {
    try {
      let response = await axios.get(
        `https://localhost:5001/api/Comments/posts/${postId}/comments`,
        {
          headers: {
            Authorization: `Bearer  ${token}`,
          },
        }
      );
      setComments(response.data);
      console.log("Response data:", response.data);
    } catch (error) {
      console.log("Error:", error.response.data);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [token]);

  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <div className="comment-list" key={comment.id}>
            <h3>{comment.user.userName}</h3>
            <h3>{comment.title}</h3>
            <h2>{comment.text}</h2>
          </div>
        ))}
    </div>
  );
};

export default CommentsList;
