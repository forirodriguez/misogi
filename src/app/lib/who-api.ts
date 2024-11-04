export interface WHOLifeExpectancy {
  value: number;
  year: number;
  country: string;
  gender: string;
}

const cache: { [key: string]: WHOLifeExpectancy } = {};

export async function getLifeExpectancyFromWHO(
  countryCode: string,
  gender: "FMLE" | "MLE" | "BTSX"
): Promise<WHOLifeExpectancy | null> {
  const cacheKey = `${countryCode}-${gender}`;
  if (cache[cacheKey]) {
    console.log("Data from cache:", cache[cacheKey]);
    return cache[cacheKey];
  }

  try {
    const url = new URL("/api/life-expectancy", window.location.origin);
    url.searchParams.append("countryCode", countryCode);
    url.searchParams.append("gender", gender);

    console.log("Fetching URL:", url.toString());

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error: ${response.status} ${response.statusText}`);
      console.error("Response body:", errorText);
      throw new Error("Failed to fetch data from API");
    }

    const result: WHOLifeExpectancy = await response.json();
    console.log("Data from API:", result);

    // Save to cache
    cache[cacheKey] = result;
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export const countryToISOCode: { [key: string]: string } = {
  Afghanistan: "AFG",
  Albania: "ALB",
  Algeria: "DZA",
  Argentina: "ARG",
  Australia: "AUS",
  Austria: "AUT",
  Belgium: "BEL",
  Brazil: "BRA",
  Canada: "CAN",
  Chile: "CHL",
  China: "CHN",
  Colombia: "COL",
  Denmark: "DNK",
  Finland: "FIN",
  France: "FRA",
  Germany: "DEU",
  Greece: "GRC",
  India: "IND",
  Indonesia: "IDN",
  Ireland: "IRL",
  Israel: "ISR",
  Italy: "ITA",
  Japan: "JPN",
  Mexico: "MEX",
  Netherlands: "NLD",
  "New Zealand": "NZL",
  Norway: "NOR",
  Poland: "POL",
  Portugal: "PRT",
  Russia: "RUS",
  "Saudi Arabia": "SAU",
  Singapore: "SGP",
  "South Africa": "ZAF",
  "South Korea": "KOR",
  Spain: "ESP",
  Sweden: "SWE",
  Switzerland: "CHE",
  Turkey: "TUR",
  "United Kingdom": "GBR",
  "United States": "USA",
  Uruguay: "URY",
};

export const genderToWHOFormat = (gender: string): "FMLE" | "MLE" | "BTSX" => {
  switch (gender) {
    case "female":
      return "FMLE";
    case "male":
      return "MLE";
    default:
      return "BTSX";
  }
};
