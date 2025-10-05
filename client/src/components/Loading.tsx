import loadingIcon from "../assets/loading.svg";
function Loading({ classname }: { classname?: string }) {
  return (
    <div className={`${classname ? classname : "w-5 h-5"}`}>
      <img src={loadingIcon} className="w-full h-full" />
    </div>
  );
}
export default Loading;
