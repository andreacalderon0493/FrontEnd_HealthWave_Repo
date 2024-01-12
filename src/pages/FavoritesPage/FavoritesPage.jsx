import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";

const FavoritesPage = ({}) => {
  const [user, token] = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, [token]);

  //Get all Favorites Displayed here
  const fetchFavorites = async () => {
    try {
      let response = await axios.get(
        "https://localhost:5001/api/favorites/myFavorites",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setFavorites(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div>
      <h1>Saved</h1>
      {favorites &&
        favorites.map((favorite) => (
          <div key={favorite.id}>{<h2>{favorite.post.text}</h2>}</div>
        ))}
    </div>
  );
};

export default FavoritesPage;
