"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MeterPage() {
  const router = useRouter();
  const service = sessionStorage.getItem("service_type");
  const [power, setPower] = useState("");
  const [gasMeter, setGasMeter] = useState("");

  const next = () => {
    sessionStorage.setItem("power_kw", power);
    sessionStorage.setItem("gas_meter", gasMeter);
    router.push("/manual/consumption");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tipo di contatore</h1>

      {(service === "Luce" || service === "Luce + Gas") && (
        <div>
          <label className="block mb-1 font-medium">Potenza contatore (kW)</label>
          <select
            value={power}
            onChange={(e) => setPower(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Seleziona</option>
            <option value="3">3 kW</option>
            <option value="4.5">4.5 kW</option>
            <option value="6">6 kW</option>
            <option value="10">10 kW</option>
          </select>
        </div>
      )}

      {(service === "Gas" || service === "Luce + Gas") && (
        <div>
          <label className="block mb-1 font-medium">Tipo contatore gas</label>
          <select
            value={gasMeter}
            onChange={(e) => setGasMeter(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Seleziona</option>
            <option value="G4">G4</option>
            <option value="G6">G6</option>
            <option value="G10">G10</option>
          </select>
        </div>
      )}

      <button
        onClick={next}
        className="w-full bg-green-600 text-white py-3 rounded-xl"
      >
        Continua
      </button>
    </div>
  );
}
