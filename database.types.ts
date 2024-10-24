export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          category_id: string
          name: string | null
        }
        Insert: {
          category_id?: string
          name?: string | null
        }
        Update: {
          category_id?: string
          name?: string | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          author_id: string | null
          comment_id: string
          content: string | null
          parent_comment_id: string | null
          project_id: string | null
        }
        Insert: {
          author_id?: string | null
          comment_id?: string
          content?: string | null
          parent_comment_id?: string | null
          project_id?: string | null
        }
        Update: {
          author_id?: string | null
          comment_id?: string
          content?: string | null
          parent_comment_id?: string | null
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["comment_id"]
          },
          {
            foreignKeyName: "comments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
      investments: {
        Row: {
          investment_amount: unknown | null
          investor_id: string | null
          project_id: string | null
        }
        Insert: {
          investment_amount?: unknown | null
          investor_id?: string | null
          project_id?: string | null
        }
        Update: {
          investment_amount?: unknown | null
          investor_id?: string | null
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "investments_investor_id_fkey"
            columns: ["investor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "investments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
      producer: {
        Row: {
          biography: string | null
          location: string | null
          profile_banner_url: string | null
          profile_image_url: string | null
          user_id: string | null
        }
        Insert: {
          biography?: string | null
          location?: string | null
          profile_banner_url?: string | null
          profile_image_url?: string | null
          user_id?: string | null
        }
        Update: {
          biography?: string | null
          location?: string | null
          profile_banner_url?: string | null
          profile_image_url?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "producer_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      project_categories: {
        Row: {
          category_id: string
          project_id: string
        }
        Insert: {
          category_id: string
          project_id: string
        }
        Update: {
          category_id?: string
          project_id?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          description: string | null
          expected_finish_date: string | null
          finish_date: string | null
          investement_goal: unknown | null
          name: string | null
          producer_id: string | null
          progress: number | null
          project_banner_url: string | null
          project_id: string
          start_date: string | null
          total_invested: unknown | null
        }
        Insert: {
          description?: string | null
          expected_finish_date?: string | null
          finish_date?: string | null
          investement_goal?: unknown | null
          name?: string | null
          producer_id?: string | null
          progress: number | null
          project_banner_url?: string | null
          project_id?: string
          start_date?: string | null
          total_invested?: unknown | null
        }
        Update: {
          description?: string | null
          expected_finish_date?: string | null
          finish_date?: string | null
          investement_goal?: unknown | null
          name?: string | null
          producer_id?: string | null
          progress: number | null
          project_banner_url?: string | null
          project_id?: string
          start_date?: string | null
          total_invested?: unknown | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "producer"
            referencedColumns: ["user_id"]
          },
        ]
      }
      tasks: {
        Row: {
          id: number
          name: string
          user_id: string
        }
        Insert: {
          id?: number
          name: string
          user_id?: string
        }
        Update: {
          id?: number
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      updates: {
        Row: {
          description: string | null
          project_id: string | null
          title: string | null
          update_id: string
          upload_date: string | null
        }
        Insert: {
          description?: string | null
          project_id?: string | null
          title?: string | null
          update_id?: string
          upload_date?: string | null
        }
        Update: {
          description?: string | null
          project_id?: string | null
          title?: string | null
          update_id?: string
          upload_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "updates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
      updates_images: {
        Row: {
          image_url: string
          update_id: string
        }
        Insert: {
          image_url: string
          update_id: string
        }
        Update: {
          image_url?: string
          update_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          auth_id: string
          birth_date: Date
          email: string
          first_name: string
          last_name: string
          user_id: string
          username: string
        }
        Insert: {
          auth_id: string
          birth_date: Date
          email: string
          first_name: string
          last_name: string
          user_id?: string
          username: string
        }
        Update: {
          auth_id?: string
          birth_date: Date
          email?: string
          first_name?: string
          last_name?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
