import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import "./FavoritesPage.css";

const FavoritesPage = ({}) => {
  const [user, token] = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchFavorites();
  }, [token]);

  //Get all Favorites Displayed here
  const fetchFavorites = async () => {
    try {
      let response = await axios.get(
        "https://localhost:5001/api/favorites/myfavorites",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setFavorites(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  //SearchBar looking to filter through favorites
  const handleSearch = (event) => {
    event.preventDefault();
    const filteredFavorites = favorites.filter((favorite) =>
      favorite.post.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFavorites(filteredFavorites);
  };
  return (
    <div className="flex">
      <h1>Save For Later</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {favorites &&
        favorites.map((favorite) => (
          <div className="container" key={favorite.id}>
            <h3>{favorite.post.title}</h3>
            <h2>{favorite.post.text}</h2>
          </div>
        ))}
    </div>
  );
};

export default FavoritesPage;
