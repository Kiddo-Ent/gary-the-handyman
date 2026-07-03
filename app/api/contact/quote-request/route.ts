import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest
) {
  try {

    const body = await request.json();

    const response = await fetch(
      `${process.env.TOOLBOX_API_URL}/api/public/lead`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          "X-API-Key":
            process.env.TOOLBOX_API_KEY!,
        },

        body: JSON.stringify(body),

        cache: "no-store",
      }
    );

    const result =
      await response.json();

    return NextResponse.json(
      result,
      {
        status: response.status,
      }
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to submit quote request.",
      },
      {
        status: 500,
      }
    );

  }
}