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
      ai_responses: {
        Row: {
          analysis_metrics: Json | null
          analysis_summary: string | null
          car_id: number | null
          cost_saving_opportunities: string[] | null
          created_at: string | null
          feedback: string | null
          id: number
          recommended_insurances: string[] | null
          response: string
          suggested_driving_tips: string[] | null
          version: number | null
          visualization_config: Json | null
        }
        Insert: {
          analysis_metrics?: Json | null
          analysis_summary?: string | null
          car_id?: number | null
          cost_saving_opportunities?: string[] | null
          created_at?: string | null
          feedback?: string | null
          id?: number
          recommended_insurances?: string[] | null
          response: string
          suggested_driving_tips?: string[] | null
          version?: number | null
          visualization_config?: Json | null
        }
        Update: {
          analysis_metrics?: Json | null
          analysis_summary?: string | null
          car_id?: number | null
          cost_saving_opportunities?: string[] | null
          created_at?: string | null
          feedback?: string | null
          id?: number
          recommended_insurances?: string[] | null
          response?: string
          suggested_driving_tips?: string[] | null
          version?: number | null
          visualization_config?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_responses_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "user_cars"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          config: Json | null
          email: string | null
          first_name: string | null
          id: string
          last_modified_date: string
          last_name: string | null
          username: string | null
        }
        Insert: {
          config?: Json | null
          email?: string | null
          first_name?: string | null
          id: string
          last_modified_date?: string
          last_name?: string | null
          username?: string | null
        }
        Update: {
          config?: Json | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_modified_date?: string
          last_name?: string | null
          username?: string | null
        }
        Relationships: []
      }
      user_cars: {
        Row: {
          average_fuel_cost: number | null
          brand: string
          country: Database["public"]["Enums"]["COUNTRIES"]
          created_at: string | null
          depreciation_rate: number | null
          driver_age_range: string
          driving_experience_years: number
          eco_tax: number | null
          emissions: number | null
          estimated_resale_value: number | null
          extended_warranty_cost: number | null
          exterior_score: number | null
          financing_duration: number | null
          fuel_consumption: number | null
          fuel_type: string
          guarantee_years: number | null
          id: number
          initial_price: number | null
          insurance_cost: number | null
          insurance_type: string
          interest_rate: number | null
          interior_score: number | null
          last_ai_response_id: number | null
          maintenance_frequency: string | null
          mileage: number
          model: string
          name: string
          offer_on_extended_warranty: boolean | null
          oil_change_costs: number | null
          parking_costs: number | null
          planned_years_of_ownership: number
          prepayment: number
          purchase_price: number
          regular_maintenance_costs: number | null
          remaining_amount: number | null
          resale_value_after_years: number | null
          service_costs: number | null
          service_includes: string | null
          taxes: number | null
          tco: number | null
          tires_costs: number | null
          total_interest_paid: number | null
          total_planned_kms: number
          true_purchase_price: number | null
          tuv_costs: number | null
          unexpected_repair_costs: number | null
          updated_at: string | null
          user_id: string | null
          variant: string | null
          version: number | null
          year: number
        }
        Insert: {
          average_fuel_cost?: number | null
          brand: string
          country?: Database["public"]["Enums"]["COUNTRIES"]
          created_at?: string | null
          depreciation_rate?: number | null
          driver_age_range: string
          driving_experience_years: number
          eco_tax?: number | null
          emissions?: number | null
          estimated_resale_value?: number | null
          extended_warranty_cost?: number | null
          exterior_score?: number | null
          financing_duration?: number | null
          fuel_consumption?: number | null
          fuel_type: string
          guarantee_years?: number | null
          id?: number
          initial_price?: number | null
          insurance_cost?: number | null
          insurance_type: string
          interest_rate?: number | null
          interior_score?: number | null
          last_ai_response_id?: number | null
          maintenance_frequency?: string | null
          mileage: number
          model: string
          name: string
          offer_on_extended_warranty?: boolean | null
          oil_change_costs?: number | null
          parking_costs?: number | null
          planned_years_of_ownership: number
          prepayment: number
          purchase_price: number
          regular_maintenance_costs?: number | null
          remaining_amount?: number | null
          resale_value_after_years?: number | null
          service_costs?: number | null
          service_includes?: string | null
          taxes?: number | null
          tco?: number | null
          tires_costs?: number | null
          total_interest_paid?: number | null
          total_planned_kms: number
          true_purchase_price?: number | null
          tuv_costs?: number | null
          unexpected_repair_costs?: number | null
          updated_at?: string | null
          user_id?: string | null
          variant?: string | null
          version?: number | null
          year: number
        }
        Update: {
          average_fuel_cost?: number | null
          brand?: string
          country?: Database["public"]["Enums"]["COUNTRIES"]
          created_at?: string | null
          depreciation_rate?: number | null
          driver_age_range?: string
          driving_experience_years?: number
          eco_tax?: number | null
          emissions?: number | null
          estimated_resale_value?: number | null
          extended_warranty_cost?: number | null
          exterior_score?: number | null
          financing_duration?: number | null
          fuel_consumption?: number | null
          fuel_type?: string
          guarantee_years?: number | null
          id?: number
          initial_price?: number | null
          insurance_cost?: number | null
          insurance_type?: string
          interest_rate?: number | null
          interior_score?: number | null
          last_ai_response_id?: number | null
          maintenance_frequency?: string | null
          mileage?: number
          model?: string
          name?: string
          offer_on_extended_warranty?: boolean | null
          oil_change_costs?: number | null
          parking_costs?: number | null
          planned_years_of_ownership?: number
          prepayment?: number
          purchase_price?: number
          regular_maintenance_costs?: number | null
          remaining_amount?: number | null
          resale_value_after_years?: number | null
          service_costs?: number | null
          service_includes?: string | null
          taxes?: number | null
          tco?: number | null
          tires_costs?: number | null
          total_interest_paid?: number | null
          total_planned_kms?: number
          true_purchase_price?: number | null
          tuv_costs?: number | null
          unexpected_repair_costs?: number | null
          updated_at?: string | null
          user_id?: string | null
          variant?: string | null
          version?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_last_ai_response"
            columns: ["last_ai_response_id"]
            isOneToOne: false
            referencedRelation: "ai_responses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_latest_ai_responses: {
        Args: {
          car_ids: number[]
        }
        Returns: {
          analysis_metrics: Json | null
          analysis_summary: string | null
          car_id: number | null
          cost_saving_opportunities: string[] | null
          created_at: string | null
          feedback: string | null
          id: number
          recommended_insurances: string[] | null
          response: string
          suggested_driving_tips: string[] | null
          version: number | null
          visualization_config: Json | null
        }[]
      }
      sync_existing_users: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      COUNTRIES:
        | "GERMANY"
        | "UNITED KINGDOM"
        | "UNITED STATES OF AMERICA"
        | "AUSTRIA"
        | "NETHERLANDS"
        | "FRANCE"
        | "BELGIUM"
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
