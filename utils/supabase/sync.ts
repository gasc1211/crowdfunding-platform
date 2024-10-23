import {
  DeletedObjectJSON,
  UserJSON,
  UserWebhookEvent,
} from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/database.types";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Sync supabase in events of user creation, update and deletion
export async function syncDatabase(evt: UserWebhookEvent) {
  const { type, data }: { type: string; data: UserJSON | DeletedObjectJSON } =
    evt;
  const supabase = createClient<Database>(supabaseUrl, supabaseKey);

  try {
    if (type === "user.created") {
      const insertData = data as UserJSON;
      const userData: Database["public"]["Tables"]["users"]["Insert"] = {
        auth_id: insertData.id,
        username: insertData.username as string,
        first_name: insertData.first_name as string,
        last_name: insertData.last_name as string,
        email: insertData.email_addresses[0].email_address,
      };
      await supabase.from("users").insert(userData);
    } else if (type === "user.updated") {
      const updateData = data as UserJSON;

      const userData: Database["public"]["Tables"]["users"]["Update"] = {
        username: updateData.username as string,
        first_name: updateData.first_name as string,
        last_name: updateData.last_name as string,
        email: updateData.email_addresses[0].email_address,
      };

      await supabase
        .from("users")
        .update(userData)
        .eq("auth_id", updateData.id);
    } else if (type === "user.deleted") {
      await supabase
        .from("users")
        .delete()
        .eq("auth_id", data.id as string);
    }
  } catch (err) {
    console.error(err);
  }
}
