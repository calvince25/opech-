import { supabase } from './supabase';

/**
 * Uploads a file to a Supabase bucket and returns the public URL.
 * @param file The file to upload
 * @param bucket The bucket name (e.g., 'products')
 * @returns The public URL of the uploaded file
 */
export async function uploadFile(file: File, bucket: string = 'products'): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = fileName;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (uploadError) {
    throw new Error(`File upload failed: ${uploadError.message}`);
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return publicUrl;
}
