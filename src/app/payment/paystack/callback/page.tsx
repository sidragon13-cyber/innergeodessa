import Link from "next/link";

export default function PaystackCallbackPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl items-center px-6 py-16">
      <section className="w-full border border-[#d8d2c6] bg-[#faf8f2] p-8 md:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6d746b]">
          Payment Confirmation
        </p>

        <h1 className="mt-3 text-3xl font-semibold text-[#26372d]">
          Your payment is being confirmed
        </h1>

        <p className="mt-4 leading-7 text-[#596158]">
          Your payment has been submitted successfully. InnerGeo will confirm
          the transaction securely before unlocking your premium report.
        </p>

        <p className="mt-3 text-sm leading-6 text-[#6d746b]">
          If access does not appear immediately, wait a moment and open your
          account again.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/account"
            className="bg-[#26372d] px-5 py-3 text-sm font-semibold text-white"
          >
            Go to My Account
          </Link>

          <Link
            href="/"
            className="border border-[#26372d] px-5 py-3 text-sm font-semibold text-[#26372d]"
          >
            Return Home
          </Link>
        </div>
      </section>
    </main>
  );
}
