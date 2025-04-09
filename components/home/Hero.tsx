// ------------ Components ----------------
import { SparkleButton, HeroShape } from "../ui";

const Hero = () => {
  return (
    <section className="bg-background-color dark:bg-background-dark-color transition-all relative pt-32  sm:pt-44 lg:pt-0 flex flex-col-reverse md:flex-row items-center jsutify-center md:justify-between px-6 sm:px-16 lg:px-40">
      <div className="py-20 md:py-72 relative z-20">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-teal-100  via-primary/90 to-primary bg-clip-text text-transparent">
          All Your Digital Products
          <strong className="font-extrabold sm:block bg-gradient-to-r from-primary to-teal-50 bg-clip-text text-transparent">
            Is One Click Away
          </strong>
        </h1>

        <p className="btn-shine my-4 sm:text-xl/relaxed text-transparent  py-3 font-semibold text-lg bg-clip-text bg-gradient-to-r from-gray-500 to-primary via-gray-300 animate-shine">
          Start Exploring State of the Art Assets
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <SparkleButton text="Get Started" />
          <a
            className="block rounded pl-4 py-3 text-sm font-medium text-primary hover:text-teal-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
            href="#"
          >
            Learn More
          </a>
        </div>
      </div>

      <HeroShape />
    </section>
  );
};

export default Hero;
