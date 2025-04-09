export type TAuthResponse = {
  success: boolean; // Indicates whether the operation was successful
  message: string; // Optional success message
  error: string | null;   // Optional error message
};