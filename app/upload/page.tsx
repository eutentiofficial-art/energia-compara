"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return alert("Email obbligatoria");
    router.push("/thanks");
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Carica bolletta</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select className="w-full border p-2 rounded">
          <option>Privato</option>
          <option>Azienda</option>
        </select>

        <input type="file" className="w-full" />

        <input
          type="email"
          placeholder="Email *"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Telefono (facoltativo)"
          className="w-full border p-2 rounded"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Invia
        </button>
      </form>
    </main>
  );
}
