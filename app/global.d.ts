import type { Database as DB } from "@/database.types";


declare global {
    type Database = DB
    type Users = DB['public']['Tables']['users']['Row']
}