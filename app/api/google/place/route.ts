import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const placeId =
      request.nextUrl.searchParams.get("placeId");

    if (!placeId) {
      return NextResponse.json(
        {
          error: "Missing placeId.",
        },
        {
          status: 400,
        }
      );
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

    //
    // Fetch Place Details
    //

    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,

          "X-Goog-FieldMask":
            "addressComponents,formattedAddress",
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();

      console.error(
        "Google Place Details Error:",
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

    const place = await response.json();

    let streetNumber = "";
    let route = "";
    let suburb = "";
    let state = "";
    let postcode = "";

    for (const component of place.addressComponents ?? []) {

      const types: string[] =
        component.types ?? [];

      if (types.includes("street_number")) {
        streetNumber =
          component.longText;
      }

      if (types.includes("route")) {
        route =
          component.longText;
      }

      if (types.includes("locality")) {
        suburb =
          component.longText;
      }

      if (
        types.includes(
          "administrative_area_level_1"
        )
      ) {
        state =
          component.shortText;
      }

      if (
        types.includes("postal_code")
      ) {
        postcode =
          component.longText;
      }

    }

    const street =
      `${streetNumber} ${route}`.trim();

    return NextResponse.json({
      street,
      suburb,
      state,
      postcode,

      formattedAddress:
        place.formattedAddress,
    });

  } catch (error) {

    console.error(
      "Place Route Error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to retrieve place details.",
      },
      {
        status: 500,
      }
    );

  }
}