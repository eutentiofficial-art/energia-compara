"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ServicePage() {
  const router = useRouter();
  const [servizio, setServizio] = useState<"luce" | "gas" | "dual">("luce");

  const next = () => {
    localStorage.setItem("tipo_servizio", servizio);
    router.push("/manual/meter");
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Che servizio vuoi confrontare?</h1>

      <div className="flex gap-4">
        <button
          onClick={() => setServizio("luce")}
          className={`px-4 py-2 border rounded ${
            servizio === "luce" ? "bg-black text-white" : ""
          }`}
        >
          Luce
        </button>
        <button
          onClick={() => setServizio("gas")}
          className={`px-4 py-2 border rounded ${
            servizio === "gas" ? "bg-black text-white" : ""
          }`}
        >
          Gas
        </button>
        <button
          onClick={() => setServizio("dual")}
          className={`px-4 py-2 border rounded ${
            servizio === "dual" ? "bg-black text-white" : ""
          }`}
        >
          Luce + Gas
        </button>
      </div>

      <button onClick={next} className="w-full bg-black text-white py-2 rounded">
        Continua
      </button>
    </div>
  );
}
