export default function ContactPage() {
return ( <main className="min-h-screen py-20 px-6"> <div className="max-w-4xl mx-auto">

    <h1 className="text-5xl font-bold mb-10">
      Contact Gary
    </h1>

    <div className="space-y-6 text-xl">

      <p>
        <strong>Phone:</strong> 0409 709 234
      </p>

      <p>
        <strong>Email:</strong> garythehandyman26@gmail.com
      </p>

      <p>
        <strong>Service Areas:</strong>
      </p>

      <ul className="list-disc pl-6">
        <li>Inverloch</li>
        <li>Wonthaggi</li>
        <li>Venus Bay</li>
        <li>Leongatha</li>
        <li>Korumburra</li>
        <li>Cape Paterson</li>
        <li>Foster</li>
        <li>Fish Creek</li>
      </ul>

      <div className="pt-6">
        <a
          href="tel:0409709234"
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold"
        >
          Call Gary Now
        </a>
      </div>

    </div>

  </div>
</main>
);
}
