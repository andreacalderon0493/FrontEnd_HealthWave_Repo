import react from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import "./AddPostPage.css";

const AddPostPage = ({}) => {
  const [user, token] = useAuth();

  const handlePost = async (postData) => {
    try {
      let response = await axios.post(
        `https://localhost:5001/api/Posts/posts`,
        postData,
        {
          headers: {
            Authorization: "Bearer " + token, // Replace with your actual token
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.error("An error occurred while posting:", error);
    }
  };

  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    handlePost,
    { text: "" }
  );
  return (
    <div className="addPost">
      <form onSubmit={handleSubmit}>
        <input
          type="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter your post Title"
        />

        <textarea
          className="form"
          type="text"
          name="text"
          value={formData.text}
          onChange={handleInputChange}
          placeholder="Enter your post text"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPostPage;
