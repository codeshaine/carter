import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-slate-900">404</h1>
        <h2 className="text-3xl font-semibold text-slate-700 mt-4">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-slate-500 mt-2">
          The page you&apos;re looking for doesn&apos;t exist or an error
          occurred.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-slate-800 text-white font-medium text-lg rounded hover:bg-slate-700 transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
