import type { Database as DB } from "@/database.types";


declare global {
    type Database = DB
    type Users = DB['public']['Tables']['users']['Row']
    type UserInsert = DB['public']['Tables']['users']['Insert']
    type UserUpdate = DB['public']['Tables']['users']['Update']
    type Project = DB['public']['Tables']['projects']['Row']
    type ProjectInsert = DB['public']['Tables']['projects']['Insert']
    type ProjectUpdate = DB['public']['Tables']['projects']['Update']
    type Categories = DB['public']['Tables']['categories']['Row']
    type CategoriesInsert = DB['public']['Tables']['categories']['Insert']
    type CategoriesUpdate = DB['public']['Tables']['categories']['Update']
    type ProjectCategories = DB['public']['Tables']['project_categories']['Row']
    type ProjectCategories = DB['public']['Tables']['project_categories']['Insert']
    type ProjectCategories = DB['public']['Tables']['project_categories']['Update']
}