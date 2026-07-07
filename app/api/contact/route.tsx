import { Resend } from "resend";

import { findOrCreateCustomer } from "@/lib/crm/customers";
import { findOrCreateProperty } from "@/lib/crm/properties";
import { createOpportunity } from "@/lib/crm/opportunities";

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const form = await request.formData();

    const name = form.get("name")?.toString().trim() ?? "";
    const phone = form.get("phone")?.toString().trim() ?? "";
    const email = form.get("email")?.toString().trim() ?? "";
    const address = form.get("address")?.toString().trim() ?? "";
    const service = form.get("service")?.toString().trim() ?? "";
    const message = form.get("message")?.toString().trim() ?? "";
    const contactMethod =
      form.get("contactMethod")?.toString().trim() ??
      "Phone";
    const inspection =
      form.get("inspection")?.toString().trim() ??
      "";

    //
    // Basic validation
    //

    if (!name || !phone || !email || !service || !message) {
      return Response.json(
        {
          success: false,
          message: "Missing required fields.",
        },
        {
          status: 400,
        }
      );
    }

    //
    // STEP 1
    // Customer
    //

    const customer =
      await findOrCreateCustomer({
        name,
        phone,
        email,
      });

    //
    // STEP 2
    // Property
    //

    const property =
      await findOrCreateProperty({
        customerId: customer.id,
        address,
      });

    //
    // STEP 3
    // Opportunity
    //

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
      `Website Opportunity Created: ${opportunity.opportunity_number}`
    );

    //
    // STEP 4
    // Send email
    //

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
A new enquiry has been received and automatically added to ToolBox.
</p>

<hr>

<h2>Customer</h2>

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
<td>${address || "Not supplied"}</td>
</tr>

</table>

<hr>

<h2>Job Requested</h2>

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
<td><strong>Inspection</strong></td>
<td>${inspection}</td>
</tr>

</table>

<h2>Description</h2>

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

<strong>ToolBox Opportunity #${opportunity.opportunity_number}</strong>

</p>

<p style="font-size:12px;color:#666;">
Automatically created from
garythehandyman.com.au
</p>

</div>
`,
    });

    //
    // Success
    //

    return Response.json({
      success: true,
      opportunityId: opportunity.id,
      opportunityNumber:
        opportunity.opportunity_number,
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