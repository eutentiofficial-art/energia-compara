"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ConsumptionPage() {
  const router = useRouter();
  const [servizio, setServizio] = useState<string | null>(null);

  const [spesaLuce, setSpesaLuce] = useState("");
  const [consumoLuce, setConsumoLuce] = useState("");
  const [spesaGas, setSpesaGas] = useState("");
  const [consumoGas, setConsumoGas] = useState("");

  useEffect(() => {
    setServizio(localStorage.getItem("tipo_servizio"));
  }, []);

  const next = () => {
    if (servizio === "luce" || servizio === "dual") {
      localStorage.setItem("spesa_luce_mensile", spesaLuce);
      localStorage.setItem("consumo_luce_annuo", consumoLuce);
    }
    if (servizio === "gas" || servizio === "dual") {
      localStorage.setItem("spesa_gas_mensile", spesaGas);
      localStorage.setItem("consumo_gas_annuo", consumoGas);
    }
    router.push("/manual/email");
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Consumi</h1>

      {(servizio === "luce" || servizio === "dual") && (
        <>
          <div>
            <label className="block mb-1">Spesa mensile luce (€)</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={spesaLuce}
              onChange={(e) => setSpesaLuce(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Consumo annuo luce (kWh)</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={consumoLuce}
              onChange={(e) => setConsumoLuce(e.target.value)}
            />
          </div>
        </>
      )}

      {(servizio === "gas" || servizio === "dual") && (
        <>
          <div>
            <label className="block mb-1">Spesa mensile gas (€)</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={spesaGas}
              onChange={(e) => setSpesaGas(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Consumo annuo gas (Smc)</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={consumoGas}
              onChange={(e) => setConsumoGas(e.target.value)}
            />
          </div>
        </>
      )}

      <button onClick={next} className="w-full bg-black text-white py-2 rounded">
        Continua
      </button>
    </div>
  );
}
