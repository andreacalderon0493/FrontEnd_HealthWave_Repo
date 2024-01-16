import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
          <div key={comment.id}>
            <p>{comment.user.userName}</p>
            <p>{comment.text}</p>
          </div>
        ))}
    </div>
  );
};

export default CommentsList;
