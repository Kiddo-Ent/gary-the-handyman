import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const search =
      request.nextUrl.searchParams.get("q")?.trim() ?? "";

    if (search.length < 3) {
      return NextResponse.json([]);
    }

    const apiKey =
      process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
      console.error(
        "GOOGLE_PLACES_API_KEY is missing."
      );

      return NextResponse.json(
        {
          error: "Google API key missing.",
        },
        {
          status: 500,
        }
      );
    }

    const response = await fetch(
      "https://places.googleapis.com/v1/places:autocomplete",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          "X-Goog-Api-Key": apiKey,
        },

        body: JSON.stringify({
          input: search,

          includedRegionCodes: ["au"],

          includedPrimaryTypes: [
            "street_address",
          ],

          languageCode: "en",

          regionCode: "AU",
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();

      console.error(
        "Google Autocomplete Error:",
        text
      );

      return NextResponse.json(
        {
          error: text,
        },
        {
          status: response.status,
        }
      );
    }

    const json = await response.json();

    const suggestions =
      json.suggestions?.map((item: any) => ({
        placeId:
          item.placePrediction.placeId,

        text:
          item.placePrediction.text.text,
      })) ?? [];

    return NextResponse.json(
      suggestions
    );
  } catch (error) {
    console.error(
      "Autocomplete Route Error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to retrieve addresses.",
      },
      {
        status: 500,
      }
    );
  }
}