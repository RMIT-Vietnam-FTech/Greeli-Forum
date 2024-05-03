import "../scss/custom.css";
import axios from "axios";
import useSWR from 'swr';
import ImageOrVideo from "./ImageOrVideo";
const fetcher = url => axios.get(url).then(res => res.data);
export function Post({postId}){
const {data, error, isLoading} = useSWR('http://localhost:9000/posts', fetcher);
   if(error){
     return 0; 
   }
   if(isLoading){
      return 0;
   }
   console.log("postId: "+ postId);
   console.log("post data: "+data[postId]);
   return(
    <section className="w-100 p-4 bg-primary-900 d-flex gap-2 justify-content-between position-relative">
        <div className="w-25"></div>
        <div className="w-75"></div>
    </section>
   );
}