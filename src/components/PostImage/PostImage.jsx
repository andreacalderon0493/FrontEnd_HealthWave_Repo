import axios from "axios";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function ImageForm() {
  // State variables for the form inputs
  const [title, setTitle] = useState("");
  //   const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [user, token] = useAuth();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // Append form data to the FormData object
    formData.append("title", title);
    // formData.append("description", description);
    formData.append("image_url", image);
    try {
      // Send a POST request with the form data to the server
      const response = await axios.post(
        "https://localhost:5001/api/image/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );
      // Log the response data
      console.log(response.data);
    } catch (er) {
      // Log any error response data
      console.log(er.response.data);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      /> */}
      {/* <label>Description:</label>
      <input
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      /> */}

      {/* Image file input */}
      <input
        type="file"
        accept="image/jpeg,image/png,image/gif"
        onChange={(e) => setImage(e.target.files[0])}
      />
      {/* <button type="submit">Submit Photo!</button> */}
    </form>
  );
}
