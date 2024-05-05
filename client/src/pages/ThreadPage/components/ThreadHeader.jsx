import axios from "axios";
import useSWR from "swr";
import Button from "react-bootstrap/Button";
import { DarkThemeContext } from "../../../contexts/DarkThemeContext";
import { useContext } from "react";
import ImageOrVideo from "../../../components/ImageOrVideo";
import TextEditor from "../../../components/TextEditor/TextEditor";
export default function ThreadHeader({...prop}) {
  const darkTheme = useContext(DarkThemeContext);
  const {title, uploadFile, content} = prop;
  return (
    <section className="w-100">
      <div className="d-flex ">
        <h1 className="title text-primary-green-900">{prop.title}</h1>
        <Button className="ms-3 px-4 btn-primary-green-600 text-white">
          follow thread
        </Button>
      </div>
      <div className="w-100 mt-4 bg-primary-green-600 rounded-3 d-flex justify-content-center overflow-hidden" style={{height:"400px"}}>
        <ImageOrVideo src={prop.uploadFile} isPost={false} />
      </div>
      <div className="w-100 mt-3">
        <TextEditor crudType="PUT" componentType="posts" content={prop.content} editableStatus={false} allowClickToEditable={false} resetContentWhenDone={false}/>
      </div>
      <Button className="w-100 bg-transparent border-primary-green-900 text-primary-green-900 rounded-5 text-start">
        Create Post +
      </Button>
    </section>
  );
}