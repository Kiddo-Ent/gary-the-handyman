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
  //
  // Determine next opportunity number
  //

  const { data: lastOpportunity } = await supabaseAdmin
    .from("opportunities")
    .select("opportunity_number")
    .order("opportunity_number", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  const nextOpportunityNumber =
    (lastOpportunity?.opportunity_number ?? 0) + 1;

  //
  // Build description
  //

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

  //
  // Create Opportunity
  //

  const { data, error } = await supabaseAdmin
    .from("opportunities")
    .insert({
      opportunity_number: nextOpportunityNumber,

      customer_id: opportunity.customerId,

      property_id: opportunity.propertyId,

      title: opportunity.service,

      description,

      source: "Website",

      opportunity_status: "Lead",

      estimated_value: 0,

      expected_start_date: null,

      notes:
        "Automatically created from Gary the Handyman website.",

      is_deleted: false,

      deleted_at: null,
    })
    .select()
    .single();

  if (error) {
    console.error(
      "createOpportunity:",
      error
    );

    throw error;
  }

  return data;
}