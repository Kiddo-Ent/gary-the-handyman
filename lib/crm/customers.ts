import { supabaseAdmin } from "@/lib/crm/supabase/admin";

interface WebsiteCustomer {
  name: string;
  phone: string;
  email: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
}

export async function findOrCreateCustomer(
  customer: WebsiteCustomer
) {
  // Search by email

  if (customer.email) {
    const { data } = await supabaseAdmin
      .from("customers")
      .select("*")
      .eq("email", customer.email)
      .eq("is_deleted", false)
      .maybeSingle();

    if (data) {
      return data;
    }
  }

  // Search by mobile

  if (customer.phone) {
    const { data } = await supabaseAdmin
      .from("customers")
      .select("*")
      .eq("mobile_phone", customer.phone)
      .eq("is_deleted", false)
      .maybeSingle();

    if (data) {
      return data;
    }
  }

  // Split name

  const names = customer.name.trim().split(" ");

  const firstName = names.shift() ?? "";

  const lastName = names.join(" ");

  // Create customer

  const { data, error } = await supabaseAdmin
    .from("customers")
    .insert({
      first_name: firstName,

      last_name: lastName,

      mobile_phone: customer.phone,

      email: customer.email,

      address_line_1: customer.address,

      suburb: customer.suburb,

      state: customer.state,

      postcode: customer.postcode,

      notes:
        "Automatically created from Gary the Handyman website.",

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