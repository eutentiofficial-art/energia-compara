"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gray-50">
      <h1 className="text-3xl font-bold">Come vuoi procedere?</h1>

      <div className="flex gap-6 w-full max-w-xl">
        <div
          onClick={() => router.push("/upload")}
          className="flex-1 cursor-pointer rounded-xl border p-6 text-center shadow hover:bg-green-50 transition"
        >
          <h2 className="text-xl font-semibold">📄 Carica bolletta</h2>
          <p className="text-sm mt-2 text-gray-600">
            Consigliato se hai una bolletta recente
          </p>
        </div>

        <div
          onClick={() => router.push("/manual")}
          className="flex-1 cursor-pointer rounded-xl border p-6 text-center shadow hover:bg-blue-50 transition"
        >
          <h2 className="text-xl font-semibold">✍️ Inserisci manualmente</h2>
          <p className="text-sm mt-2 text-gray-600">
            Se conosci già i tuoi consumi
          </p>
        </div>
      </div>
    </div>
  );
}
