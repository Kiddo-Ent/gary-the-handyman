import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const form = await request.formData();

    const name = form.get("name")?.toString() || "";
    const phone = form.get("phone")?.toString() || "";
    const email = form.get("email")?.toString() || "";
    const address = form.get("address")?.toString() || "";
    const service = form.get("service")?.toString() || "";
    const message = form.get("message")?.toString() || "";
    const contactMethod = form.get("contactMethod")?.toString() || "";
    const inspection = form.get("inspection")?.toString() || "";

    await resend.emails.send({
      from: "Gary the Handyman Website <onboarding@resend.dev>",
      to: ["garythehandyman26@gmail.com"],
      replyTo: email,
      subject: `🔨 New Quote Request - ${name}`,

      html: `
      <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;">

        <h1 style="color:#0f4c81;">
          New Quote Request
        </h1>

        <p>
          A new quote request has been submitted through the Gary the Handyman website.
        </p>

        <hr>

        <h2>Customer Details</h2>

        <table cellpadding="8" cellspacing="0">

          <tr>
            <td><strong>Name</strong></td>
            <td>${name}</td>
          </tr>

          <tr>
            <td><strong>Phone</strong></td>
            <td>${phone}</td>
          </tr>

          <tr>
            <td><strong>Email</strong></td>
            <td>${email}</td>
          </tr>

          <tr>
            <td><strong>Property Address</strong></td>
            <td>${address || "Not provided"}</td>
          </tr>

        </table>

        <hr>

        <h2>Job Details</h2>

        <table cellpadding="8" cellspacing="0">

          <tr>
            <td><strong>Service Required</strong></td>
            <td>${service}</td>
          </tr>

          <tr>
            <td><strong>Preferred Contact</strong></td>
            <td>${contactMethod}</td>
          </tr>

          <tr>
            <td><strong>Preferred Inspection</strong></td>
            <td>${inspection}</td>
          </tr>

        </table>

        <h2>Description</h2>

        <div style="
          background:#f4f4f4;
          padding:20px;
          border-radius:8px;
          white-space:pre-wrap;
        ">
${message}
        </div>

        <hr>

        <p style="font-size:12px;color:#666;">
          This enquiry was submitted via
          <strong>garythehandyman.com.au</strong>
        </p>

      </div>
      `,
    });

    return Response.json({
      success: true,
    });

  } catch (error) {
    console.error("QUOTE FORM ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to send quote request.",
      },
      {
        status: 500,
      }
    );
  }
}