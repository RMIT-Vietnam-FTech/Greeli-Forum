export default function Avatar({ src }) {
  let isNull;
  if(src == null){
    isNull=true;
  }
  else{
    isNull=false;
  }
  return (
    <div className="avatar">
      {isNull?null:<img src={src} className="w-100 h-100" />}
    </div>
  );
}
