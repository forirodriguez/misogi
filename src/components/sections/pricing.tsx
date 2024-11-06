"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { useTheme } from "@/app/providers/theme-provider";

const plans = [
  {
    name: "Explorer",
    monthlyPrice: 9.99,
    annualPrice: 99,
    description: "Take your first steps into a life of purpose and adventure.",
    features: [
      "Personal Life Timeline",
      "Basic Goal Setting Tools",
      "Community Access",
      "Weekly Inspiration Newsletter",
    ],
    tagline: "Begin Your Journey",
  },
  {
    name: "Adventurer",
    monthlyPrice: 19.99,
    annualPrice: 199,
    description:
      "Transform your life with advanced tools and dedicated support.",
    features: [
      "All Explorer Features",
      "Advanced Analytics Dashboard",
      "MISOGI Challenge Platform",
      "Priority Support",
      "Monthly Strategy Sessions",
      "Custom Goal Templates",
    ],
    popular: true,
    tagline: "Embrace the Challenge",
  },
  {
    name: "Pathfinder",
    monthlyPrice: 29.99,
    annualPrice: 299,
    description: "Lead your team through transformative adventures and growth.",
    features: [
      "All Adventurer Features",
      "Dedicated Success Manager",
      "Team Collaboration Tools",
      "Custom Integrations",
      "Group Challenges",
      "API Access",
    ],
    tagline: "Lead the Way",
  },
];

export function Pricing() {
  const { theme } = useTheme();
  const [annualBilling, setAnnualBilling] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("Adventurer");

  return (
    <section
      id="pricing"
      className={`py-24 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 to-slate-900"
          : "bg-gradient-to-b from-gray-50 to-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Choose Your Path</h2>
          <p
            className={`text-lg ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            } max-w-2xl mx-auto`}
          >
            Select the perfect plan to fuel your life&apos;s greatest adventures
          </p>
        </div>

        <div className="flex justify-center items-center mb-12">
          <span
            className={`mr-3 ${
              !annualBilling ? "font-semibold" : "text-gray-500"
            }`}
          >
            Monthly
          </span>
          <div className="relative">
            <Switch
              checked={annualBilling}
              onCheckedChange={setAnnualBilling}
              className="data-[state=checked]:bg-purple-500"
            />
          </div>
          <span
            className={`ml-3 ${
              annualBilling ? "font-semibold" : "text-gray-500"
            }`}
          >
            Annual
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const isSelected = selectedPlan === plan.name;
            const isPopular = plan.popular;

            // Calcula el porcentaje de ahorro para cada plan
            const savingsPercentage = (
              ((plan.monthlyPrice * 12 - plan.annualPrice) /
                (plan.monthlyPrice * 12)) *
              100
            ).toFixed(2);

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <Card
                  className={`p-8 h-full flex flex-col relative  transition-all duration-300 ${
                    isSelected
                      ? "border-purple-500 border-2 shadow-lg shadow-purple-500/20"
                      : theme === "dark"
                      ? "border-gray-800 hover:border-gray-700"
                      : "border-gray-200 hover:border-gray-300"
                  } ${
                    isPopular
                      ? "dark:bg-slate-900/50 bg-white"
                      : "dark:bg-slate-900/30 bg-white/50"
                  }`}
                >
                  {isPopular && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-4 inset-x-0 mx-auto w-fit"
                    >
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium px-4 py-1  rounded-full flex items-center gap-1.5 shadow-lg shadow-purple-500/30">
                        <Sparkles className="w-3.5 h-3.5" />
                        Most Popular
                      </div>
                    </motion.div>
                  )}
                  <div className="mb-8">
                    <span
                      className={`text-sm font-medium ${
                        theme === "dark" ? "text-purple-400" : "text-purple-600"
                      }`}
                    >
                      {plan.tagline}
                    </span>
                    <h3 className="text-2xl font-bold mt-2 mb-3">
                      {plan.name}
                    </h3>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">
                        ${annualBilling ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span
                        className={`text-sm ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        /{annualBilling ? "year" : "month"}
                      </span>
                    </div>
                    {annualBilling && (
                      <span
                        className={`text-sm font-medium ${
                          theme === "dark"
                            ? "text-purple-400"
                            : "text-purple-600"
                        }`}
                      >
                        Ahorra {savingsPercentage}%
                      </span>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check
                          className={`w-5 h-5 mt-0.5 ${
                            isSelected || isPopular
                              ? "text-purple-500"
                              : "text-gray-400"
                          }`}
                        />
                        <span
                          className={
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => setSelectedPlan(plan.name)}
                    className={`w-full ${
                      isSelected
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90"
                        : theme === "dark"
                        ? "bg-gray-800 hover:bg-gray-700 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    }`}
                  >
                    {isSelected ? "Plan Actual" : "Elegir Plan"}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
