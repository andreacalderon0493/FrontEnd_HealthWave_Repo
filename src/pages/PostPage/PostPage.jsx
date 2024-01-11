import react from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PostList from "../../components/PostList/PostList";

const PostPage = ({}) => {
  return (
    <div>
      <h1>Post Page</h1>
      <PostList />
    </div>
  );
};

export default PostPage;
