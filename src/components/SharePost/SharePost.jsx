import axios from "axios";
import react from "react";
import useAuth from "../../hooks/useAuth";
import "./SharePost.css";

const SharePost = ({ postId }) => {
  const [user, token] = useAuth();
  const handleShare = async () => {
    try {
      let response = await axios.post(
        `https://localhost:5001/api/sharedPosts/sharedPosts/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert("The post has been successfully shared!");
      } else {
        alert("An error occurred while sharing the post. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while sharing the post. Please try again.");
    }
  };

  return (
    <div>
      <button className="sort-button-share" onClick={handleShare}></button>
    </div>
  );
};

export default SharePost;
