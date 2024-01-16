import axios from "axios";
import react from "react";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const FolllowingList = ({}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [user, token] = useAuth();

  const handleFollow = async (acceptingId) => {
    try {
      const response = await axios.post(
        `https://localhost:5001/api/Followings/${acceptingId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setIsFollowing(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>{!isFollowing && <button onClick={handleFollow}>Follow</button>}</div>
  );
};

export default FolllowingList;
