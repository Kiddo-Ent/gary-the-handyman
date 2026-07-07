import { supabaseAdmin } from "@/lib/crm/supabase/admin";
interface WebsiteProperty {
  customerId: string;
  address: string;
}

export async function findOrCreateProperty(
  property: WebsiteProperty
) {
  //
  // Search for an existing property
  //

  if (property.address) {

    const { data } = await supabaseAdmin
      .from("properties")
      .select("*")
      .eq("customer_id", property.customerId)
      .eq("address_line_1", property.address)
      .eq("is_deleted", false)
      .maybeSingle();

    if (data) {
      return data;
    }

  }

  //
  // Determine next property number
  //

  const { data: lastProperty } =
    await supabaseAdmin
      .from("properties")
      .select("property_number")
      .order("property_number", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

  const nextPropertyNumber =
    (lastProperty?.property_number ?? 0) + 1;

  //
  // Create the property
  //

  const { data, error } =
    await   supabaseAdmin
      .from("properties")
      .insert({

        property_number:
          nextPropertyNumber,

        customer_id:
          property.customerId,

        property_name:
          "Primary Property",

        address_line_1:
          property.address,

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