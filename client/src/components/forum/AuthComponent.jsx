import { useState, useRef } from "react";
import { useParams } from "react-router-dom";

import EditContext from "../../contexts/AuthContext";

import useSWR from "swr";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function AuthComponent({
  componentType,
  unAuthorizedProcess,
  children,
  objectId,
}) {
  //testing
  console.log("\n\ndisplay auth data:");
  console.log("check input:");
  console.log("componentType: " + componentType);
  console.log("unAuthorizedProcess: "+ unAuthorizedProcess);
  const username = "user2";
  const profileImage = "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-1/111112726_975766876189942_8939912075759162480_n.jpg?stp=dst-jpg_p480x480&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGADP4zo6K-PrEMelsLKA_SxodS2ZBrZZ3Gh1LZkGtlnVtENJGXDWEdWpnSSdfYvETu6osq992rv7m9JuiVoqZN&_nc_ohc=xCCHpNIx4woQ7kNvgH197in&_nc_ht=scontent-hkg4-1.xx&oh=00_AfCpz4yDT8nGGOo9PebZCP2ew71Dp2mgAjclW7TkPilrQA&oe=665B1A31";
  const userId = "439ea295-4b01-4664-a213-bbb908efda5e";
  const isAuthor = useRef(false);
  const [isEdit, setIsEdit] = useState(false);

  function toggleIsEdit() {
    setIsEdit((edit) => !edit);
  }

  const { data, error, isLoading } = useSWR(
    !unAuthorizedProcess || componentType=="comments"
      ? "http://localhost:9000/api/v1/" + componentType + "/" + objectId
      : null,
    fetcher
  );
  if (error) {
    return "error";
  }
  if (isLoading) {
    return "is loading";
  }

  if (!unAuthorizedProcess && data.createBy.username == username) {
    isAuthor.current = true;
  }
  console.log("\n\ncheck output: ");
  console.log(data);
  //console.log("creator: " + data.createBy.username);
   console.log("object id: "+ objectId);
   console.log("unAuthorizedProcess: "+unAuthorizedProcess);
    console.log("isAuthor: "+isAuthor.current);
    console.log("isEdit: "+isEdit);
    console.log("componentType: " + componentType);
  return (
    <AuthContext.Provider
      value={{ isAuthor, isEdit, toggleIsEdit, componentType, username, profileImage}}
    >
      {children}
    </AuthContext.Provider>
  );
}
