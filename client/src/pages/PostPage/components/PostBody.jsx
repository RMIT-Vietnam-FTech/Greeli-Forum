import Comment from "../../../components/Comment";
export default function PostBody({comments}){
    return(
        <section className="w-100">
            {
                comments.map(commentId=>{
                    console.log(commentId)
                    //return <Comment key={commentId} commentId={commentId}/>
                })
            }
        </section>
    );
}