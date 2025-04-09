'use client';
// ------------ Stripe ----------------
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
// ------------ Hooks ----------------
import { useOrders } from '@/context/OrdersContext';
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
// ------------ Utils ----------------
import ReactDOMServer from "react-dom/server"; // For rendering the email template
// ------------ Components ----------------
import { EmailTemplate } from "../ui"; // Your email template
// ------------ Types ----------------
import { TCourse } from "@/types";

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const { createOrder } = useOrders();
    const { user, userData } = useAuth();
    const { cart, totalPrice } = useCart();
    const router = useRouter();

    if(!user) router.push('/auth/unauthenticated')

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            if (!stripe || !elements) {
                // Ensure Stripe.js has loaded
                return;
            }

            // Trigger form validation and wallet collection
            const { error: submitError } = await elements.submit();
            if (submitError) {
                console.error(submitError.message);
                return;
            }

            // Create payment intent
            const res = await fetch('api/create-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: totalPrice,
                }),
            });

            const clientSecret  = await res.json();

			// Create order and send email
			createOrder();
			await sendEmail();

            // Confirm the payment
            const result = await stripe.confirmPayment({
                clientSecret,
                elements,
                confirmParams: {
                    return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-confirm`,
                },
                redirect: 'always',
            });

            if (result.error) {
                console.error(result.error.message);
                return;
            }

        } catch (err) {
            console.error(err);
        }
    };

    const sendEmail = async () => {

        // Generate the HTML email
		const emailHTML = ReactDOMServer.renderToStaticMarkup(
			<EmailTemplate
				userName={user?.displayName || userData?.firstName || "Customer"}
				totalPrice={totalPrice}
				purchasedCourses={cart as TCourse[]}
			/>
		);

        try {
            const response = await fetch('/api/send-email', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user?.email,
                    html: emailHTML,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to send email");
            }
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="px-14 md:px-32 lg:px-[400px] bg-background-color dark:bg-background-dark-secondary-color pt-32">
                <PaymentElement />
                <button className="w-full p-2 mt-4 text-white rounded-md bg-primary">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;
