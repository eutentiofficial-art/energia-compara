"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProgressBar from "@/components/ProgressBar";

export default function ComparePage() {
  const router = useRouter();
  const [saving, setSaving] = useState<number | null>(null);

  useEffect(() => {
    const monthly = Number(sessionStorage.getItem("monthly_cost"));
    if (!monthly || monthly <= 0) return;

    const annual = monthly * 12;
    const estimatedSaving = Math.round(annual * 0.18);
    setSaving(estimatedSaving);
  }, []);

  if (saving === null) return null;

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <ProgressBar step={5} />
      <h1 className="text-2xl font-bold mb-4">Offerte disponibili per te</h1>

      <div className="text-3xl font-extrabold text-green-600 mb-4">
        Risparmio annuo stimato: € {saving}
      </div>

      <p className="mb-6">
        Vuoi scoprire l’offerta più conveniente per te?
      </p>

      <button
        onClick={() => router.push("/manual/offer")}
        className="w-full bg-green-600 text-white py-3 rounded-xl"
      >
        Continua
      </button>
    </div>
  );
}
