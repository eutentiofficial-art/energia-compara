"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProgressBar from "@/components/ProgressBar";

export default function ConsumptionPage() {
  const router = useRouter();
  const [service, setService] = useState<string | null>(null);

  const [monthlyCost, setMonthlyCost] = useState("");
  const [annualKwh, setAnnualKwh] = useState("");
  const [annualSmc, setAnnualSmc] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const s = sessionStorage.getItem("service_type");
    const savedEmail = sessionStorage.getItem("email");
    setService(s);
    if (savedEmail) setEmail(savedEmail);
  }, []);

  if (!service) return null;

  const next = () => {
    sessionStorage.setItem("monthly_cost", monthlyCost);
    sessionStorage.setItem("annual_kwh", annualKwh);
    sessionStorage.setItem("annual_smc", annualSmc);
    sessionStorage.setItem("email", email);
    router.push("/manual/compare");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <ProgressBar step={4} />
      <h1 className="text-2xl font-bold mb-6">I tuoi consumi</h1>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Spesa media mensile (€)</label>
        <input
          type="number"
          value={monthlyCost}
          onChange={(e) => setMonthlyCost(e.target.value)}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {(service === "Luce" || service === "Luce + Gas") && (
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Consumo annuo luce (kWh)
          </label>
          <input
            type="number"
            value={annualKwh}
            onChange={(e) => setAnnualKwh(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
        </div>
      )}

      {(service === "Gas" || service === "Luce + Gas") && (
        <div className="mb-6">
          <label className="block mb-1 font-medium">
            Consumo annuo gas (Smc)
          </label>
          <input
            type="number"
            value={annualSmc}
            onChange={(e) => setAnnualSmc(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
        </div>
      )}

      <div className="mb-6">
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <button
        onClick={next}
        className="w-full bg-green-600 text-white py-3 rounded-xl"
      >
        Continua
      </button>
    </div>
  );
}
