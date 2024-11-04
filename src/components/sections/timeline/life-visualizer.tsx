import { motion } from "framer-motion";
import { useTheme } from "@/app/providers/theme-provider";
import { Clock, HeartPulseIcon } from "lucide-react";

export interface LifeStats {
  currentAge: number;
  remainingYears: number;
  lifeExpectancy: number;
  remainingMisogis: number;
  remainingMiniAdventures: number;
}

interface LifeVisualizerProps {
  stats: LifeStats;
}

export function LifeVisualizer({ stats }: LifeVisualizerProps) {
  const { theme } = useTheme();
  const totalBlocks = stats.lifeExpectancy;
  const passedBlocks = stats.currentAge;

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-6 h-6 text-purple-500" />
        <h3 className="text-2xl font-bold">Your Life Journey</h3>
      </div>

      <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-purple-100/10 dark:border-purple-500/10">
        <div className="grid grid-cols-10 gap-2">
          {Array.from({ length: totalBlocks }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.02 }}
              className={`relative group`}
            >
              <div
                className={`aspect-square rounded-lg transition-all duration-500 
                  ${
                    index < passedBlocks
                      ? "bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg"
                      : `${
                          theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                        } hover:bg-gray-200 dark:hover:bg-gray-700`
                  } ${
                  index === passedBlocks - 1
                    ? "ring-4 ring-orange-300 dark:ring-amber-600 ring-offset-2 "
                    : ""
                }`}
              />

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div
                  className={`px-2 py-1 text-xs rounded bg-black/80 text-white whitespace-nowrap`}
                >
                  Year {index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center text-sm">
          <div
            className={`flex items-center gap-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <HeartPulseIcon className="w-4 h-4" />
            <span>Life Expectancy ({stats.lifeExpectancy} years)</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex justify-center gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gradient-to-br from-purple-500 to-pink-500" />
          <span className={`${theme === "dark" ? "text-white" : ""}`}>
            Lived Years
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            }`}
          />
          <span className={`${theme === "dark" ? "text-white" : ""}`}>
            Future Years
          </span>
        </div>
      </div>
    </div>
  );
}
