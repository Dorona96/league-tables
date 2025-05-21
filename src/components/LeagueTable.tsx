"use client";

import { useEffect, useState } from "react";

type TeamStanding = {
  position: number;
  team: {
    name: string;
    crest: string;
  };
  playedGames: number;
  points: number;
};

type GroupStanding = {
  group: string;
  type: string;
  table: TeamStanding[];
};

type Props = {
  code: string;
};

export default function LeagueTable({ code }: Props) {
  const [standings, setStandings] = useState<GroupStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      console.log("env KEY:", process.env.FOOTBALL_API_KEY);

      try {
        const res = await fetch(`/api/standings?code=${code}`);

        if (!res.ok) throw new Error("API Error");

        const data = await res.json();
        const standings: GroupStanding[] = data.standings || [];
        setStandings(standings);
      } catch (err) {
        setError("Error loading data");
      }

      setLoading(false);
    };

    fetchData();
  }, [code]);

  if (loading) return <p>Loading table...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!standings.length) return <p>No data available</p>;

  return (
    <div className="space-y-8">
      
      {standings.map((group) => (
        <div key={group.group}>
          {standings.length > 1 && (
            <h2 className="text-xl font-semibold mb-2">{group.group}</h2>
          )}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-2 py-1">#</th>
                  <th className="text-left px-2 py-1">Team</th>
                  <th className="text-left px-2 py-1">Played</th>
                  <th className="text-left px-2 py-1">Points</th>
                </tr>
              </thead>
              <tbody>
                {group.table.map((team) => (
                  <tr key={team.team.name} className="border-t">
                    <td className="px-2 py-1">{team.position}</td>
                    <td className="px-2 py-1 flex items-center gap-2">
                      <img
                        src={team.team.crest}
                        alt={`${team.team.name} crest`}
                        className="w-5 h-5 object-contain"
                      />
                      {team.team.name}
                    </td>
                    <td className="px-2 py-1">{team.playedGames}</td>
                    <td className="px-2 py-1">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
