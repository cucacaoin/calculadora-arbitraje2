import { useState } from 'react'
import './App.css'

function App() {
  const [usdToBob, setUsdToBob] = useState('')
  const [bobToArs, setBobToArs] = useState('')
  const [arsToUsd, setArsToUsd] = useState('')
  const [desiredReturn, setDesiredReturn] = useState(2.5)
  const [result, setResult] = useState(null)

  const calculate = () => {
    const usd = 100
    const bob = usd * parseFloat(usdToBob)
    const ars = bob * (1000 / parseFloat(bobToArs))
    const finalUsd = ars / parseFloat(arsToUsd)
    const spread = ((finalUsd - usd) / usd) * 100
    const gain = finalUsd - usd
    const maxBobToArs = (usd * parseFloat(usdToBob)) / ((usd * (1 + desiredReturn / 100)) * parseFloat(arsToUsd) / 1000)

    setResult({
      finalUsd: finalUsd.toFixed(2),
      spread: spread.toFixed(2),
      gain: gain.toFixed(2),
      maxBobToArs: maxBobToArs.toFixed(2)
    })
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center p-4">
      <div className="bg-[#161b22] p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">💰 Calculadora de Arbitraje</h1>
        <div className="space-y-2">
          <label>💵 USD → BOB</label>
          <input
            type="number"
            value={usdToBob}
            onChange={(e) => setUsdToBob(e.target.value)}
            className="w-full p-2 rounded bg-[#0d1117] border border-gray-600"
          />
          <label>🇧🇴 BOB → ARS (por cada 1000 ARS)</label>
          <input
            type="number"
            value={bobToArs}
            onChange={(e) => setBobToArs(e.target.value)}
            className="w-full p-2 rounded bg-[#0d1117] border border-gray-600"
          />
          <label>🇦🇷 ARS → USD</label>
          <input
            type="number"
            value={arsToUsd}
            onChange={(e) => setArsToUsd(e.target.value)}
            className="w-full p-2 rounded bg-[#0d1117] border border-gray-600"
          />
          <label>📈 Rendimiento deseado (%)</label>
          <input
            type="number"
            value={desiredReturn}
            onChange={(e) => setDesiredReturn(e.target.value)}
            className="w-full p-2 rounded bg-[#0d1117] border border-gray-600"
          />
        </div>
        <button
          onClick={calculate}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-xl"
        >
          Calcular 💸
        </button>

        {result && (
          <div className="bg-[#0d1117] p-4 rounded-xl border border-gray-700 mt-4 space-y-2">
            <p>💵 USD final: <strong>{result.finalUsd}</strong></p>
            <p>📊 Spread: <strong>{result.spread}%</strong></p>
            <p>💰 Ganancia neta: <strong>{result.gain} USD</strong></p>
            <p>🔢 Máximo BOB → ARS para rendimiento deseado: <strong>{result.maxBobToArs}</strong></p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
