"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ManualPage() {
  const router = useRouter();
  const [luce, setLuce] = useState("");
  const [gas, setGas] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const consumoLuceAnnuale = Number(luce);
    const consumoGasAnnuale = Number(gas);

    localStorage.setItem("consumo_luce_annuo", consumoLuceAnnuale.toString());
    localStorage.setItem("consumo_gas_annuo", consumoGasAnnuale.toString());

    router.push("/compare");
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Inserisci i tuoi consumi annuali</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Consumo luce annuo (kWh)"
          value={luce}
          onChange={(e) => setLuce(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Consumo gas annuo (Smc)"
          value={gas}
          onChange={(e) => setGas(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />

        <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800">
          Prosegui
        </button>
      </form>
    </div>
  );
}
