// ------------ Components ----------------
import { GlassEffectCard } from "../ui";
const Overview = () => {
    return (
        <section className="px-6 sm:px-16 lg:px-40 bg-background-color dark:bg-background-dark-color transition-all duration-300">
            <h1 className="text-3xl text-center mb-24 font-bold text-light-color/70 dark:text-light-color">
                Why CodeSphere Academy
            </h1>

            <div className='flex flex-col md:flex-row flex-wrap gap-4 md:gap-9 justify-between items-center text-primary'>
                <GlassEffectCard
                    title='Beginner-Friendly Courses'
                    text='Start your coding journey with courses designed specifically for beginners'
                />

                <GlassEffectCard
                    title='Advanced Learning Tracks'
                    text='Explore in-depth topics and stay ahead in the tech industry'
                />

                <GlassEffectCard
                    title='Real-World Projects'
                    text='Gain hands-on experience by building projects that solve real-world problems'
                />

                <GlassEffectCard  // Added another card here
                    title='Expert Instructors'
                    text='Learn from experienced professionals who are passionate about teaching'
                />

            </div>
        </section>
    );
}

export default Overview;