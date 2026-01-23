"use client";

import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";

export default function OfferPage() {
  const router = useRouter();

  return (
    <div className="max-w-xl mx-auto p-6">
      <ProgressBar step={6} />
      <h1 className="text-2xl font-bold mb-6">Offerta consigliata</h1>

      <div className="border rounded-xl p-4 space-y-2 mb-6">
        <div className="font-bold text-lg">Energia Green Plus</div>
        <div>Fornitore: Energia Italia</div>
        <div>Prezzo luce: €0,134/kWh</div>
        <div>Prezzo gas: €0,52/Smc</div>
        <div>Bonus attivazione: €100</div>
        <div>Durata: 12 mesi</div>
        <div>Energia 100% rinnovabile</div>
      </div>

      <button
        onClick={() => router.push("/manual/anagrafica")}
        className="w-full bg-green-600 text-white py-3 rounded-xl"
      >
        Procedi
      </button>
    </div>
  );
}
