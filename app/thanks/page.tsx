export default function ThankYou() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-green-600">✅ Richiesta inviata!</h1>

      <div className="flex gap-4 text-sm">
        <span>✔️ Richiesta</span>
        <span>➡️ Verifica</span>
        <span>➡️ Contatto</span>
        <span>➡️ Attivazione</span>
      </div>

      <p className="text-gray-600 max-w-md text-center">
        Un nostro operatore ti contatterà a breve per completare l'attivazione.
      </p>
    </div>
  );
}
