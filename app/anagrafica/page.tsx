"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AnagraficaPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    indirizzo: "",
    cap: "",
    citta: "",
    provincia: "",
    pod_pdr: "",
    pagamento: "bollettino",
  });

  const [loading, setLoading] = useState(false);

  // Precompila email e telefono dal localStorage (step precedenti)
  useEffect(() => {
    const email = localStorage.getItem("lead_email") || "";
    const telefono = localStorage.getItem("lead_telefono") || "";
    setForm((f) => ({ ...f, email, telefono }));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const leadId = localStorage.getItem("lead_id");

    if (!leadId) {
      alert("Errore: lead non trovato");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("leads")
      .update({
        nome: form.nome,
        cognome: form.cognome,
        stato: "completo",
      })
      .eq("id", leadId);

    if (error) {
      console.error(error);
      alert("Errore nel salvataggio");
      setLoading(false);
      return;
    }

    router.push("/thank-you");
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dati intestatario</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="cognome"
          placeholder="Cognome"
          value={form.cognome}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="email"
          value={form.email}
          disabled
          className="w-full border p-2 rounded bg-gray-100"
        />

        <input
          name="telefono"
          value={form.telefono}
          disabled
          className="w-full border p-2 rounded bg-gray-100"
        />

        <input
          name="indirizzo"
          placeholder="Indirizzo fornitura"
          value={form.indirizzo}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            name="cap"
            placeholder="CAP"
            value={form.cap}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <input
            name="citta"
            placeholder="Città"
            value={form.citta}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
        </div>

        <input
          name="provincia"
          placeholder="Provincia"
          value={form.provincia}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="pod_pdr"
          placeholder="POD / PDR (opzionale)"
          value={form.pod_pdr}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <select
          name="pagamento"
          value={form.pagamento}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="bollettino">Bollettino</option>
          <option value="rid">RID Bancario</option>
          <option value="carta">Carta</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
        >
          {loading ? "Invio..." : "Invia richiesta"}
        </button>
      </form>
    </div>
  );
}
