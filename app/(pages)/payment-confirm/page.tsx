"use client";
// ------------ Images ----------------
import SuccessImage from "@/assets/svg/party.svg";
// ------------ Components ----------------
import Link from "next/link";
import Image from "next/image";

const PaymentConfirm = () => {
  return (
    <div className="flex flex-col bg-background-color dark:bg-background-dark-secondary-color items-center justify-between px-5 py-32">
      <Image
        src={SuccessImage}
        width={400}
        height={400}
        alt="Success image"
        className=""
      />

      <div className="flex flex-col gap-2 mt-4">
        <h2 className="text-[24px] text-light-color">
            Payment Successful
        </h2>
        <h2 className="text-[17px] text-light-color/50">
          We sent an email with your order confirmation along with digital
          content
        </h2>
        <Link href="/" className="p-2 w-fit text-white rounded-md bg-primary/70 hover:bg-primary">
          Go To Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentConfirm;
