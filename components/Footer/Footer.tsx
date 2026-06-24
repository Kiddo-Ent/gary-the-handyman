export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">

      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          <div>
            <h3 className="text-2xl font-bold text-orange-400 mb-4">
              Gary the Handyman
            </h3>

            <p>
              Reliable handyman services throughout
              Inverloch and South Gippsland.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">
              Contact
            </h4>

            <p>📞 0409 709 234</p>
            <p>✉️ garythehandyman26@gmail.com</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">
              Service Areas
            </h4>

            <p>Inverloch</p>
            <p>Wonthaggi</p>
            <p>Venus Bay</p>
            <p>Leongatha</p>
            <p>Korumburra</p>
            <p>Cape Paterson</p>
            <p>Foster</p>
            <p>Fish Creek</p>
          </div>

        </div>

        <div className="border-t border-slate-700 mt-10 pt-6 text-center text-sm">
          © 2026 Gary the Handyman. All Rights Reserved.
        </div>

      </div>

    </footer>
  );
}
