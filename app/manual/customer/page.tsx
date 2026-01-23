"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CustomerPage() {
  const router = useRouter();
  const [type, setType] = useState("");

  const next = () => {
    if (!type) return;
    sessionStorage.setItem("customer_type", type);
    router.push("/manual/service");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Chi sei?</h1>

      <div className="grid grid-cols-3 gap-4">
        {["Privato", "Azienda", "P.IVA"].map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`border rounded-xl p-4 font-semibold ${
              type === t ? "border-green-600 bg-green-50" : ""
            }`}
          >
            {t}
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
