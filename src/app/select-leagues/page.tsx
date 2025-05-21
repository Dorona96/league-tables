'use client';

import { useState, useEffect } from "react";
import { LEAGUES } from "@/lib/leagues";
import { useRouter } from "next/navigation";

export default function SelectLeaguesPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("selectedLeagues");
    if (saved) {
      setSelected(JSON.parse(saved));
      router.push("/home"); 
    }
  }, []);

  const toggle = (code: string) => {
    setSelected((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const save = () => {
    localStorage.setItem("selectedLeagues", JSON.stringify(selected));
    router.push("/home");
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Choose Leauges to follow:</h1>
      <ul className="space-y-2">
        {LEAGUES.map((league) => (
          <li key={league.code}>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selected.includes(league.code)}
                onChange={() => toggle(league.code)}
              />
              {league.name}
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={save}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
        disabled={selected.length === 0}
      >
        Continue
      </button>
    </main>
  );
}
