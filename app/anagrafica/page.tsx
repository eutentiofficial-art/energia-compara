"use client";

export default function AnagraficaPage() {
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dati intestatario</h1>

      <form className="space-y-4">
        <input className="w-full border p-2 rounded" placeholder="Nome" />
        <input className="w-full border p-2 rounded" placeholder="Cognome" />
        <input className="w-full border p-2 rounded" placeholder="Codice Fiscale / P.IVA" />
        <input className="w-full border p-2 rounded" placeholder="Email" />
        <input className="w-full border p-2 rounded" placeholder="Telefono" />
        <input className="w-full border p-2 rounded" placeholder="Indirizzo fornitura" />

        <select className="w-full border p-2 rounded">
          <option>Cambio fornitore</option>
          <option>Subentro</option>
          <option>Nuovo allaccio</option>
        </select>

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Invia richiesta
        </button>
      </form>
    </main>
  );
}
