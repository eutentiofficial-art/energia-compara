"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CustomerPage() {
  const router = useRouter();
  const [tipo, setTipo] = useState<"privato" | "azienda">("privato");

  const next = () => {
    localStorage.setItem("tipo_cliente", tipo);
    router.push("/manual/service");
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Che tipo di cliente sei?</h1>

      <div className="flex gap-4">
        <button
          onClick={() => setTipo("privato")}
          className={`px-4 py-2 border rounded ${
            tipo === "privato" ? "bg-black text-white" : ""
          }`}
        >
          Privato
        </button>
        <button
          onClick={() => setTipo("azienda")}
          className={`px-4 py-2 border rounded ${
            tipo === "azienda" ? "bg-black text-white" : ""
          }`}
        >
          Azienda / P.IVA
        </button>
      </div>

      <button onClick={next} className="w-full bg-black text-white py-2 rounded">
        Continua
      </button>
    </div>
  );
}
