type TGlassEffectCard = {
  title: string;
  text: string
}

const GlassEffectCard = ({title, text}: TGlassEffectCard) => {
  return (
    <div className="relative order-6 max-md:w-full border-primary/25 dark:border-gray-900 rounded-lg text-white font-sans">
      {/* Circular background element */}
      <div className="absolute bg-primary rounded-full w-24 h-24 top-1/3 right-7" />
      {/* Vertical border element */}
      <div className="absolute w-2 h-24 right-4" />

      <div className="flex justify-center items-center">
        <div className="w-full flex flex-col justify-between md:w-64 h-80 p-4 bg-background-secondary-color/40 dark:bg-background-dark-secondary-color/30 border border-primary/10 dark:border-white/20 backdrop-blur-xl rounded-lg transition-all ease-in-out duration-300 dark:hover:shadow-lg hover:border-white/40">
          <span className="block text-primary text-2xl font-medium tracking-wider mb-4">
            {title}
          </span>

          <strong className="block text-primary/30 dark:text-slate-300 mb-9">
            {text}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default GlassEffectCard;
