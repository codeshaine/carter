import { ThreeDots } from "react-loader-spinner";
function Loader() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <ThreeDots
        visible={true}
        height="100"
        width="100"
        color="#495057"
        radius="10"
        ariaLabel="three-dots-loading"
        wrapperClass=""
      />
    </div>
  );
}

export default Loader;
