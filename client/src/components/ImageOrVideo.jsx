import ReactPlayer from "react-player";
export default function ImageOrVideo({ src }) {
  console.log("check src: " + src);
  const videoType = ["mpg", "mp2", "mpeg", "mpe", "mpv", "mp4"];
  const imageType = ["gif", "jpg", "jpeg", "png"];
  const type = src.split(".").pop();
  if (imageType.includes(type)) {
    return (
        <img className="h-100" src={src} />
    );
  } else {
    return (
      <video
      className="h-100"
        src={src}
        controls
      ></video>
    );
  }
}
