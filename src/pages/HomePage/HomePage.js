import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import PostList from "../../components/PostList/PostList";
import ImageList from "../../components/ImageList/ImageList";
import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains user information (id, userName, email) from the decoded token
  // The "token" value is the JWT token sent from the backend that you will send back in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [token]);

  const fetchPosts = async () => {
    try {
      let response = await axios.get("https://localhost:5001/api/posts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="container">
      {console.log(user)}
      <h1>Home Page for {user.userName}!</h1>
      {posts && posts.map((post) => <p key={post.id}>{post.text}</p>)}
      <PostList />
      <ImageList />
    </div>
  );
};

export default HomePage;
