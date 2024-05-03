import useSWR from "swr";
import axios from "axios";
import Post from "../../../components/Post";
const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function ThreadBody({ ...prop }) {
  const { posts } = prop;
  let postItems = [];
  for(let i = 0; i < posts.length; ++i){
    postItems.push(
        <Post key={posts[i]} postId={posts[i]}></Post>
    );
  }
  return(
    <>
    {postItems}
    </>
  );
}
