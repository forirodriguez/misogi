import {
  getLifeExpectancyFromWHO,
  countryToISOCode,
  genderToWHOFormat,
} from "./who-api";

export type Gender = "male" | "female" | "not_specified";

const fallbackLifeExpectancy: {
  [key: string]: { male: number; female: number };
} = {
  Japan: { male: 81.5, female: 87.6 },
  Switzerland: { male: 81.9, female: 85.8 },
  Singapore: { male: 81.1, female: 85.9 },
  Australia: { male: 81.3, female: 85.4 },
  Spain: { male: 80.7, female: 86.2 },
  Italy: { male: 81.3, female: 85.6 },
  Norway: { male: 81.3, female: 84.7 },
  Sweden: { male: 81.3, female: 84.8 },
  France: { male: 79.9, female: 85.8 },
  Canada: { male: 80.4, female: 84.4 },
  "United Kingdom": { male: 79.4, female: 83.1 },
  Germany: { male: 79.1, female: 83.5 },
  "United States": { male: 76.1, female: 81.4 },
  Uruguay: { male: 73.4, female: 80.6 },
};

export interface LifeExpectancyData {
  value: number;
  year: number;
  country: string;
  gender: string;
}

export async function getLifeExpectancy(
  country: string,
  gender: Gender
): Promise<LifeExpectancyData> {
  try {
    const isoCode = countryToISOCode[country];
    if (!isoCode) {
      throw new Error(`Country code not found for: ${country}`);
    }

    const whoGender = genderToWHOFormat(gender);
    const whoData = await getLifeExpectancyFromWHO(isoCode, whoGender);

    if (whoData && whoData.value != null) {
      return whoData;
    } else {
      console.warn(`No WHO data found for ${country} with gender ${gender}`);
    }

    // Use fallback data if WHO data is not available
    const fallbackValue = getFallbackLifeExpectancy(country, gender);
    return {
      value: fallbackValue,
      year: new Date().getFullYear(),
      country,
      gender,
    };
  } catch (error) {
    console.error("Error getting life expectancy:", error);
    const fallbackValue = getFallbackLifeExpectancy(country, gender);
    return {
      value: fallbackValue,
      year: new Date().getFullYear(),
      country,
      gender,
    };
  }
}

function getFallbackLifeExpectancy(country: string, gender: Gender): number {
  const countryData = fallbackLifeExpectancy[country];

  if (!countryData) {
    console.warn(`Fallback data not available for ${country}. Using default.`);
    return 75;
  }

  switch (gender) {
    case "male":
      return countryData.male;
    case "female":
      return countryData.female;
    case "not_specified":
      return (countryData.male + countryData.female) / 2;
  }
}

export function getLifeExpectancyString(
  country: string,
  gender: Gender,
  whoData?: { value: number; year: number }
): string {
  if (whoData) {
    return `${whoData.value.toFixed(1)} years (WHO data from ${whoData.year})`;
  }

  const expectancy = getFallbackLifeExpectancy(country, gender);

  if (gender === "not_specified") {
    const countryData = fallbackLifeExpectancy[country];
    if (countryData) {
      return `${expectancy.toFixed(1)} years (average between male: ${
        countryData.male
      } and female: ${countryData.female})`;
    }
  }

  return `${expectancy.toFixed(1)} years`;
}

export const availableCountries = Object.keys(countryToISOCode).sort();
