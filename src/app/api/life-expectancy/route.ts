import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const countryCode = searchParams.get("countryCode");
  const gender = searchParams.get("gender");

  if (!countryCode || !gender) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const url = new URL(
      "https://apps.who.int/gho/athena/api/GHO/WHOSIS_000001"
    );
    url.searchParams.append("filter", `COUNTRY:${countryCode};SEX:${gender}`);
    url.searchParams.append("format", "json");
    url.searchParams.append("profile", "simple");

    console.log("Fetching WHO API:", url.toString());

    const response = await fetch(url.toString());

    if (!response.ok) {
      console.error(`WHO API error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error("WHO API response body:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch data from WHO API" },
        { status: 500 }
      );
    }

    const data = await response.json();

    // Process data to extract the latest value
    if (!data.fact || data.fact.length === 0) {
      console.warn("No data available for the given country and gender.");
      return NextResponse.json(
        { error: "No data available for the given country and gender." },
        { status: 404 }
      );
    }

    // Sort the facts by year descending to get the latest data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sortedFacts = data.fact.sort((a: any, b: any) => {
      const yearA = parseInt(a.dim.YEAR);
      const yearB = parseInt(b.dim.YEAR);
      return yearB - yearA; // Descending order
    });

    const latestFact = sortedFacts[0];
    const value = parseFloat(latestFact.Value);
    const year = parseInt(latestFact.dim.YEAR);
    const country = latestFact.dim.COUNTRY;
    const sex = latestFact.dim.SEX;

    // Construct the result object
    const result = {
      value,
      year,
      country,
      gender: sex,
    };

    // Return only the latest data
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching data from WHO API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
