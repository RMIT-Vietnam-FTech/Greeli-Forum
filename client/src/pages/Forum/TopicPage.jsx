import { useParams } from "react-router-dom";
import useSWR from "swr";
import PostList from "./ThreadPage/PostList";
import axios from "axios";
import useSwr from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function TopicPage(){
    const {topicId} = useParams();
  const path = `http://localhost:3001/api/v1/topics/${topicId}`;
  const { data, error, isLoading } = useSwr(path, fetcher);
  if(error){
    return 0;
  }
  if(isLoading){
    return 1;
  }
  console.log(data);
    return(
        <PostList topicData={data}/>
    );
}