// ------------ Icons ----------------
import { LogOut, User } from 'lucide-react';
// ------------ Components ----------------
import Link from 'next/link';

// Define the props interface for the DropdownMenu component
interface DropDownMenuProps {
    showDropdown: boolean;          // Controls whether the dropdown is visible
    userName: string | null | undefined;  // User's display name (could be email or username)
    userData: {                     // Optional user details
        firstName?: string | undefined,
        lastName?: string | undefined
    } | undefined;
    handleLogout: () => void;       // Callback function for logout action
}

/**
 * DropdownMenu Component
 * 
 * A user profile dropdown menu that appears when activated (typically from a user avatar/button).
 * Contains user information, account link, and logout option.
 * 
 * @param {boolean} showDropdown - Controls the visibility of the dropdown
 * @param {string|null|undefined} userName - The user's display name
 * @param {Object} userData - Optional object containing user's first and last name
 * @param {function} handleLogout - Callback function to handle logout action
 */
const DropdownMenu = ({showDropdown, userName, userData, handleLogout: logout}: DropDownMenuProps) => {

    // Wrapper function for logout to potentially add additional logic later
    const handleLogout = () => {
        logout()
    }

    return (
        // Outer div controls visibility (but not layout/space) of dropdown
        <div style={{visibility: showDropdown ? 'visible' : 'hidden'}} >
            {/* 
                Main dropdown container with dynamic opacity transition.
                Styled with background, padding, rounded corners, and shadow.
                Positioned absolutely relative to its parent.
            */}
            <div className={`opacity-${showDropdown ? '100' : '0'} flex flex-col gap-3 transition-all duration-150 text-primary bg-background-color dark:bg-zinc-900 p-4 absolute w-fit top-20 right-32 rounded-lg z-20 shadow-md`}>
                {/* User information section with bottom border */}
                <p className='border-b border-primary text-sm dark:border-gray-800 pb-2'>  
                    {/* Display userName if available, otherwise fall back to first + last name */}
                    {userName ? 
                        userName 
                        : 
                        userData?.firstName + ' ' + userData?.lastName
                    } 
                </p>
                
                {/* Account link with user icon */}
                <Link
                    href='/account'
                    className='text-sm flex items-center justify-between gap-3'
                    aria-label="Go to account settings"
                >
                    Account <User size={16} /> {/* Added size for consistency */}
                </Link>
                
                {/* Logout button with logout icon */}
                <button
                    onClick={handleLogout}
                    className='text-sm flex items-center justify-between gap-3'
                    aria-label="Log out of account"
                >
                    Logout <LogOut size={16} /> {/* Added size for consistency */}
                </button>
            </div>
        </div>
    );
}

export default DropdownMenu;