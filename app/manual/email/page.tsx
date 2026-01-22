"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const submit = () => {
    localStorage.setItem("email", email);
    router.push("/compare");
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Inserisci la tua email</h1>

      <input
        type="email"
        className="w-full border rounded px-3 py-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="es. mario@email.it"
      />

      <button onClick={submit} className="w-full bg-black text-white py-2 rounded">
        Continua
      </button>
    </div>
  );
}
