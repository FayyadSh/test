import NotFoundImage from "@/assets/svg/lost.svg";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background-color dark:bg-background-dark-color p-4 pt-32">
      <div className="w-full max-w-md">
        <Image 
            src={NotFoundImage}
            width={400}
            height={400}
            alt="not found image"
            className=""
        />
      </div>

      <div className="max-w-md md:max-w-lg text-center md:text-left md:mr-12 mb-8 md:mb-0">
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-light-color mb-4">
          Oops! Page not found.
        </h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a
            href="/"
            className="px-6 py-3 bg-primary hover:bg-teal-600 text-white font-medium rounded-md transition-colors duration-200"
          >
            Go to Homepage
          </a>
          <a
            href="/contact"
            className="px-6 py-3 text-light-color font-medium rounded-lg transition-colors duration-200"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
