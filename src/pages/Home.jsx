import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-x-4 bg-[url('https://www.orangehrm.com/assets/Uploads/Leave-Time-Off-Management-System.jpg')] bg-no-repeat bg-cover object-cover before:content-[''] before:absolute before:w-full before:h-full before:bg-black before:opacity-70 top-0 right-0 -z-30">
      <h1 className="text-6xl text-white font-extrabold leading-tight tracking-wide relative">
        Easy <span className="text-red-500">Leave</span>
      </h1>
      <h3 className="my-8 relative text-white text-3xl font-light tracking-wider">
        Request A Leave
      </h3>
      <div className="flex gap-x-6 relative">
        <Link
          to="/sign-up"
          className="text-lg font-medium text-white border border-white px-8 py-3 rounded-lg transition duration-300 hover:bg-white hover:text-black hover:shadow-lg"
        >
          Sign Up
        </Link>
        <Link
          to="/log-in"
          className="text-lg font-medium text-white border border-white px-8 py-3 rounded-lg transition duration-300 hover:bg-white hover:text-black hover:shadow-lg"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default Home;
