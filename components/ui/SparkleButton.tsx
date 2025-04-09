// ------------ Icons ----------------
import { SparkleIcon } from 'lucide-react';

const SparkleButton = ({ text }: { text: string }) => {
  return (
    <button 
      className='flex items-center justify-between rounded-full px-10 py-3 gap-5 bg-background-secondary-color dark:bg-background-dark-secondary-color group shadow-sm'
      style={{boxShadow: '0 0 calc(var(--active) * 3em) calc(var(--active) * 1em) hsl(260 97% 61% / 0.75), 0 0em 0 0 hsl(260 calc(var(--active) * 97%) calc((var(--active) * 50%) + 30%)) inset, 0 -0.05em 0 0 hsl(260 calc(var(--active) * 97%) calc(var(--active) * 60%)) inset; transition: box-shadow var(--transition), scale var(--transition), background var(--transition)'}}
    >
      <span className='relative'>
        <SparkleIcon className='absolute w-4 dark:group-hover:text-gray-700 transition duration-800 text-primary/60 group-hover:text-primary/80 dark:text-neutral-800 -left-3 -top-3' />
        <SparkleIcon className='absolute w-3 dark:group-hover:text-gray-400 transition duration-500 text-primary/50 group-hover:text-primary/70 dark:text-neutral-700 -left-5 -top-1' />
        <SparkleIcon className='absolute w-5 dark:group-hover:text-gray-500 transition duration-300 text-primary/40 group-hover:text-primary/60 dark:text-neutral-600 -left-8 -top-5' />
      </span>

      <p className='text-primary dark:text-transparent bg-clip-text bg-gradient-to-r from-white dark: via-gray-500 to-background-dark-secondary-color transition-all duration-800'>
        { text }
      </p>
    </button>
  );
};

export default SparkleButton
