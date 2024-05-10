import { useContext } from "react";

import { DarkThemeContext } from "../../contexts/DarkThemeContext";

import ImageOrVideo from "../../components/forum/ImageOrVideo";
import TextEditor from "../../components/forum/TextEditor/TextEditor";
import AuthComponent from "../../components/forum/AuthComponent";

import Button from "react-bootstrap/Button";
import DropDown from "../../components/forum/DropDown";

export default function ThreadHeader({ ...prop }) {
  const { title, uploadFile, content, objectId } = prop;
  return (
      <AuthComponent componentType="threads" objectId={objectId} >

    <section className="w-100">
      <div className="d-flex position-relative">
        <h1 className="title text-primary-green-900">{title}</h1>
          <Button className="ms-3 px-4 btn-primary-green-600 text-white">
            follow thread
          </Button>
          <DropDown componentType="threads"/>
      </div>

      <div
        className="w-100 mt-4 bg-primary-green-600 rounded-3 d-flex justify-content-center overflow-hidden"
        style={{ height: "400px" }}
      >
        <ImageOrVideo src={uploadFile} isPost={false} />
      </div>

      <div className="w-100 mt-3">
        <TextEditor
          crudType="PUT"
          componentType="posts"
          content={content}
          editableStatus={false}
          allowClickToEditable={false}
          resetContentWhenDone={false}
        />
      </div>

      <Button className="w-100 bg-transparent border-primary-green-900 text-primary-green-900 rounded-5 text-start">
        Create Post +
      </Button>
    </section>
      </AuthComponent>

  );
}
