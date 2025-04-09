import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2025-03-31.basil",
});

export async function POST(request: any) {
  const data: any = await request.json();
  const amount = JSON.parse(data.amount);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "USD",
    });
    return NextResponse.json(paymentIntent.client_secret, { status: 200 });
  } catch (error: any) {
    console.log(error)
    return new NextResponse(error, {
      status: 400,
    });
  }
}