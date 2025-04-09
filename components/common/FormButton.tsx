// ------------ Icons ----------------
import { Loader2 } from "lucide-react";

/**
 * Interface defining the props for the FormButton component.
 *
 * @interface TFormButton
 * @property {boolean} [isPending] - Optional boolean indicating if the button is in a pending (loading) state.
 * @property {string} title - The text displayed on the button.
 */
interface TFormButton {
  isPending?: boolean;
  title: string;
}

/**
 * A reusable button component designed for forms, with optional loading state.
 *
 * @component FormButton
 * @param {TFormButton} props - The props for the FormButton component.
 * @returns {JSX.Element} - The rendered FormButton component.
 */
const FormButton: React.FC<TFormButton> = ({ isPending, title }) => {
  return (
    <button
      className="bg-gradient-to-r bg-primary text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-primary/70 disabled:bg-primary/40 transition ease-in-out duration-150 relative min-h-[40px]" // Adds minimum height for consistent button dimensions.
      type="submit" // Specifies the button's type as 'submit' for form submission.
      disabled={isPending} // Disables the button when in the pending state.
    >
      {isPending ?
        // Render loading indicator when isPending is true.
        <div className="absolute inset-0 flex items-center justify-center gap-5">
          <p>Loading</p>
          <Loader2 className="animate-spin h-5 w-5 ml-1" /> {/* Lucide-react loader icon with spinning animation. */}
        </div>
        :
        // Render the title when isPending is false.
        title
      }
    </button>
  );
};

export default FormButton;