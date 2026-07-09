import { randomUUID } from "crypto";
import { supabaseAdmin } from "@/lib/crm/supabase/admin";

export interface UploadPhotoOptions {
  file: File;

  customerId?: string;
  propertyId?: string;
  opportunityId?: string;
  quoteId?: string;

  caption?: string;
  uploadedBy?: string;
}

export interface UploadedPhoto {
  id: string;
  storagePath: string;
  fileName: string;
}

export async function uploadPhoto({
  file,
  customerId,
  propertyId,
  opportunityId,
  quoteId,
  caption,
  uploadedBy,
}: UploadPhotoOptions): Promise<UploadedPhoto> {
  console.log("========================================");
  console.log("📷 uploadPhoto() called");
  console.log("File:", file.name);
  console.log("Size:", file.size);
  console.log("Type:", file.type);
  console.log("Customer ID:", customerId);
  console.log("Property ID:", propertyId);
  console.log("Opportunity ID:", opportunityId);
  console.log("Quote ID:", quoteId);
  console.log("========================================");

  // -------------------------
  // Validation
  // -------------------------

  if (!file || file.size === 0) {
    throw new Error("Invalid file.");
  }

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/heic",
    "application/pdf",
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error(`Unsupported file type: ${file.type}`);
  }

  // -------------------------
  // Storage Path
  // -------------------------

  const extension =
    file.name.split(".").pop()?.toLowerCase() || "jpg";

  const uniqueId = randomUUID();

  let folder = "misc";
  let recordId: string = uniqueId;

  if (opportunityId) {
    folder = "opportunities";
    recordId = opportunityId;
  } else if (quoteId) {
    folder = "quotes";
    recordId = quoteId;
  } else if (propertyId) {
    folder = "properties";
    recordId = propertyId;
  } else if (customerId) {
    folder = "customers";
    recordId = customerId;
  }

  const storagePath =
    `${folder}/${recordId}/${uniqueId}.${extension}`;

  console.log("📂 Storage Path:", storagePath);

  // -------------------------
  // Upload to Supabase Storage
  // -------------------------

  const buffer = Buffer.from(await file.arrayBuffer());

  console.log("⬆️ Uploading to Supabase Storage...");

  const { error: uploadError } =
    await supabaseAdmin.storage
      .from("toolbox-photos")
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

  if (uploadError) {
    console.error("❌ Storage Upload Failed");
    console.error(uploadError);
    throw uploadError;
  }

  console.log("✅ Storage upload successful.");

  // -------------------------
  // Save Database Record
  // -------------------------

  console.log("💾 Creating photo database record...");

  const { data, error } =
    await supabaseAdmin
      .from("photos")
      .insert({
        customer_id: customerId ?? null,
        property_id: propertyId ?? null,
        opportunity_id: opportunityId ?? null,
        quote_id: quoteId ?? null,

        file_name: file.name,
        storage_path: storagePath,
        content_type: file.type,
        file_size: file.size,

        caption: caption ?? null,
        uploaded_by: uploadedBy ?? "Website",
      })
      .select()
      .single();

  if (error) {
    console.error("❌ Database Insert Failed");
    console.error(error);

    console.log("🗑 Removing uploaded file from Storage...");

    await supabaseAdmin.storage
      .from("toolbox-photos")
      .remove([storagePath]);

    throw error;
  }

  console.log("✅ Photo database record created.");
  console.log(data);

  return {
    id: data.id,
    storagePath,
    fileName: file.name,
  };
}

export async function getPhotos(options: {
  customerId?: string;
  propertyId?: string;
  opportunityId?: string;
  quoteId?: string;
}) {
  let query = supabaseAdmin
    .from("photos")
    .select("*")
    .eq("is_deleted", false)
    .order("created_at", {
      ascending: false,
    });

  if (options.customerId) {
    query = query.eq("customer_id", options.customerId);
  }

  if (options.propertyId) {
    query = query.eq("property_id", options.propertyId);
  }

  if (options.opportunityId) {
    query = query.eq("opportunity_id", options.opportunityId);
  }

  if (options.quoteId) {
    query = query.eq("quote_id", options.quoteId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("❌ getPhotos() failed");
    console.error(error);
    throw error;
  }

  console.log(`📷 getPhotos() returned ${data.length} photo(s).`);

  return data;
}

export async function deletePhoto(photoId: string) {
  console.log("🗑 Deleting photo:", photoId);

  const { error } = await supabaseAdmin
    .from("photos")
    .update({
      is_deleted: true,
    })
    .eq("id", photoId);

  if (error) {
    console.error(error);
    throw error;
  }

  console.log("✅ Photo deleted.");
}