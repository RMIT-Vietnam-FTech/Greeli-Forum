import axios from "axios";
import Post from "../PostPage/components/Post";
const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function ThreadBody({ ...prop }) {
	const { posts } = prop;
	return posts.map((postId) => {
		return <Post key={postId} postId={postId} />;
	});
}
