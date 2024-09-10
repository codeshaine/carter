import { MutatingDots } from "react-loader-spinner";
function SubLoader() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#495057"
        secondaryColor="#00000"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default SubLoader;
