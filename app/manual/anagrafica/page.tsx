"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProgressBar from "@/components/ProgressBar";

export default function AnagraficaPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("email");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const submit = () => {
    router.push("/manual/thanks");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <ProgressBar step={7} />
      <h1 className="text-2xl font-bold mb-6">Dati intestatario</h1>

      <div className="mb-4">
        <label>Email</label>
        <input
          value={email}
          readOnly
          className="w-full border rounded-lg p-3 bg-gray-100"
        />
      </div>

      <div className="mb-4">
        <label>Telefono</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="mb-4">
        <label>Nome</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="mb-4">
        <label>Cognome</label>
        <input
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="mb-4">
        <label>Indirizzo fornitura</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="mb-6">
        <label>Metodo di pagamento</label>
        <select
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Seleziona</option>
          <option value="rid">Addebito bancario</option>
          <option value="bollettino">Bollettino</option>
          <option value="carta">Carta</option>
        </select>
      </div>

      <button
        onClick={submit}
        className="w-full bg-green-600 text-white py-3 rounded-xl"
      >
        Invia richiesta
      </button>
    </div>
  );
}
