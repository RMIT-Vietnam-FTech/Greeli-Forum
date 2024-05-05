import axios from "axios";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import Avatar from "../../../components/Avatar";
import DropDownPost from "../../../components/DropDownPost";
import ImageOrVideo from "../../../components/ImageOrVideo";
import ButtonUpvote from "./ButtonUpvote";
import TextEditor from "../../../components/TextEditor/TextEditor";
import EditContext from "../../../contexts/EditContext";
import { useContext, useState } from "react";
export default function PostHeader({...prop}) {
  const {profileImage, threadName, username, title, uploadFile, upVote, content} =prop;
  const [isEdit, setIsEdit] = useState(false);
  function toggleIsEdit(){
    setIsEdit(edit=>!edit);
  }
  return (
    <EditContext.Provider value={{isEdit, setIsEdit, toggleIsEdit}}>

    <section className="w-100 position-relative">
      <div className="w-100 d-flex">
        <div className="d-flex gap-2">
          <Avatar src={profileImage} />
          <div className="h-auto">
            <p className="mb-0 text-primary-green-900 fw-bold">
              thread/{threadName}
            </p>
            <p className="mb-0">{username}</p>
          </div>
        </div>
        <DropDownPost isAdmin={false} isCreator={true} flexColumn={false} />
      </div>

      <div className=" my-3 w-100">
        <h3>{title}</h3>
        <div
          className="w-100 my-4 bg-primary-green-600 rounded-3 d-flex justify-content-center overflow-hidden"
          style={{ height: "400px" }}
        >
          <ImageOrVideo src={uploadFile} isPost={false} />
        </div>
        <TextEditor crudType="PUT" componentType="posts" content={content} editableStatus={isEdit==true} allowClickToEditable={false} resetContentWhenDone={false}/>
      </div>
      <div className="d-flex gap-3">
        <ButtonUpvote upVote={upVote} />
      </div>
    </section>
    </EditContext.Provider>
  );
}

