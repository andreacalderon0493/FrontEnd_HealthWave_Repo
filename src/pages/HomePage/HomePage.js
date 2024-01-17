import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
//components
import ImageList from "../../components/ImageList/ImageList";
import FolllowingList from "../../components/FollowingList/FollowingList";
import SharePost from "../../components/SharePost/SharePost";

const HomePage = () => {
  // The "user" value from this Hook contains user information (id, userName, email) from the decoded token
  // The "token" value is the JWT token sent from the backend that you will send back in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [posts, setPosts] = useState([]);
  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [token]);

  useEffect(() => {
    const fetchFollowings = async () => {
      try {
        let response = await axios.get(
          "https://localhost:5001/api/followings/myFollowings",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setFollowings(response.data);
        // console.log("response.data:", response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchFollowings();
  }, [token]);

  const fetchPosts = async () => {
    try {
      let response = await axios.get("https://localhost:5001/api/posts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setPosts(response.data);
      console.log("response.data:", response.data);
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
      // console.log(response);
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
      //console.log(response.data);
      alert(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Welcome {user.userName}!</h1>
      {posts &&
        posts.map((post) => (
          <div key={post.id}>
            <h3>{post.user.userName}</h3>
            <FolllowingList
              followings={followings}
              setFollowings={setFollowings}
              userId={post.user.id}
            />
            <h2>{post.title}</h2>
            <h3>{post.text}</h3>
            <button onClick={() => handleFavorite(post.id)}>Favorite</button>
            <button onClick={() => handleLike(post.id)}>
              Like {post.like}
            </button>
            <button
              onClick={() => (window.location.href = `/addcomment/${post.id}`)}
            >
              Add Comment
            </button>
            <SharePost postId={post.id} />
          </div>
        ))}
      <ImageList />
    </div>
  );
};

export default HomePage;
