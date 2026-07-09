import { supabaseAdmin } from "@/lib/crm/supabase/admin";

interface WebsiteOpportunity {
  customerId: string;
  propertyId: string;
  customerName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  contactMethod: string;
  inspection: string;
}

export async function createOpportunity(
  opportunity: WebsiteOpportunity
) {
  const description = `Website Quote Request

Customer:
${opportunity.customerName}

Phone:
${opportunity.phone}

Email:
${opportunity.email}

Preferred Contact:
${opportunity.contactMethod}

Preferred Inspection:
${opportunity.inspection}

----------------------------------------

${opportunity.message}`;

  const { data, error } = await supabaseAdmin
    .from("opportunities")
    .insert({
      customer_id: opportunity.customerId,

      property_id: opportunity.propertyId,

      title: opportunity.service,

      description,

      // Where the lead came from
      source: "Website",

      // Must match the database CHECK constraint
      opportunity_status: "New",

      // Unknown until quoted
      estimated_value: 0,

      expected_start_date: null,

      expected_completion_date: null,

      // Brand new enquiry
      probability: 0,

      notes:
        "Automatically created from Gary the Handyman website.",

      is_deleted: false,
    })
    .select()
    .single();

  if (error) {
    console.error("createOpportunity:", error);
    throw error;
  }

  return data;
}