export default function QuoteSuccessPage() {
return ( <main className="min-h-screen flex items-center justify-center px-6 bg-gray-50">

  <div className="max-w-2xl text-center bg-white p-10 rounded-xl shadow-lg">

    <div className="text-6xl mb-6">
      ✅
    </div>

    <h1 className="text-4xl font-bold mb-6">
      Quote Request Received
    </h1>

    <p className="text-xl text-gray-700 mb-6">
      Thank you for contacting Gary the Handyman.
    </p>

    <p className="text-lg text-gray-600 mb-8">
      Your quote request has been successfully submitted and Gary
      will review the details as soon as possible.
    </p>

    <p className="text-lg text-gray-600 mb-8">
      If your enquiry is urgent, please feel free to call directly on:
    </p>

    <a
      href="tel:0409709234"
      className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600"
    >
      📞 0409 709 234
    </a>

    <div className="mt-8">
      <a
        href="/"
        className="text-orange-500 font-semibold hover:underline"
      >
        Return to Home Page
      </a>
    </div>

  </div>

</main>
);
}