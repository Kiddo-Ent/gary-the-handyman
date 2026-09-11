import { Resend } from "resend";

import { findOrCreateCustomer } from "@/lib/crm/customers";
import { findOrCreateProperty } from "@/lib/crm/properties";
import { createOpportunity } from "@/lib/crm/opportunities";
import { uploadPhoto } from "@/lib/crm/photos";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let stage = "Starting";

  try {
    stage = "Reading form data";

    const form = await request.formData();

    const name = form.get("name")?.toString().trim() ?? "";
    const phone = form.get("phone")?.toString().trim() ?? "";
    const email = form.get("email")?.toString().trim() ?? "";

    const address = form.get("address")?.toString().trim() ?? "";
    const suburb = form.get("suburb")?.toString().trim() ?? "";
    const state = form.get("state")?.toString().trim() ?? "VIC";
    const postcode = form.get("postcode")?.toString().trim() ?? "";

    const service = form.get("service")?.toString().trim() ?? "";
    const message = form.get("message")?.toString().trim() ?? "";

    const contactMethod =
      form.get("contactMethod")?.toString().trim() ?? "Phone";

    const inspection =
      form.get("inspection")?.toString().trim() ?? "";

    const photos = form
      .getAll("photos")
      .filter(
        (item): item is File =>
          item instanceof File && item.size > 0
      );

    console.log("====================================");
    console.log("QUOTE REQUEST STARTED");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Service:", service);
    console.log("Photos:", photos.length);
    console.log("====================================");

    if (
      !name ||
      !phone ||
      !email ||
      !address ||
      !suburb ||
      !service ||
      !message
    ) {
      console.error("Validation failed");

      return Response.json(
        {
          success: false,
          stage: "Form validation",
          message: "Required form fields are missing.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // CUSTOMER
    // --------------------------------------------------

    stage = "Creating/finding customer";

    console.log("STEP 1: Finding or creating customer...");

    const customer = await findOrCreateCustomer({
      name,
      phone,
      email,
      address,
      suburb,
      state,
      postcode,
    });

    console.log("Customer OK:", customer.id);

    // --------------------------------------------------
    // PROPERTY
    // --------------------------------------------------

    stage = "Creating/finding property";

    console.log("STEP 2: Finding or creating property...");

    const property = await findOrCreateProperty({
      customerId: customer.id,
      address,
      suburb,
      state,
      postcode,
    });

    console.log("Property OK:", property.id);

    // --------------------------------------------------
    // OPPORTUNITY
    // --------------------------------------------------

    stage = "Creating opportunity";

    console.log("STEP 3: Creating opportunity...");

    const opportunity = await createOpportunity({
      customerId: customer.id,
      propertyId: property.id,
      customerName: name,
      phone,
      email,
      service,
      message,
      contactMethod,
      inspection,
    });

    console.log(
      "Opportunity OK:",
      opportunity.id,
      opportunity.opportunity_number
    );

    // --------------------------------------------------
    // PHOTOS
    // --------------------------------------------------

    let uploadedPhotoCount = 0;

    stage = "Uploading photos";

    console.log(
      `STEP 4: Processing ${photos.length} photo(s)...`
    );

    for (const photo of photos) {
      try {
        console.log(
          `Uploading ${photo.name} (${photo.size} bytes)...`
        );

        await uploadPhoto({
          file: photo,
          customerId: customer.id,
          propertyId: property.id,
          opportunityId: opportunity.id,
          uploadedBy: "Website",
        });

        uploadedPhotoCount++;

        console.log(`Uploaded ${photo.name}`);
      } catch (photoError) {
        console.error(
          `Photo upload failed: ${photo.name}`,
          photoError
        );
      }
    }

    console.log(
      `Photos uploaded successfully: ${uploadedPhotoCount}`
    );

    // --------------------------------------------------
    // EMAIL
    // --------------------------------------------------

    stage = "Sending email";

    console.log("STEP 5: Sending email through Resend...");

    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured.");
    }

    const resend = new Resend(
      process.env.RESEND_API_KEY
    );

    const emailResult = await resend.emails.send({
      from:
        "Gary the Handyman Website <onboarding@resend.dev>",
      to: ["garythehandyman26@gmail.com"],
      replyTo: email,
      subject: `🔨 New Quote Request - ${name}`,
      html: `
<div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;">

<h1 style="color:#0f4c81;">
New Website Quote Request
</h1>

<p>
A new quote request has been submitted through
<strong>garythehandyman.com.au</strong>.
</p>

<hr>

<h2>Customer Details</h2>

<table cellpadding="8">

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
<td><strong>Address</strong></td>
<td>${address}</td>
</tr>

<tr>
<td><strong>Suburb</strong></td>
<td>${suburb}</td>
</tr>

<tr>
<td><strong>State</strong></td>
<td>${state}</td>
</tr>

<tr>
<td><strong>Postcode</strong></td>
<td>${postcode}</td>
</tr>

</table>

<hr>

<h2>Requested Service</h2>

<table cellpadding="8">

<tr>
<td><strong>Service</strong></td>
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

<tr>
<td><strong>Photos Uploaded</strong></td>
<td>${uploadedPhotoCount}</td>
</tr>

</table>

<h2>Job Description</h2>

<div style="
background:#f5f5f5;
padding:20px;
border-radius:8px;
white-space:pre-wrap;
">

${message}

</div>

<hr>

<p>
<strong>
ToolBox Opportunity #${opportunity.opportunity_number}
</strong>
</p>

</div>
`,
    });

    if (emailResult.error) {
      console.error(
        "RESEND ERROR:",
        emailResult.error
      );

      throw new Error(
        `Resend error: ${emailResult.error.message}`
      );
    }

    console.log(
      "Email sent successfully:",
      emailResult.data
    );

    // --------------------------------------------------
    // SUCCESS
    // --------------------------------------------------

    console.log("====================================");
    console.log("QUOTE REQUEST SUCCESS");
    console.log("====================================");

    return Response.json({
      success: true,
      opportunityId: opportunity.id,
      opportunityNumber:
        opportunity.opportunity_number,
      uploadedPhotos: uploadedPhotoCount,
    });

  } catch (error) {

    console.error("====================================");
    console.error("QUOTE REQUEST FAILED");
    console.error("FAILED STAGE:", stage);
    console.error("ERROR:", error);
    console.error("====================================");

    let errorMessage = "Unknown server error";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else {
      try {
        errorMessage = JSON.stringify(error);
      } catch {
        errorMessage = "Unknown server error";
      }
    }

    return Response.json(
      {
        success: false,
        stage,
        error: errorMessage,
      },
      {
        status: 500,
      }
    );
  }
}