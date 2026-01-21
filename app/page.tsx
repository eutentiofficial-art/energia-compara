"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Come vuoi procedere?</h1>

      <button
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        onClick={() => router.push("/upload")}
      >
        📄 Carica bolletta
      </button>

      <button
        className="px-6 py-3 bg-green-600 text-white rounded-lg"
        onClick={() => router.push("/manual")}
      >
        ✍️ Inserisci dati manualmente
      </button>
    </main>
  );
}
