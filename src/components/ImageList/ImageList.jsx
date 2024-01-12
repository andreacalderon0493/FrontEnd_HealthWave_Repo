import axios from "axios";
import react from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ImageList() {
  // State variable to hold the list of images
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch the list of images when the component mounts
    fetchImages();
  }, []);

  // Fetch the list of images from the Django backend
  const fetchImages = async () => {
    try {
      // Send a GET request to retrieve the list of images from the server
      const response = await axios.get("https://localhost:5001/api/image/");
      // Log the response to verify youre getting the correct response
      console.log(response.data);
      // Update the state with the fetched images
      setImages(response.data);
    } catch (error) {
      // Log any error that occurs during the request
      console.error(error);
    }
  };
  return (
    <div>
      {/* Render each image in the list */}
      {images.map((image) => (
        <div>
          <img src={image.imageSrc} alt={image.title} width="250" />
          <div>
            {/* <h2>{image.title}</h2> */}
            {/* <p>{image.description}</p> */}
          </div>
        </div>
      ))}
    </div>
  );
}
