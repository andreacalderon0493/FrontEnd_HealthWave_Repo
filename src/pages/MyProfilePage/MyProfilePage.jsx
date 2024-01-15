import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";

const MyProfilePage = ({}) => {
  const [user, token] = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getMyPosts();
  }, [token]);

  const getMyPosts = async () => {
    try {
      let response = await axios.get(
        "https://localhost:5001/api/posts/myPosts",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("Response:", response);
      setPosts(response.data);
      console.log("Data:", response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      {posts &&
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.text}</h2>
            <h3>{post.likes}</h3>
          </div>
        ))}
    </div>
  );
};

export default MyProfilePage;
