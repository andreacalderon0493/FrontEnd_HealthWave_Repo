import { useParams } from "react-router-dom";
import axios from "axios";

const PostPage = ({}) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`https://localhost:5001/api/posts/${id}`)
      .then((response) => setPost(response.data))
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{post.text}</p>
    </div>
  );
};

export default PostPage;
