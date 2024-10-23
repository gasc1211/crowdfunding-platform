import { UserJSON } from "@clerk/types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;

export async function syncDatabase(data: UserJSON) {
  const supabase = createClient(supabaseUrl, supabaseKey);

  const userData = {
    auth_id: data.id,
    username: data.username,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email_addresses[0].email_address,
  };

  try {
    await supabase.from("users").insert(userData);
    console.log(data.id);
  } catch (err) {
    console.error(err);
  }
}
