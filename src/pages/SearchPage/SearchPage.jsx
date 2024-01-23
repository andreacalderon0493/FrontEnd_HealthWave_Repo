import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SearchPage = ({}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [originalPosts, setOriginalPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:5001/api/posts")
      .then((response) => {
        setOriginalPosts(response.data);
        setFilteredPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts", error);
      });
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredPosts(originalPosts); // Reset filteredPosts to originalPosts if no search term
      return;
    }

    const filtered = originalPosts.filter((post) => {
      return post.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredPosts(filtered);
  }, [searchTerm]);

  return (
    <div>
      <div>
        <label>Search</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
        <button type="submit">Submit</button>
      </div>

      {filteredPosts &&
        filteredPosts.map((post) => (
          <div key={post.id}>
            <a href={`/post/${post.id}`}>{post.title}</a>
          </div>
        ))}
    </div>
  );
};

export default SearchPage;
