"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProgressBar from "@/components/ProgressBar";

export default function MeterPage() {
  const router = useRouter();
  const [service, setService] = useState<string | null>(null);
  const [power, setPower] = useState("");
  const [gasMeter, setGasMeter] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const s = sessionStorage.getItem("service_type");
    if (!s) {
      router.push("/manual/service");
      return;
    }
    setService(s);
  }, [router]);

  useEffect(() => {
    if (service === "Luce") setReady(!!power);
    else if (service === "Gas") setReady(!!gasMeter);
    else if (service === "Luce + Gas") setReady(!!power && !!gasMeter);
  }, [service, power, gasMeter]);

  const next = () => {
    if (power) sessionStorage.setItem("power_kw", power);
    if (gasMeter) sessionStorage.setItem("gas_meter", gasMeter);
    router.push("/manual/consumption");
  };

  if (!service) return null;

  return (
    <div className="max-w-xl mx-auto p-6">
      <ProgressBar step={3} color="green" />
      <h1 className="text-2xl font-bold mb-6">Dati contatore</h1>

      {(service === "Luce" || service === "Luce + Gas") && (
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Potenza contatore (kW)
          </label>
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
        <div className="mb-6">
          <label className="block mb-1 font-medium">
            Tipo contatore gas
          </label>
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
        disabled={!ready}
        className={`w-full py-3 rounded-xl text-white transition ${
          ready ? "bg-green-600 hover:bg-green-700" : "bg-gray-300"
        }`}
      >
        Continua
      </button>
    </div>
  );
}
