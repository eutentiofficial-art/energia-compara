"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ComparePage() {
  const router = useRouter();
  const [offers, setOffers] = useState<any[]>([]);
  const [telefono, setTelefono] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("offers_luce")
        .select("*, providers(nome, logo_url)")
        .eq("visibile", true)
        .limit(3);

      setOffers(data || []);
      setLoading(false);
    }

    load();
  }, []);

  function handleContinue() {
    if (!telefono) return alert("Inserisci il numero di telefono");

    localStorage.setItem("lead_telefono", telefono);
    router.push("/offer");
  }

  if (loading) return <p className="p-6">Caricamento...</p>;

  const risparmio = 320;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Offerte disponibili per te</h1>

      <p className="text-xl font-bold text-green-600 mb-4">
        Il tuo risparmio annuo stimato è di € {risparmio}
      </p>

      <p className="mb-6">
        Vuoi proseguire per scoprire l’offerta a te dedicata con il risparmio evidenziato?
      </p>

      <input
        type="tel"
        placeholder="Inserisci il tuo numero di telefono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      <button
        onClick={handleContinue}
        className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
      >
        Prosegui
      </button>
    </div>
  );
}
