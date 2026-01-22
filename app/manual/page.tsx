<input
  type="number"
  placeholder="Consumo annuo luce (kWh)"
  value={consumoLuce}
  onChange={(e) => setConsumoLuce(Number(e.target.value))}
  className="input"
/>

<input
  type="number"
  placeholder="Consumo annuo gas (Smc)"
  value={consumoGas}
  onChange={(e) => setConsumoGas(Number(e.target.value))}
  className="input"
/>
