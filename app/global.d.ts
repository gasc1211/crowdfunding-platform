import type { Database as DB } from "@/database.types";


declare global {
    type Database = DB
    type Users = DB['public']['Tables']['users']['Row']
    type UserInsert = DB['public']['Tables']['users']['Insert']
    type UserUpdate = DB['public']['Tables']['users']['Update']
    type Project = DB['public']['Tables']['projects']['Row']
    type ProjectInsert = DB['public']['Tables']['projects']['Insert']
    type ProjectUpdate = DB['public']['Tables']['projects']['Update']
}