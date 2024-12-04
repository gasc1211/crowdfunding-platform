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
    type ProjectCategoriesInsert = DB['public']['Tables']['project_categories']['Insert']
    type ProjectCategoriesUpdate = DB['public']['Tables']['project_categories']['Update']
    type Investments = DB['public']['Tables']['investments']['Row']
    type InvestmentsInsert = DB['public']['Tables']['investments']['Insert']
    type InvestmentsUpdate = DB['public']['Tables']['investments']['Update']
    type ProjectImages = DB['public']['Tables']['project_images']['Row']
    type ProjectImagesInsert = DB['public']['Tables']['project_images']['Insert']
    type ProjectImagesUpdate = DB['public']['Tables']['project_images']['Update']
    type ProjectCategories = DB['public']['Tables']['project_categories']['Insert']
    type ProjectCategories = DB['public']['Tables']['project_categories']['Update']
    type Producer = DB['public']['Tables']['producer']['Row']
    type ProducerInsert = DB['public']['Tables']['producer']['Insert']
    type ProducerUpdate = DB['public']['Tables']['producer']['Update']
    type ProjectComment = DB['public']['Tables']['comments']['Row']
    type ProjectCommentInsert = DB['public']['Tables']['comments']['Insert']
    type Notifications = DB['public']['Tables']['notifications']['Row']
    type NotificationsInsert = DB['public']['Tables']['notifications']['Insert']
    type NotificationsUpdate = DB['public']['Tables']['notifications']['Update']
}