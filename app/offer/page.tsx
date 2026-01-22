"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function OfferPage() {
  const router = useRouter();
  const [offer, setOffer] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("offers_luce")
        .select("*, providers(nome, logo_url)")
        .eq("visibile", true)
        .limit(1)
        .single();

      setOffer(data);
    }

    load();
  }, []);

  if (!offer) return <p className="p-6">Caricamento...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Offerta dedicata per te</h1>

      <div className="border rounded p-4 shadow">
        {offer.providers?.logo_url && (
          <img
            src={offer.providers.logo_url}
            alt={offer.providers.nome}
            className="h-12 mb-3"
          />
        )}

        <h2 className="text-xl font-semibold mb-2">{offer.nome_offerta}</h2>

        <ul className="text-sm space-y-1 mb-4">
          <li>Prezzo kWh: € {offer.prezzo_kwh}</li>
          <li>Quota fissa: € {offer.quota_fissa_mensile}/mese</li>
          <li>Bonus attivazione: € {offer.bonus_attivazione}</li>
          <li>Durata contratto: {offer.durata_mesi} mesi</li>
          <li>Energia green: {offer.green_energy ? "Sì" : "No"}</li>
        </ul>

        <button
          onClick={() => router.push("/anagrafica")}
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
        >
          Attiva questa offerta
        </button>
      </div>
    </div>
  );
}
