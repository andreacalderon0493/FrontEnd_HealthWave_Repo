import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SearchPage = ({}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(null);
  useEffect(() => {
    axios
      .get("https://localhost:5001/api/posts")
      .then((response) => {
        setFilteredPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (!value) {
      setFilteredPosts(null);
      return;
    }

    const filtered = filteredPosts.filter((post) => {
      return post.text.includes(value);
    });

    setFilteredPosts(filtered);
  };

  return (
    <div>
      <div className="flex-item">
        <label>Search</label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
        <button type="submit">Submit</button>
      </div>

      {filteredPosts &&
        filteredPosts.map((post) => (
          <div key={post.id}>
            <a href={`/post/${post.id}`}>{post.text}</a>
          </div>
        ))}
    </div>
  );
};

export default SearchPage;
