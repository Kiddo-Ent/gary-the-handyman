import { Resend } from "resend";

import { findOrCreateCustomer } from "@/lib/crm/customers";
import { findOrCreateProperty } from "@/lib/crm/properties";
import { createOpportunity } from "@/lib/crm/opportunities";
import { uploadPhoto } from "@/lib/crm/photos";

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const form = await request.formData();

    // ======================================
    // Uploaded Photos
    // ======================================

    const photos = form
      .getAll("photos")
      .filter(
        (item): item is File =>
          item instanceof File && item.size > 0
      );
console.log("Photos received:", photos.length);

photos.forEach((photo, index) => {
  console.log(
    `Photo ${index + 1}: ${photo.name} (${photo.size} bytes) ${photo.type}`
  );
});
    // ======================================
    // Form Data
    // ======================================

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
      form.get("contactMethod")?.toString().trim() ??
      "Phone";

    const inspection =
      form.get("inspection")?.toString().trim() ??
      "";

    // ======================================
    // Validation
    // ======================================

    console.log("Validation Check");
console.table({
  name,
  phone,
  email,
  address,
  suburb,
  state,
  postcode,
  service,
  message,
});

if (
  !name ||
  !phone ||
  !email ||
  !address ||
  !suburb ||
  !service ||
  !message
) {
  console.error("Validation failed.");

  return Response.json(
    {
      success: false,
      message: "Please complete all required fields.",
    },
    {
      status: 400,
    }
  );
}

    // ======================================
    // Customer
    // ======================================

    const customer =
      await findOrCreateCustomer({
        name,
        phone,
        email,
        address,
        suburb,
        state,
        postcode,
      });
console.log("Customer created:", customer);
    // ======================================
    // Property
    // ======================================

    const property =
      await findOrCreateProperty({
        customerId: customer.id,
        address,
        suburb,
        state,
        postcode,
      });

    // ======================================
    // Opportunity
    // ======================================

    const opportunity =
      await createOpportunity({
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
      `Website Opportunity #${opportunity.opportunity_number} created successfully.`
    );

    // ======================================
    // Upload Photos
    // ======================================

    let uploadedPhotoCount = 0;

for (const photo of photos) {
  try {
    console.log("Uploading:", photo.name);

    await uploadPhoto({
      file: photo,
      customerId: customer.id,
      propertyId: property.id,
      opportunityId: opportunity.id,
      uploadedBy: "Website",
    });

    uploadedPhotoCount++;

    console.log("Uploaded:", photo.name);
  } catch (error) {
    console.error(
      `Failed to upload ${photo.name}`,
      error
    );
  }
}

console.log(`${uploadedPhotoCount} photo(s) uploaded.`);
    
    // ======================================
    // Email
    // ======================================

    await resend.emails.send({
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
<strong>garythehandyman.com.au</strong>
and has automatically been entered into ToolBox.
</p>

<hr>

<h2>Customer Details</h2>

<table cellpadding="8">

<tr><td><strong>Name</strong></td><td>${name}</td></tr>

<tr><td><strong>Phone</strong></td><td>${phone}</td></tr>

<tr><td><strong>Email</strong></td><td>${email}</td></tr>

<tr><td><strong>Address</strong></td><td>${address}</td></tr>

<tr><td><strong>Suburb</strong></td><td>${suburb}</td></tr>

<tr><td><strong>State</strong></td><td>${state}</td></tr>

<tr><td><strong>Postcode</strong></td><td>${postcode}</td></tr>

</table>

<hr>

<h2>Requested Service</h2>

<table cellpadding="8">

<tr><td><strong>Service</strong></td><td>${service}</td></tr>

<tr><td><strong>Preferred Contact</strong></td><td>${contactMethod}</td></tr>

<tr><td><strong>Preferred Inspection</strong></td><td>${inspection}</td></tr>

<tr><td><strong>Photos Uploaded</strong></td><td>${uploadedPhotoCount}</td></tr>

</table>

<h2>Job Description</h2>

<div
style="
background:#f5f5f5;
padding:20px;
border-radius:8px;
white-space:pre-wrap;
"
>
${message}
</div>

<hr>

<p>

<strong>ToolBox Opportunity #${opportunity.opportunity_number}</strong>

</p>

<p style="font-size:12px;color:#666;">
Automatically created from garythehandyman.com.au
</p>

</div>
`,
    });

    // ======================================
    // Success
    // ======================================

    return Response.json({
      success: true,
      opportunityId: opportunity.id,
      opportunityNumber:
        opportunity.opportunity_number,
      uploadedPhotos: uploadedPhotoCount,
    });
  } catch (error) {
    console.error(
      "Website Quote Submission Failed",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          "Unable to submit your quote request.",
      },
      {
        status: 500,
      }
    );
  }
}