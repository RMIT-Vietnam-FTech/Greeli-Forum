import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { TbAccessPointOff } from "react-icons/tb";
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderWidth: 1,
  borderRadius: "15px",
  borderColor: "black",
  borderStyle: "solid",
  backgroundColor: "transparent",
  color: "black",
  outline: "none",
  transition: "border .24s ease-in-out",
  height: "20%",
};

const focusedStyle = {
  borderColor: "#33FF00",
  borderWidth: "3px",
};

const acceptStyle = {
  borderColor: "#DBB968",
  borderWidth: "3px",
  color: "#DBB968",
};

const rejectStyle = {
  borderWidth: "3px",
  borderColor: "red",
  color: "red",
};
export default function DropZoneFile({ file, setFile, isReset }) {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
      "image/webp": [],
      "video/mp4": [],
      "video/webm": [],
    },
    maxFiles: 1,
    maxSize: 1024 * 1024 * 10,
    onDropAccepted: (file) => {
      setFile(file);
    },
    onDropRejected: () => {
      setFile(null);
      acceptedFiles.length = 0;
    },
  });
  if (isReset) {
    acceptedFiles.length = 0;
    fileRejections.length = 0;
  }
  const acceptedFileItem = acceptedFiles.map((file) => (
    <span key={file.path}>
      {file.path} - {file.size} bytes
    </span>
  ));
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(acceptedFiles.length > 0 ? acceptStyle : {}),
      ...(fileRejections.length > 0 ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  let _URL = window.URL || window.webkitURL;

  let url;
  let type;
  if (acceptedFiles.length > 0) {
    url = _URL.createObjectURL(acceptedFiles[0]);
    type = acceptedFiles[0].type.split("/")[0];
  }
  return (
    <>
      <div
        tabIndex="0"
        className="w-100 h-100 overflow-hidden position-relative "
        {...getRootProps({ style })}
      >
        <input {...getInputProps()} name="uploadFile" />
        {!file ? (
          <h4>Drop or Drag or click to Upload</h4>
        ) : (
          <>
            <div
              className="h-100 overflow-hidden"
              style={{ borderRadius: "20px" }}
            >
              {type === "image" ? (
                <img className="mx-auto h-100" src={url} />
              ) : (
                <video className="mx-auto h-100" src={url}></video>
              )}
            </div>
            <h4>Drop or Drag or Click to Replace</h4>
          </>
        )}
      </div>
    </>
  );
}
