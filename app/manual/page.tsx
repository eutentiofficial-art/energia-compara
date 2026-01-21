"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ManualPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return alert("Email obbligatoria");
    router.push("/compare");
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Inserimento manuale</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select className="w-full border p-2 rounded">
          <option>Privato</option>
          <option>Azienda</option>
        </select>

        <input
          type="number"
          placeholder="Spesa media mensile (€)"
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Consumo medio mensile (kWh / Smc)"
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          placeholder="Email *"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Prosegui
        </button>
      </form>
    </main>
  );
}
