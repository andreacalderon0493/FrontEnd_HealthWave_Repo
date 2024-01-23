import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import "./MyProfilePage.css";

const MyProfilePage = ({}) => {
  const [user, token] = useAuth();
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState({});

  useEffect(() => {
    getMyPosts();
  }, [token]);

  const getMyPosts = async () => {
    try {
      let response = await axios.get(
        "https://localhost:5001/api/posts/AllPosts",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      // setPosts(response.data);
      setAllPosts(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="profile">
      {allPosts &&
        allPosts.posts &&
        allPosts.posts.map((post) => (
          <div className="posts" key={post.id}>
            <h3>{post.user.userName}</h3>
            <h3>{post.title}</h3>
            <h2>{post.text}</h2>
          </div>
        ))}
      {allPosts &&
        allPosts.sharedPosts &&
        allPosts.sharedPosts.map((sharedPost) => (
          <div className="posts" key={sharedPost.id}>
            <h3>Repost from {sharedPost.post.user.userName} </h3>
            <h3>{sharedPost.post.title}</h3>
            <h2>{sharedPost.post.text}</h2>
          </div>
        ))}

      {/* {posts &&
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.text}</h2>
            <h3>{post.likes}</h3>
          </div>
        ))} */}
    </div>
  );
};

export default MyProfilePage;
