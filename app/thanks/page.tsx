export default function ThanksPage() {
  return (
    <div className="max-w-xl mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Grazie!</h1>
      <p className="mb-6">La tua richiesta è stata inviata correttamente.</p>

      <div className="flex justify-between text-sm text-gray-500 mt-10">
        <span>✔ Upload</span>
        <span>✔ Consumi</span>
        <span>✔ Offerte</span>
        <span>✔ Dati</span>
        <span className="font-bold text-black">✔ Conferma</span>
      </div>

      <p className="mt-8 text-gray-600">
        A breve verrai contattato da un nostro consulente per completare la pratica.
      </p>
    </div>
  );
}
