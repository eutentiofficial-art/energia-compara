"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function MeterPage() {
  const router = useRouter();
  const [servizio, setServizio] = useState<string | null>(null);

  const [kw, setKw] = useState("");
  const [contatoreGas, setContatoreGas] = useState("");

  useEffect(() => {
    setServizio(localStorage.getItem("tipo_servizio"));
  }, []);

  const next = () => {
    if (servizio === "luce" || servizio === "dual") {
      localStorage.setItem("potenza_kw", kw);
    }
    if (servizio === "gas" || servizio === "dual") {
      localStorage.setItem("contatore_gas", contatoreGas);
    }
    router.push("/manual/consumption");
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dati contatore</h1>

      {(servizio === "luce" || servizio === "dual") && (
        <div>
          <label className="block mb-1">Potenza contatore luce (kW)</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={kw}
            onChange={(e) => setKw(e.target.value)}
            placeholder="es. 3, 4.5, 6"
          />
        </div>
      )}

      {(servizio === "gas" || servizio === "dual") && (
        <div>
          <label className="block mb-1">Tipo contatore gas</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={contatoreGas}
            onChange={(e) => setContatoreGas(e.target.value)}
            placeholder="es. G4, G6..."
          />
        </div>
      )}

      <button onClick={next} className="w-full bg-black text-white py-2 rounded">
        Continua
      </button>
    </div>
  );
}
