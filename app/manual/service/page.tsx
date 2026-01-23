"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ServicePage() {
  const router = useRouter();
  const [service, setService] = useState("");

  const next = () => {
    if (!service) return;
    sessionStorage.setItem("service_type", service);
    router.push("/manual/meter");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Quale servizio vuoi confrontare?</h1>

      <div className="grid grid-cols-3 gap-4">
        {["Luce", "Gas", "Luce + Gas"].map((s) => (
          <button
            key={s}
            onClick={() => setService(s)}
            className={`border rounded-xl p-4 font-semibold ${
              service === s ? "border-green-600 bg-green-50" : ""
            }`}
          >
            {s}
          </button>
        ))}
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
