"use client";

import { useRouter } from "next/navigation";

export default function OfferPage() {
  const router = useRouter();

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Offerta dettagliata</h1>

      <div className="border rounded p-4 mb-4">
        <p className="font-semibold text-lg">Energia Smart Plus</p>
        <p>Tariffa: indicizzata</p>
        <p>Bonus: €60 benvenuto</p>
      </div>

      <button
        className="w-full bg-green-600 text-white py-2 rounded"
        onClick={() => router.push("/anagrafica")}
      >
        Procedi
      </button>
    </main>
  );
}
