'use client';
// ------------ Stripe Dependencies ----------------
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
// ------------ Hooks ----------------
import { useCart } from '@/context/CartContext';
// ------------ Components ----------------
import { CheckoutForm } from '@/components/checkout';

/**
 * Initialize Stripe with publishable key from environment variables
 * Fallback to empty string if key is not found (will fail gracefully)
 */
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY || ''
);

/**
 * Checkout Component
 * Wraps the checkout form with Stripe Elements provider
 * Handles payment initialization and cart total calculation
 */
const Checkout = () => {
  // Access cart context to get total price
  const { totalPrice } = useCart();

  /**
   * Stripe Elements configuration options
   * @property mode - Payment mode (one-time payment)
   * @property currency - USD currency
   * @property amount - Total amount in cents (converted from dollars)
   *                  Undefined if total is 0 to prevent invalid payments
   */
  const options: StripeElementsOptions = {
    mode: 'payment',
    currency: 'usd',
    amount: totalPrice > 0 ? Math.round(totalPrice * 100) : undefined,
  };

  return (
    /**
     * Stripe Elements provider
     * @param stripe - Stripe promise instance
     * @param options - Configuration options for payment
     */
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;