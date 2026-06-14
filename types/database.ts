/**
 * Supabase Database TypeScript types.
 * Auto-generated types go here after running: npx supabase gen types typescript
 * For now, manually maintained until schema is finalized.
 */

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type ExperienceLevel = 'beginner' | 'intermediate' | 'experienced';
export type GardenType = 'indoor' | 'outdoor' | 'balcony' | 'raised_bed' | 'herbs' | 'vegetables';
export type CareDifficulty = 'easy' | 'moderate' | 'expert';
export type CareType = 'water' | 'fertilize' | 'prune' | 'repot' | 'other';
export type PlantStatus = 'healthy' | 'needs_care' | 'at_risk' | 'dormant';
export type CompanionRelationship = 'companion' | 'antagonist';
export type SubscriptionStatus = 'active' | 'paused' | 'cancelled';
export type OrderStatus = 'pending_selection' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
export type GardenMemberRole = 'owner' | 'member';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          zip_code: string | null;
          usda_zone: string | null;
          experience_level: ExperienceLevel | null;
          garden_types: GardenType[];
          onboarding_complete: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      gardens: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          type: GardenType;
          emoji_icon: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['gardens']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['gardens']['Insert']>;
      };
      garden_members: {
        Row: {
          id: string;
          garden_id: string;
          user_id: string;
          role: GardenMemberRole;
          joined_at: string;
        };
        Insert: Omit<Database['public']['Tables']['garden_members']['Row'], 'id' | 'joined_at'>;
        Update: Partial<Database['public']['Tables']['garden_members']['Insert']>;
      };
      plant_species: {
        Row: {
          id: string;
          common_name: string;
          scientific_name: string | null;
          description: string | null;
          care_difficulty: CareDifficulty;
          water_frequency_days: number;
          light_requirements: string | null;
          soil_type: string | null;
          fertilizer_schedule: string | null;
          usda_zones_min: number | null;
          usda_zones_max: number | null;
          days_to_germination: number | null;
          days_to_harvest: number | null;
          is_edible: boolean;
          image_url: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['plant_species']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['plant_species']['Insert']>;
      };
      companion_planting: {
        Row: {
          id: string;
          species_a_id: string;
          species_b_id: string;
          relationship: CompanionRelationship;
          notes: string | null;
        };
        Insert: Omit<Database['public']['Tables']['companion_planting']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['companion_planting']['Insert']>;
      };
      plants: {
        Row: {
          id: string;
          garden_id: string;
          species_id: string | null;
          nickname: string | null;
          custom_name: string | null;
          date_planted: string | null;
          status: PlantStatus;
          location_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['plants']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['plants']['Insert']>;
      };
      care_logs: {
        Row: {
          id: string;
          plant_id: string;
          care_type: CareType;
          logged_at: string;
          notes: string | null;
          created_by: string;
        };
        Insert: Omit<Database['public']['Tables']['care_logs']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['care_logs']['Insert']>;
      };
      plant_photos: {
        Row: {
          id: string;
          plant_id: string;
          image_url: string;
          caption: string | null;
          taken_at: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['plant_photos']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['plant_photos']['Insert']>;
      };
      care_schedules: {
        Row: {
          id: string;
          plant_id: string;
          care_type: CareType;
          frequency_days: number;
          next_due_date: string;
          last_completed_at: string | null;
          is_custom: boolean;
        };
        Insert: Omit<Database['public']['Tables']['care_schedules']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['care_schedules']['Insert']>;
      };
      seedbox_subscriptions: {
        Row: {
          id: string;
          user_id: string;
          status: SubscriptionStatus;
          stripe_subscription_id: string | null;
          stripe_customer_id: string | null;
          shipping_name: string | null;
          shipping_address_line1: string | null;
          shipping_address_line2: string | null;
          shipping_city: string | null;
          shipping_state: string | null;
          shipping_zip: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['seedbox_subscriptions']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['seedbox_subscriptions']['Insert']>;
      };
      seedbox_orders: {
        Row: {
          id: string;
          subscription_id: string;
          order_month: string;
          status: OrderStatus;
          tracking_number: string | null;
          tracking_provider: string | null;
          shipped_at: string | null;
          delivered_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['seedbox_orders']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['seedbox_orders']['Insert']>;
      };
      seed_options: {
        Row: {
          id: string;
          species_id: string;
          available_month: string;
          zone_min: number | null;
          zone_max: number | null;
          description: string | null;
          is_featured: boolean;
        };
        Insert: Omit<Database['public']['Tables']['seed_options']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['seed_options']['Insert']>;
      };
      seedbox_order_seeds: {
        Row: {
          id: string;
          order_id: string;
          seed_option_id: string;
          selected_at: string;
        };
        Insert: Omit<Database['public']['Tables']['seedbox_order_seeds']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['seedbox_order_seeds']['Insert']>;
      };
      plant_id_usage: {
        Row: {
          id: string;
          user_id: string;
          month: string;
          identifications_used: number;
          diagnoses_used: number;
          ai_queries_used: number;
        };
        Insert: Omit<Database['public']['Tables']['plant_id_usage']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['plant_id_usage']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      experience_level: ExperienceLevel;
      garden_type: GardenType;
      care_difficulty: CareDifficulty;
      care_type: CareType;
      plant_status: PlantStatus;
      companion_relationship: CompanionRelationship;
      subscription_status: SubscriptionStatus;
      order_status: OrderStatus;
      garden_member_role: GardenMemberRole;
    };
  };
}
