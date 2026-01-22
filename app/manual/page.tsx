"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ManualPage() {
  const router = useRouter();

  const [tipoCliente, setTipoCliente] = useState<"privato" | "azienda">("privato");
  const [tipoServizio, setTipoServizio] = useState<"luce" | "gas" | "dual">("luce");
  const [email, setEmail] = useState("");

  const [spesaLuce, setSpesaLuce] = useState("");
  const [consumoLuce, setConsumoLuce] = useState("");
  const [potenzaContatore, setPotenzaContatore] = useState("");

  const [spesaGas, setSpesaGas] = useState("");
  const [consumoGas, setConsumoGas] = useState("");
  const [tipoContatoreGas, setTipoContatoreGas] = useState("");

  const handleSubmit = () => {
    const payload: any = {
      tipo_cliente: tipoCliente,
      tipo_servizio: tipoServizio,
      email,
    };

    if (tipoServizio === "luce" || tipoServizio === "dual") {
      payload.spesa_luce_mensile = Number(spesaLuce);
      payload.consumo_luce_annuo = Number(consumoLuce);
      payload.potenza_contatore_kw = potenzaContatore;
    }

    if (tipoServizio === "gas" || tipoServizio === "dual") {
      payload.spesa_gas_mensile = Number(spesaGas);
      payload.consumo_gas_annuo = Number(consumoGas);
      payload.tipo_contatore_gas = tipoContatoreGas;
    }

    localStorage.setItem("manual_input", JSON.stringify(payload));
    router.push("/compare");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Inserisci i tuoi dati</h1>

      {/* Tipo cliente */}
      <div>
        <label className="block font-medium mb-2">Sei un privato o un’azienda?</label>
        <div className="flex gap-4">
          <button
            onClick={() => setTipoCliente("privato")}
            className={`px-4 py-2 border rounded ${
              tipoCliente === "privato" ? "bg-black text-white" : ""
            }`}
          >
            Privato
          </button>
          <button
            onClick={() => setTipoCliente("azienda")}
            className={`px-4 py-2 border rounded ${
              tipoCliente === "azienda" ? "bg-black text-white" : ""
            }`}
          >
            Azienda / P.IVA
          </button>
        </div>
      </div>

      {/* Scelta servizio */}
      <div>
        <label className="block font-medium mb-2">Che servizio vuoi confrontare?</label>
        <div className="flex gap-4">
          <button
            onClick={() => setTipoServizio("luce")}
            className={`px-4 py-2 border rounded ${
              tipoServizio === "luce" ? "bg-black text-white" : ""
            }`}
          >
            Luce
          </button>
          <button
            onClick={() => setTipoServizio("gas")}
            className={`px-4 py-2 border rounded ${
              tipoServizio === "gas" ? "bg-black text-white" : ""
            }`}
          >
            Gas
          </button>
          <button
            onClick={() => setTipoServizio("dual")}
            className={`px-4 py-2 border rounded ${
              tipoServizio === "dual" ? "bg-black text-white" : ""
            }`}
          >
            Luce + Gas
          </button>
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="es. mario@email.it"
        />
      </div>

      {/* Campi LUCE */}
      {(tipoServizio === "luce" || tipoServizio === "dual") && (
        <div className="space-y-3">
          <h2 className="font-semibold">Dati Luce</h2>

          <div>
            <label className="block mb-1">Spesa mensile luce (€)</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={spesaLuce}
              onChange={(e) => setSpesaLuce(e.target.value)}
              placeholder="es. 90"
            />
          </div>

          <div>
            <label className="block mb-1">Consumo annuo luce (kWh)</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={consumoLuce}
              onChange={(e) => setConsumoLuce(e.target.value)}
              placeholder="es. 2700"
            />
          </div>

          <div>
            <label className="block mb-1">Potenza contatore (kW)</label>
            <input
              type="number"
              step="0.5"
              className="w-full border rounded px-3 py-2"
              value={potenzaContatore}
              onChange={(e) => setPotenzaContatore(e.target.value)}
              placeholder="es. 3, 4.5, 6"
            />
          </div>
        </div>
      )}

      {/* Campi GAS */}
      {(tipoServizio === "gas" || tipoServizio === "dual") && (
        <div className="space-y-3">
          <h2 className="font-semibold">Dati Gas</h2>

          <div>
            <label className="block mb-1">Spesa mensile gas (€)</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={spesaGas}
              onChange={(e) => setSpesaGas(e.target.value)}
              placeholder="es. 70"
            />
          </div>

          <div>
            <label className="block mb-1">Consumo annuo gas (Smc)</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={consumoGas}
              onChange={(e) => setConsumoGas(e.target.value)}
              placeholder="es. 1200"
            />
          </div>

          <div>
            <label className="block mb-1">Tipo contatore gas</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={tipoContatoreGas}
              onChange={(e) => setTipoContatoreGas(e.target.value)}
              placeholder="es. G4, G6, G10..."
            />
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-2 rounded"
      >
        Continua
      </button>
    </div>
  );
}
