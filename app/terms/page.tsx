export const metadata = {
  title: "Terms & Conditions | Gary the Handyman",
};

export default function TermsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">

      <h1 className="text-5xl font-bold mb-8">
        Terms & Conditions
      </h1>

      <p className="text-gray-600 mb-10">
        Last Updated: July 2026
      </p>

      <div className="space-y-10 text-gray-700 leading-8">

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            General
          </h2>

          <p>
            By using this website or requesting a quotation you agree to
            these Terms & Conditions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Quotations
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>All quotations are provided free of charge.</li>
            <li>Quotes are based on the information supplied by the customer.</li>
            <li>An on-site inspection may be required before a final quote can be confirmed.</li>
            <li>Quotes may change if additional work or materials are required.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Scope of Work
          </h2>

          <p>
            Any work requested outside the agreed quotation may result in
            additional charges. Customers will be advised wherever
            reasonably possible before extra work is undertaken.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Technology Services Disclaimer
          </h2>
          <p>
            While reasonable care is taken, software updates, internet outages, or third-party             
            services may affect outcomes and cannot always be controlled.

           </p>
        </section>

        <section>
           <h2 className="text-2xl font-semibold mb-4">
            Security Camera Disclaimer
          </h2>

           <p> 
            Camera systems are intended to assist with security, but cannot guarantee the prevention or detection 
            of crime.
            </p>

        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Scheduling
          </h2>

          <p>
            Appointment times are estimates and may be affected by weather,
            supplier delays, emergencies or other circumstances beyond our
            reasonable control.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Customer Responsibilities
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate information.</li>
            <li>Provide safe access to the property.</li>
            <li>Advise of known hazards before work commences.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Payment
          </h2>

          <p>
            Payment terms will be discussed before work commences unless
            otherwise agreed in writing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Limitation of Liability
          </h2>

          <p>
            To the maximum extent permitted by Australian law, Gary the
            Handyman is not liable for indirect, incidental or consequential
            loss arising from the use of this website or services provided.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Website Information
          </h2>

          <p>
            Information on this website is provided in good faith and is
            believed to be accurate at the time of publication. Content may
            change without notice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Acceptance
          </h2>

          <p>
            By requesting a quotation or engaging Gary the Handyman, you
            acknowledge that you have read and accepted these Terms &
            Conditions.
          </p>
        </section>

      </div>

    </main>
  );
}