import loadingIcon from "../assets/loading.svg";
function Loading() {
  return (
    <div className="w-5 h-5">
      <img src={loadingIcon} className="w-full h-full" />
    </div>
  );
}
export default Loading;
