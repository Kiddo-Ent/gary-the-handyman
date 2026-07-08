import { supabaseAdmin } from "@/lib/crm/supabase/admin";

interface WebsiteProperty {
  customerId: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
}

export async function findOrCreateProperty(
  property: WebsiteProperty
) {
  // Search for existing property

  const { data: existing } = await supabaseAdmin
    .from("properties")
    .select("*")
    .eq("customer_id", property.customerId)
    .eq("address_line_1", property.address)
    .eq("is_deleted", false)
    .maybeSingle();

  if (existing) {
    return existing;
  }

  // Create property

  const { data, error } = await supabaseAdmin
    .from("properties")
    .insert({
      customer_id: property.customerId,

      property_name: "Primary Property",

      address_line_1: property.address,

      suburb: property.suburb,

      state: property.state,

      postcode: property.postcode,

      is_active: true,

      is_deleted: false,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}