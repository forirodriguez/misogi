"use client";

import { Button } from "@/components/ui/button";
import { Globe, Mountain, Brain, HeartHandshakeIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/app/providers/theme-provider";

const challenges = [
  {
    title: "Climb a Mountain",
    icon: Mountain,
    description:
      "Conquer physical limits and reach new heights on a transformative journey.",
    difficulty: "Very High",
    category: "Physical",
  },
  {
    title: "Learn a New Skill",
    icon: Brain,
    description:
      "Challenge your mind with a skill you've never tried before and build resilience.",
    difficulty: "Medium",
    category: "Mental",
  },
  {
    title: "Travel Solo",
    icon: Globe,
    description:
      "Experience a journey of self-discovery by exploring new places on your own.",
    difficulty: "High",
    category: "Adventure",
  },
  {
    title: "Volunteer for a Cause",
    icon: HeartHandshakeIcon,
    description:
      "Make a positive impact and step out of your comfort zone to help others.",
    difficulty: "Medium",
    category: "Community",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const gradientClasses = {
  Physical: "from-blue-500 to-cyan-500",
  Mental: "from-purple-500 to-indigo-500",
  Adventure: "from-orange-500 to-amber-500",
  Community: "from-green-500 to-teal-500",
};

export function Challenge() {
  const { theme } = useTheme();

  return (
    <section
      id="challenge"
      className={`relative py-24 ${
        theme === "dark" ? "bg-[#0B1120]" : "bg-white"
      }`}
    >
      {/* Background Mountain SVG */}
      <div className="absolute left-10 top-20 pointer-events-none">
        <Mountain
          className={`w-48 h-48 ${
            theme === "dark" ? "text-slate-800/20" : "text-gray-100"
          }`}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            MISOGI Challenge
          </h2>
          <p
            className={`text-xl ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Push beyond your boundaries with a bold, transformative challenge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className={`p-8 rounded-2xl ${
                theme === "dark" ? "bg-slate-900/50" : "bg-white shadow-lg"
              } border ${
                theme === "dark" ? "border-slate-800" : "border-gray-100"
              }`}
            >
              <p
                className={`text-lg mb-8 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                The MISOGI Challenge is inspired by an ancient Japanese practice
                of spiritual and physical purification. This annual challenge
                encourages you to set a daring, almost impossible goal—one that
                will stretch your limits and reshape your mindset.
              </p>
              <blockquote
                className={`border-l-4 pl-6 mb-8 ${
                  theme === "dark"
                    ? "border-purple-500/30"
                    : "border-purple-500"
                }`}
              >
                <p
                  className={`text-lg italic mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  &quot;The MISOGI Challenge transformed my perspective on what
                  I can achieve. It&apos;s not just about reaching a goal;
                  it&apos;s about discovering who you are in the process.&quot;
                </p>
                <footer
                  className={`${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  - Alex R., MISOGI Participant
                </footer>
              </blockquote>
              <Button
                className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity w-full md:w-auto px-8`}
              >
                Join the Challenge
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`p-6 rounded-xl ${
                  theme === "dark"
                    ? "bg-slate-900/50 border-slate-800"
                    : "bg-white border-gray-100 shadow-md"
                } border transition-all duration-300`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`bg-clip-text [-webkit-background-clip:text] text-transparent`}
                  >
                    <challenge.icon
                      className={`w-6 h-6 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                      strokeWidth={2}
                    />
                  </div>
                  <h3
                    className={`text-lg font-semibold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {challenge.title}
                  </h3>
                </div>
                <p
                  className={`text-sm mb-4 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {challenge.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-between text-xs">
                  <span
                    className={`px-3 mb-2 sm:mb-0 py-1 rounded-full ${
                      theme === "dark"
                        ? "bg-slate-800 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {challenge.difficulty}
                  </span>
                  <span
                    className={`bg-gradient-to-r ${
                      gradientClasses[
                        challenge.category as keyof typeof gradientClasses
                      ]
                    } bg-clip-text [-webkit-background-clip:text] text-transparent font-medium`}
                  >
                    {challenge.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
