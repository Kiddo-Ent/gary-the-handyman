export default function QuoteSuccessPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full rounded-2xl bg-white p-10 shadow-xl text-center">

        <div className="text-6xl mb-6">
          ✅
        </div>

        <h1 className="text-4xl font-bold text-slate-800">
          Quote Request Sent
        </h1>

        <p className="mt-6 text-lg text-slate-600 leading-relaxed">
          Thank you for contacting <strong>Gary the Handyman</strong>.
        </p>

        <p className="mt-4 text-slate-600 leading-relaxed">
          Your quote request has been successfully received.
        </p>

        <p className="mt-4 text-slate-600 leading-relaxed">
          Gary will review your request and get back to you as soon as possible,
          usually within one business day.
        </p>

        <div className="mt-10 rounded-xl bg-blue-50 border border-blue-100 p-6">

          <h2 className="text-xl font-semibold text-slate-800">
            Need to speak with Gary sooner?
          </h2>

          <p className="mt-3 text-slate-600">
            Call or text:
          </p>

          <a
            href="tel:0409709234"
            className="mt-2 block text-2xl font-bold text-blue-600 hover:underline"
          >
            0409 709 234
          </a>

        </div>

        <a
          href="/"
          className="mt-10 inline-flex rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
        >
          Return to Home
        </a>

      </div>
    </main>
  );
}