"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ManualPage() {
  const router = useRouter();

  const [consumoLuce, setConsumoLuce] = useState("");
  const [consumoGas, setConsumoGas] = useState("");
  const [spesaAnnua, setSpesaAnnua] = useState("");

  const handleSubmit = () => {
    const consumoLuceNum = Number(consumoLuce);
    const consumoGasNum = Number(consumoGas);
    const spesaAnnuaNum = Number(spesaAnnua);

    localStorage.setItem(
      "consumi",
      JSON.stringify({
        consumo_luce_kwh: consumoLuceNum,
        consumo_gas_smc: consumoGasNum,
        spesa_annua: spesaAnnuaNum,
      })
    );

    router.push("/compare");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Inserisci i tuoi consumi</h1>

      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">
            Consumo annuo luce (kWh)
          </label>
          <input
            type="number"
            value={consumoLuce}
            onChange={(e) => setConsumoLuce(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="es. 2700"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Consumo annuo gas (Smc)
          </label>
          <input
            type="number"
            value={consumoGas}
            onChange={(e) => setConsumoGas(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="es. 1200"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Spesa annua attuale (€)
          </label>
          <input
            type="number"
            value={spesaAnnua}
            onChange={(e) => setSpesaAnnua(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="es. 1500"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Continua
        </button>
      </div>
    </div>
  );
}
