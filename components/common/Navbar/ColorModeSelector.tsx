'use client' 
// ------------ Icons ----------------
import { Moon, Sun } from 'lucide-react';
// ------------ Hooks ----------------
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

/**
 * ThemeSwitcher Component
 * Provides UI for switching between light and dark themes
 * Includes a dropdown menu with theme options
 */
const ColorModeSelector = () => {
  // State for controlling dropdown visibility
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Theme context with current theme and toggle function
  const { 
    theme,       // Current theme ('light' or 'dark')
    toggleTheme  // Function to switch themes
  } = useTheme();

  /**
   * Handles theme selection from dropdown
   * @param selectedMode - The theme mode to switch to ('light' | 'dark')
   */
  const handleDropdownClick = (selectedMode: 'light' | 'dark') => {
    toggleTheme(selectedMode);
    setShowDropdown(false); // Close dropdown after selection
  };

  /**
   * Toggles dropdown visibility
   */
  const handleButtonClick = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="relative mt-1 z-30"> {/* Container with high z-index to ensure visibility */}
      {/* Theme toggle button */}
      <button
        onClick={handleButtonClick}
        className="relative z-10 text-primary"
        aria-label="Toggle theme switcher"
      >
        {/* Show Sun icon for light theme, Moon for dark */}
        {theme === 'light' ? <Sun /> : <Moon />}
      </button>

      {/* Dropdown menu with theme options */}
      <div
        className={`absolute mt-2 right-0 transition-all ${
          showDropdown ? 'scale-100' : 'scale-0'
        } ml-3`}
      >
        <ul className="bg-background-secondary-color text-light-color dark:bg-background-dark-secondary-color p-4 rounded-lg shadow-lg">
          {/* Dark theme option */}
          <li
            className={`cursor-pointer flex gap-2 ${
              theme === 'dark' && 'text-primary'
            } mb-4 hover:text-primary`}
            onClick={() => handleDropdownClick('dark')}
            aria-selected={theme === 'dark'}
          >
            <Moon />
            Dark
          </li>

          {/* Light theme option */}
          <li
            className={`cursor-pointer flex gap-2 ${
              theme === 'light' && 'text-primary'
            } hover:text-primary`}
            onClick={() => handleDropdownClick('light')}
            aria-selected={theme === 'light'}
          >
            <Sun />
            Light
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ColorModeSelector;