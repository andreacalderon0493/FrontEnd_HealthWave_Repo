import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import PostList from "../../components/PostList/PostList";
import ImageList from "../../components/ImageList/ImageList";
import axios from "axios";
import { Link } from "react-router-dom";
import FolllowingList from "../../components/FollowingList/FollowingList";

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

  const handleFavorite = async (id) => {
    try {
      let response = await axios.post(
        `https://localhost:5001/api/Favorites/favorites/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      alert(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleLike = async (id) => {
    try {
      let response = await axios.post(
        `https://localhost:5001/api/Likes/likes/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      alert(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Home Page for {user.userName}!</h1>
      {posts &&
        posts.map((post) => (
          <div key={post.id}>
            <p>{post.user.userName}</p>
            <FolllowingList />
            <p>{post.text}</p>
            <button onClick={() => handleFavorite(post.id)}>Favorite</button>
            <button onClick={() => handleLike(post.id)}>
              Like {post.like}
            </button>
            <button
              onClick={() => (window.location.href = `/addcomment/${post.id}`)}
            >
              Add Comment
            </button>
          </div>
        ))}
      <PostList />
      <ImageList />
    </div>
  );
};

export default HomePage;
