"use client";

import { useRouter } from "next/navigation";

export default function ComparePage() {
  const router = useRouter();
  const monthly = Number(sessionStorage.getItem("monthly_cost") || 0);
  const estimatedAnnual = monthly * 12;
  const saving = Math.round(estimatedAnnual * 0.18);

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6 text-center">
      <h1 className="text-2xl font-bold">Offerta disponibile per te</h1>

      <div className="text-3xl font-extrabold text-green-600">
        Risparmio annuo stimato: € {saving}
      </div>

      <p>Vuoi scoprire l'offerta dedicata a te?</p>

      <button
        onClick={() => router.push("/manual/offer")}
        className="w-full bg-green-600 text-white py-3 rounded-xl"
      >
        Continua
      </button>
    </div>
  );
}
