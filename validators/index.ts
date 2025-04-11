/**
 * Validates if a name is provided and contains only letters and spaces.
 *
 * @param name The name string to validate.
 * @param fieldName The name of the field being validated (for error messages).
 * @returns An object with `isValid` (boolean) and `error` (string or null) properties.
 */ 
const validateName = (name: string, fieldName: string) => {
  if (!name || name.trim() === "") {
    return { isValid: false, error: `${fieldName} is required` };
  }
  if (!/^[a-zA-Z\u0621-\u064A\s]+$/.test(name)) {
    return { isValid: false, error: `${fieldName} must contain only letters` };
  }
  return { isValid: true, error: null };
};

/**
 * Validates if an email address has a basic valid format.
 *
 * @param email The email string to validate.
 * @returns An object with `isValid` (boolean) and `error` (string or null) properties.
 */
const validateEmail = (email: string) => {
  if (!email || email.trim() === "") {
    return { isValid: false, error: "Email is required" };
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return { isValid: false, error: "Invalid email format" };
  }
  return { isValid: true, error: null };
};

/**
 * Validates if a password meets the requirements:
 * - At least 8 characters long.
 * - Contains at least one symbol (e.g., !@#$%^&*).
 *
 * @param password The password string to validate.
 * @returns An object with `isValid` (boolean) and `error` (string or null) properties.
 */ 
const validatePassword = (password: string) => {
  if (!password) {
    return { isValid: false, error: "Password is required" };
  }
  if (password.length < 8) {
    return {
      isValid: false,
      error: "Password must be at least 8 characters long",
    };
  }
  // Regular expression to check for at least one symbol
  const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
  if (!hasSymbol) {
    return {
      isValid: false,
      error: "Password must contain at least one symbol",
    };
  }
  return { isValid: true, error: null };
};

/**
 * Validates if the confirm password matches the provided password.
 *
 * @param confirmPassword The confirm password string to validate.
 * @param password The original password string for comparison.
 * @returns An object with `isValid` (boolean) and `error` (string or null) properties.
 */
const validateConfirmPassword = (confirmPassword: string, password: string) => {
  if (!confirmPassword) {
    return { isValid: false, error: "Confirm password is required" };
  }
  if (confirmPassword !== password) {
    return { isValid: false, error: "Passwords do not match" };
  }
  return { isValid: true, error: null };
};
export {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
};
