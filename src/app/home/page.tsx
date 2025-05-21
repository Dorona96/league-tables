"use client";

import { useEffect, useState } from "react";
import { LEAGUES } from "@/lib/leagues";
import LeagueTable from "@/src/components/LeagueTable";

type League = {
  code: string;
  name: string;
  icon: string;
};

export default function Home() {
  const [selectedLeagues, setSelectedLeagues] = useState<League[]>([]);
  const [activeLeague, setActiveLeague] = useState<League | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("selectedLeagues");
    if (!saved) return;

    const codes: string[] = JSON.parse(saved);
    const leagues = LEAGUES.filter((league) => codes.includes(league.code));
    setSelectedLeagues(leagues);
    setActiveLeague(leagues[0] || null);
  }, []);

  return (
    <div className="flex h-screen">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden fixed top-4 right-4 z-50 bg-blue-600 text-white px-3 py-2 rounded"
        >
          ☰
        </button>
      )}
      {/* Overlay*/}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
        />
      )}
      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-gray-100 border-l p-4 z-50 transform transition-transform duration-300 ease-in-out
  ${
    isOpen ? "translate-x-0" : "translate-x-full"
  } md:static md:translate-x-0 md:w-60 md:border-r`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Leagues List</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-xl"
          >
            ✕
          </button>
        </div>

        <ul className="space-y-2">
          {selectedLeagues.map((league) => (
            <li key={league.code}>
              <button
                onClick={() => {
                  setActiveLeague(league);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded ${
                  activeLeague?.code === league.code
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {league.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {activeLeague ? (
          <div>
            <img src={activeLeague.icon}/>
            <h1 className="text-2xl font-bold mb-4">{activeLeague.name}</h1>
            <LeagueTable code={activeLeague.code} />
          </div>
        ) : (
          <p>No League was chosen</p>
        )}
      </main>
    </div>
  );
}
