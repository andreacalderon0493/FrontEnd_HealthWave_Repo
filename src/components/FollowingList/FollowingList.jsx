import axios from "axios";
import react, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const FolllowingList = ({ followings, setFollowings, userId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [user, token] = useAuth();

  const handleFollow = async () => {
    console.log("userId:", userId);
    if (!followings.some((following) => following.Id === userId)) {
      try {
        let response = await axios.post(
          `https://localhost:5001/api/Followings/${userId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.status);
        alert(JSON.stringify(response.data.status));
        setFollowings([...followings, response.data]);
      } catch (error) {
        console.log(error.response.data);
      }
    } else {
      alert("You are already following this user");
    }
  };

  return (
    <div>
      {!isFollowing && (
        <button onClick={() => handleFollow(userId)}>Follow</button>
      )}
    </div>
  );
};

export default FolllowingList;
