"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface CountrySelectProps {
  value: string;
  onChange: (value: { label: string; value: string }) => void;
  className?: string;
}

const countries = [
  { label: "Afghanistan", value: "AFG" },
  { label: "Albania", value: "ALB" },
  { label: "Algeria", value: "DZA" },
  { label: "Argentina", value: "ARG" },
  { label: "Australia", value: "AUS" },
  { label: "Austria", value: "AUT" },
  { label: "Belgium", value: "BEL" },
  { label: "Brazil", value: "BRA" },
  { label: "Canada", value: "CAN" },
  { label: "Chile", value: "CHL" },
  { label: "China", value: "CHN" },
  { label: "Colombia", value: "COL" },
  { label: "Denmark", value: "DNK" },
  { label: "Finland", value: "FIN" },
  { label: "France", value: "FRA" },
  { label: "Germany", value: "DEU" },
  { label: "Greece", value: "GRC" },
  { label: "India", value: "IND" },
  { label: "Indonesia", value: "IDN" },
  { label: "Ireland", value: "IRL" },
  { label: "Israel", value: "ISR" },
  { label: "Italy", value: "ITA" },
  { label: "Japan", value: "JPN" },
  { label: "Mexico", value: "MEX" },
  { label: "Netherlands", value: "NLD" },
  { label: "New Zealand", value: "NZL" },
  { label: "Norway", value: "NOR" },
  { label: "Poland", value: "POL" },
  { label: "Portugal", value: "PRT" },
  { label: "Russia", value: "RUS" },
  { label: "Saudi Arabia", value: "SAU" },
  { label: "Singapore", value: "SGP" },
  { label: "South Africa", value: "ZAF" },
  { label: "South Korea", value: "KOR" },
  { label: "Spain", value: "ESP" },
  { label: "Sweden", value: "SWE" },
  { label: "Switzerland", value: "CHE" },
  { label: "Turkey", value: "TUR" },
  { label: "United Kingdom", value: "GBR" },
  { label: "United States", value: "USA" },
  { label: "Uruguay", value: "URY" },
];

export function CountrySelect({
  value,
  onChange,
  className,
}: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCountries = countries.filter((country) =>
    country.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedCountryLabel = value
    ? countries.find((country) => country.value === value)?.label
    : "Select country...";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {selectedCountryLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search country..."
            onValueChange={setSearch}
          />
          <CommandEmpty>No country found.</CommandEmpty>
          <CommandGroup>
            {filteredCountries.map((country) => (
              <CommandItem
                key={country.value}
                value={country.value}
                onSelect={() => {
                  onChange(country);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === country.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {country.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
