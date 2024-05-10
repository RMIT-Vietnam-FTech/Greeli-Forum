import axios from "axios";
import Post from "../../components/forum/Post";
const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function ThreadBody({ ...prop }) {
	const { posts } = prop;
	return posts.map((postId) => {
		return <Post key={postId} postId={postId}></Post>;
	});
}
