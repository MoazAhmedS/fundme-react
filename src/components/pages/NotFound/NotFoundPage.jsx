import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-gray-100">
      <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
      <p className="text-xl text-purple-700 mb-6">Oops! Page not found.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
