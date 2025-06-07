import React, { useState } from 'react';

export default function App() {
  const [bob, setBob] = useState('');
  const [bobToArs, setBobToArs] = useState('');
  const [arsToUsd, setArsToUsd] = useState('');
  const [usdToBob, setUsdToBob] = useState('');
  const [rendimientoDeseado, setRendimientoDeseado] = useState('2.5');

  const [gananciaPorcentual, setGananciaPorcentual] = useState(null);
  const [gananciaNeta, setGananciaNeta] = useState(null);
  const [tasaMaxima, setTasaMaxima] = useState(null);
  const [mejorTasaCompra, setMejorTasaCompra] = useState(null);

  const calcular = () => {
    const bobNum = parseFloat(bob);
    const bobToArsNum = parseFloat(bobToArs);
    const arsToUsdNum = parseFloat(arsToUsd);
    const usdToBobNum = parseFloat(usdToBob);
    const rendimientoDecimal = 1 + parseFloat(rendimientoDeseado) / 100;

    if (
      isNaN(bobNum) ||
      isNaN(bobToArsNum) ||
      isNaN(arsToUsdNum) ||
      isNaN(usdToBobNum) ||
      isNaN(rendimientoDecimal)
    ) {
      alert("Por favor, completa todos los campos con números válidos.");
      return;
    }

    const arsRecibidos = (bobNum / bobToArsNum) * 1000;
    const usdRecibidos = arsRecibidos / arsToUsdNum;
    const bobFinal = usdRecibidos * usdToBobNum;
    const ganancia = bobFinal - bobNum;
    const porcentaje = (ganancia / bobNum) * 100;

    const tasaMax = (bobToArsNum * arsToUsdNum * rendimientoDecimal) / usdToBobNum;
    const mejorTasa = (usdToBobNum * 1000) / (arsToUsdNum * rendimientoDecimal);

    setGananciaPorcentual(porcentaje.toFixed(2));
    setGananciaNeta(ganancia.toFixed(2));
    setTasaMaxima(tasaMax.toFixed(2));
    setMejorTasaCompra(mejorTasa.toFixed(2));
  };

  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      color: 'white',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        maxWidth: '500px',
        margin: 'auto',
        backgroundColor: '#2a2a2a',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 0 20px rgba(0,0,0,0.5)'
      }}>
        <h1 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '1rem' }}>💱 Calculadora de Arbitraje</h1>

        <div style={{ marginBottom: '1rem' }}>
          <label>💰 Inversión en BOB</label>
          <input type="number" value={bob} onChange={(e) => setBob(e.target.value)} style={inputStyle} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>🇧🇴➡️🇦🇷 Tipo de cambio BOB/ARS (por cada 1000 ARS)</label>
          <input type="number" value={bobToArs} onChange={(e) => setBobToArs(e.target.value)} style={inputStyle} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>🇦🇷➡️🇺🇸 Tipo de cambio ARS/USD</label>
          <input type="number" value={arsToUsd} onChange={(e) => setArsToUsd(e.target.value)} style={inputStyle} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>🇺🇸➡️🇧🇴 Tipo de cambio USD/BOB</label>
          <input type="number" value={usdToBob} onChange={(e) => setUsdToBob(e.target.value)} style={inputStyle} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>📈 Rendimiento deseado (%)</label>
          <input type="number" value={rendimientoDeseado} onChange={(e) => setRendimientoDeseado(e.target.value)} style={inputStyle} />
        </div>

        <button onClick={calcular} style={buttonStyle}>🔍 Calcular</button>

        {gananciaPorcentual !== null && (
          <div style={{ marginTop: '2rem', backgroundColor: '#333', padding: '1rem', borderRadius: '0.5rem' }}>
            <p>📊 <strong>Ganancia porcentual:</strong> <span style={{ color: '#4ade80' }}>{gananciaPorcentual}%</span></p>
            <p>💵 <strong>Ganancia neta:</strong> <span style={{ color: '#4ade80' }}>{gananciaNeta} BOB</span></p>
            <p>🔝 <strong>Tasa máxima BOB/ARS para al menos {rendimientoDeseado}%:</strong> <span style={{ color: '#facc15' }}>{tasaMaxima}</span></p>
            <p>🧠 <strong>Mejor tasa máxima para comprar ARS:</strong> <span style={{ color: '#60a5fa' }}>{mejorTasaCompra} BOB cada 1000 ARS</span></p>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  marginTop: '0.3rem',
  backgroundColor: '#444',
  border: '1px solid #666',
  borderRadius: '0.5rem',
  color: 'white'
};

const buttonStyle = {
  width: '100%',
  padding: '0.7rem',
  backgroundColor: '#22c55e',
  color: 'white',
  border: 'none',
  borderRadius: '0.5rem',
  fontSize: '1rem',
  cursor: 'pointer'
};