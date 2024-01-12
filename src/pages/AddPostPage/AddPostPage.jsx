import react from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PostList from "../../components/PostList/PostList";
import PostImage from "../../components/PostImage/PostImage";

const AddPostPage = ({}) => {
  return (
    <div>
      <h1> Add a Post Page</h1>
      <PostImage />
    </div>
  );
};

export default AddPostPage;
