import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function CalculadoraArbitraje() {
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
    <div className="p-6 max-w-xl mx-auto space-y-6 bg-zinc-900 text-white rounded-xl shadow-xl">
      <Card className="bg-zinc-800 text-white">
        <CardContent className="space-y-4">
          <h1 className="text-2xl font-bold text-center">💱 Calculadora de Arbitraje</h1>
          <div>
            <Label>💰 Inversión en BOB</Label>
            <Input className="bg-zinc-700 text-white" type="number" value={bob} onChange={(e) => setBob(e.target.value)} />
          </div>
          <div>
            <Label>🇧🇴➡️🇦🇷 Tipo de cambio BOB/ARS (por cada 1000 ARS)</Label>
            <Input className="bg-zinc-700 text-white" type="number" value={bobToArs} onChange={(e) => setBobToArs(e.target.value)} />
          </div>
          <div>
            <Label>🇦🇷➡️🇺🇸 Tipo de cambio ARS/USD</Label>
            <Input className="bg-zinc-700 text-white" type="number" value={arsToUsd} onChange={(e) => setArsToUsd(e.target.value)} />
          </div>
          <div>
            <Label>🇺🇸➡️🇧🇴 Tipo de cambio USD/BOB</Label>
            <Input className="bg-zinc-700 text-white" type="number" value={usdToBob} onChange={(e) => setUsdToBob(e.target.value)} />
          </div>
          <div>
            <Label>📈 Rendimiento deseado (%)</Label>
            <Input className="bg-zinc-700 text-white" type="number" value={rendimientoDeseado} onChange={(e) => setRendimientoDeseado(e.target.value)} />
          </div>
          <Button className="w-full bg-green-600 hover:bg-green-700">🔍 Calcular</Button>
        </CardContent>
      </Card>

      {gananciaPorcentual !== null && (
        <Card className="bg-zinc-800 text-white">
          <CardContent className="space-y-2">
            <p>📊 <strong>Ganancia porcentual:</strong> <span className="text-green-400">{gananciaPorcentual}%</span></p>
            <p>💵 <strong>Ganancia neta:</strong> <span className="text-green-400">{gananciaNeta} BOB</span></p>
            <p>🔝 <strong>Tasa máxima BOB/ARS para al menos {rendimientoDeseado}% de ganancia:</strong> <span className="text-yellow-300">{tasaMaxima}</span></p>
            <p>🧠 <strong>Mejor tasa máxima para comprar ARS:</strong> <span className="text-blue-300">{mejorTasaCompra} BOB cada 1000 ARS</span></p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}