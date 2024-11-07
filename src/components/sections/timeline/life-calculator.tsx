"use client";

import { useState } from "react";
import { differenceInYears, differenceInMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  getLifeExpectancy,
  Gender,
  LifeExpectancyData,
} from "@/lib/life-expectancy";
import { LifeVisualizer, LifeStats } from "./life-visualizer";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/providers/theme-provider";
import { CountrySelect } from "./country-select";

const genderOptions: { value: Gender; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "not_specified", label: "Not Specified" },
];

export function LifeCalculator() {
  const { theme } = useTheme();
  const [birthDate, setBirthDate] = useState("");
  const [country, setCountry] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [gender, setGender] = useState<Gender | undefined>(undefined);
  const [lifeStats, setLifeStats] = useState<LifeStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expectedLifespanData, setExpectedLifespanData] =
    useState<LifeExpectancyData | null>(null);

  const calculateLife = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!birthDate || !country || !gender) {
        setError("Please fill in all fields.");
        setIsLoading(false);
        return;
      }

      const birthDateObj = new Date(birthDate);
      const today = new Date();
      const currentAge = differenceInYears(today, birthDateObj);

      // Get life expectancy data
      const data = await getLifeExpectancy(country.label, gender as Gender);
      setExpectedLifespanData(data);

      const expectedLifespan = data.value;

      const remainingYears = expectedLifespan - currentAge;
      const remainingMonths = differenceInMonths(
        new Date(
          birthDateObj.getFullYear() + expectedLifespan,
          birthDateObj.getMonth()
        ),
        today
      );

      setLifeStats({
        currentAge,
        remainingYears,
        lifeExpectancy: expectedLifespan,
        remainingMisogis: Math.max(0, Math.floor(remainingYears)),
        remainingMiniAdventures: Math.max(0, Math.floor(remainingMonths * 2)),
      });
    } catch (error) {
      setError("Unable to calculate life expectancy. Please try again later.");
      console.error("Error calculating life stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div
        className={`p-8 rounded-2xl backdrop-blur-sm border ${
          theme === "dark"
            ? "bg-slate-900/50 border-slate-800"
            : "bg-white/70 border-purple-100 shadow-lg"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Birthdate
            </label>
            <Input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className={`w-full ${
                theme === "dark"
                  ? "bg-slate-800/50 border-slate-700"
                  : "bg-white border-purple-100"
              }`}
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Country
            </label>
            <CountrySelect
              value={country ? country.value : ""}
              onChange={(value) => setCountry(value)}
              className={`${
                theme === "dark"
                  ? "bg-slate-800/50 border-slate-700 hover:bg-slate-800/70"
                  : "bg-white border-purple-100 hover:bg-gray-50"
              }`}
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Gender
            </label>
            <Select
              onValueChange={(value: Gender) => setGender(value)}
              value={gender}
            >
              <SelectTrigger
                className={`w-full ${
                  theme === "dark"
                    ? "bg-slate-800/50 border-slate-700"
                    : "bg-white border-purple-100"
                }`}
              >
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent>
                {genderOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={calculateLife}
          className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white 
            hover:opacity-90 transition-all ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          disabled={!birthDate || !country || !gender || isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Calculating...</span>
            </div>
          ) : (
            "Calculate Your Life Journey"
          )}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <AnimatePresence>
        {lifeStats && !error && expectedLifespanData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 space-y-6"
          >
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Life Overview</AlertTitle>
              <AlertDescription>
                Based on the WHO data from {expectedLifespanData.year} in{" "}
                {country?.label} for{" "}
                {gender === "not_specified" ? "all genders" : gender}:{" "}
                {expectedLifespanData.value.toFixed(1)} years
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card
                  className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white 
                  hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold mb-2">Current Age</h3>
                  <p className="text-3xl font-bold">{lifeStats.currentAge}</p>
                  <p className="text-sm opacity-80">years</p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card
                  className="p-6 bg-gradient-to-br from-blue-500 to-purple-500 text-white 
                  hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    Remaining Misogis
                  </h3>
                  <p className="text-3xl font-bold">
                    {lifeStats.remainingMisogis}
                  </p>
                  <p className="text-sm opacity-80">annual challenges</p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card
                  className="p-6 bg-gradient-to-br from-pink-500 to-orange-500 text-white 
                  hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    Mini Adventures
                  </h3>
                  <p className="text-3xl font-bold">
                    {lifeStats.remainingMiniAdventures}
                  </p>
                  <p className="text-sm opacity-80">opportunities</p>
                </Card>
              </motion.div>
            </div>

            <LifeVisualizer stats={lifeStats} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
