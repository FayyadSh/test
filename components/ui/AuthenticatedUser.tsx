// ------------ Components ----------------
import Link from "next/link";

interface AuthenticatedUserUIProps {
  email: string | null;
}

const AuthenticatedUser = ({ email }: AuthenticatedUserUIProps) => {
  return (
    <div className="bg-background-secondary-color dark:bg-background-dark-secondary-color pt-20 flex flex-col justify-center items-center w-full h-full relative">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-background-color dark:bg-background-dark-color rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">You're already logged in</h2>
          <p className="text-light-color mb-6">
            You are currently logged in as {email}
          </p>
          <div className="flex flex-col space-y-4">
            <Link
                href='/'
              className="bg-background-secondary-color dark:bg-background-dark-secondary-color text-primary py-2 px-4 rounded-md hover:bg-primary/30 transition-colors"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedUser;