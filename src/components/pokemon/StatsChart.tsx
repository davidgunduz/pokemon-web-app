import React from "react";

type StatsChartProps = {
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
};

function StatsChart({ stats }: StatsChartProps) {
  // Function to get color based on value
  const getColor = (value: number) => {
    if (value <= 50) return "bg-gradient-to-r from-red-400 to-red-600";
    if (value <= 70) return "bg-gradient-to-r from-orange-400 to-orange-600";
    if (value <= 90) return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    if (value <= 110) return "bg-gradient-to-r from-green-400 to-green-600";
    return "bg-gradient-to-r from-blue-400 to-blue-600";
  };

  // Function to calculate min and max stats at level 100
  const calculateMinMax = (base: number, isHP: boolean) => {
    if (isHP) {
      const min = Math.floor((2 * base * 100) / 100 + 110);
      const max = Math.floor((2 * base * 100) / 100 + 110 + 31 + 252 / 4);
      return { min, max };
    } else {
      const min = Math.floor(((2 * base * 100) / 100 + 5) * 0.9);
      const max = Math.floor(((2 * base * 100) / 100 + 5 + 31 + 252 / 4) * 1.1);
      return { min, max };
    }
  };

  const formatStatName = (statName: string) => {
    if (statName === "hp") return "HP";
    if (statName === "attack") return "Attack";
    if (statName === "defense") return "Defense";
    if (statName === "special-attack") return "Sp. Atk";
    if (statName === "special-defense") return "Sp. Def";
    if (statName === "speed") return "Speed";
    return statName.toUpperCase(); // Fallback to uppercase if other stats appear
  };

  // Calculate the total of the base stats
  const totalBaseStat = stats.reduce((acc, stat) => acc + stat.base_stat, 0);

  return (
    <div className="mt-4">
      {stats.map((stat) => {
       const statName = formatStatName(stat.stat.name);
        const isHP = statName === "HP";
        const { min, max } = calculateMinMax(stat.base_stat, isHP);
        const colorClass = getColor(stat.base_stat);
        const percentage = (stat.base_stat / 255) * 100; // 255 is the max base stat in Pokémon

        return (
          <div key={statName} className="flex items-center mb-4">
            <div className="w-20 font-semibold">{statName}</div>
            <div className="w-12">{stat.base_stat}</div>
            <div className="flex-1 mx-2">
              <div className="w-full bg-gray-100 dark:bg-slate-200 rounded h-6 shadow-inner">
                <div className={`h-6 rounded ${colorClass} shadow-lg transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
              </div>
            </div>
            <div className="w-10  text-gray-700 dark:text-gray-300">{min}</div>
            <div className="w-10  text-gray-700 dark:text-gray-300">{max}</div>
          </div>
        );
      })}
      <div className="flex items-center mt-4">
        <div className="w-20 font-semibold">Total</div>
        <div className="w-12">{totalBaseStat}</div>
        <div className="flex-1 mx-2"></div> {/* No bar for total */}
        <div className="w-10  font-semibold text-gray-700 dark:text-gray-300">Min</div>
        <div className="w-10 font-semibold text-gray-700 dark:text-gray-300">Max</div>
      </div>
    </div>
  );
}

export default StatsChart; 
