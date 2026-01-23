"use client";

import { useRouter } from "next/navigation";

export default function ComparePage() {
  const router = useRouter();

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Offerte disponibili</h1>

      <div className="border rounded p-4 mb-4">
        <p className="font-semibold">Offerta Energia Smart</p>
        <p>Risparmio stimato: €180/anno</p>
      </div>

      <input
        type="tel"
        placeholder="Telefono *"
        className="w-full border p-2 rounded mb-4"
        required
      />

      <button
        className="w-full bg-blue-600 text-white py-2 rounded"
        onClick={() => router.push("/offer")}
      >
        Prosegui
      </button>
    </main>
  );
}
