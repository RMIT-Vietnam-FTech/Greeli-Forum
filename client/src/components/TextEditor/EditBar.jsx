
import {useCurrentEditor} from "@tiptap/react";
import EditableContext from "../../contexts/EditableContext";
import { useContext, useEffect } from "react";
export default function EditBar({ reset, crudType, componentType }) {
  const EditBarContext = useContext(EditableContext);
  const { editor } = useCurrentEditor();
  if(!editor.isEditable){
    editor.setEditable(true);
  }
  function handleOnCancle() {
    editor.setEditable(false);
    EditBarContext.toggleEditable();
      editor.commands.setContent(EditBarContext.content);
  }
  function handleOnDone(reset){
    editor.setEditable(false);
    EditBarContext.toggleEditable();
    if(reset){
        editor.commands.clearContent();
    }
    // store data in database
    //command PUT or POST  on what link
    //--> POST when edit, PUT when create, pass type and 
    console.log("crud type:"+crudType);
    console.log("component type: "+ componentType);
    console.log(editor.getJSON(EditBarContext.content));
  }
  return (
    <div className="d-flex justify-content-end gap-3 w-80 mx-auto px-3">
      <button
        onClick={handleOnCancle}
        className="btn border-primary-green btn-primary-green"
      >
        Cancel
      </button>
      <button
        onClick={() => handleOnDone(reset)}
        className="btn border-primary-green btn-primary-green"
      >
        Done
      </button>
    </div>
  );
}