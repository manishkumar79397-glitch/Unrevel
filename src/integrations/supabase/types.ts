export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string | null
          reel_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id?: string | null
          reel_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string | null
          reel_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_comments_post_id"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "travel_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_comments_reel_id"
            columns: ["reel_id"]
            isOneToOne: false
            referencedRelation: "travel_reels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_comments_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_follows_follower_id"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "fk_follows_following_id"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      guide_availability: {
        Row: {
          created_at: string | null
          date: string
          guide_id: string
          id: string
          is_available: boolean | null
          time_slots: Json | null
        }
        Insert: {
          created_at?: string | null
          date: string
          guide_id: string
          id?: string
          is_available?: boolean | null
          time_slots?: Json | null
        }
        Update: {
          created_at?: string | null
          date?: string
          guide_id?: string
          id?: string
          is_available?: boolean | null
          time_slots?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "guide_availability_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides"
            referencedColumns: ["id"]
          },
        ]
      }
      guide_bookings: {
        Row: {
          booking_date: string
          created_at: string | null
          duration_hours: number | null
          end_time: string | null
          guide_id: string
          id: string
          payment_intent_id: string | null
          payment_status: string | null
          special_requests: string | null
          start_time: string | null
          status: string | null
          total_amount: number
          traveler_count: number | null
          traveler_id: string
          updated_at: string | null
        }
        Insert: {
          booking_date: string
          created_at?: string | null
          duration_hours?: number | null
          end_time?: string | null
          guide_id: string
          id?: string
          payment_intent_id?: string | null
          payment_status?: string | null
          special_requests?: string | null
          start_time?: string | null
          status?: string | null
          total_amount: number
          traveler_count?: number | null
          traveler_id: string
          updated_at?: string | null
        }
        Update: {
          booking_date?: string
          created_at?: string | null
          duration_hours?: number | null
          end_time?: string | null
          guide_id?: string
          id?: string
          payment_intent_id?: string | null
          payment_status?: string | null
          special_requests?: string | null
          start_time?: string | null
          status?: string | null
          total_amount?: number
          traveler_count?: number | null
          traveler_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guide_bookings_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides"
            referencedColumns: ["id"]
          },
        ]
      }
      guide_reviews: {
        Row: {
          booking_id: string
          created_at: string | null
          guide_id: string
          id: string
          rating: number
          review_text: string | null
          traveler_id: string
        }
        Insert: {
          booking_id: string
          created_at?: string | null
          guide_id: string
          id?: string
          rating: number
          review_text?: string | null
          traveler_id: string
        }
        Update: {
          booking_id?: string
          created_at?: string | null
          guide_id?: string
          id?: string
          rating?: number
          review_text?: string | null
          traveler_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "guide_reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "guide_bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guide_reviews_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides"
            referencedColumns: ["id"]
          },
        ]
      }
      guides: {
        Row: {
          created_at: string | null
          daily_rate: number | null
          description: string | null
          experience_years: number | null
          gallery_urls: string[] | null
          hourly_rate: number | null
          id: string
          is_available: boolean | null
          is_verified: boolean | null
          languages: string[] | null
          location: string | null
          profile_image_url: string | null
          rating: number | null
          specialties: string[] | null
          title: string
          total_reviews: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          daily_rate?: number | null
          description?: string | null
          experience_years?: number | null
          gallery_urls?: string[] | null
          hourly_rate?: number | null
          id?: string
          is_available?: boolean | null
          is_verified?: boolean | null
          languages?: string[] | null
          location?: string | null
          profile_image_url?: string | null
          rating?: number | null
          specialties?: string[] | null
          title: string
          total_reviews?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          daily_rate?: number | null
          description?: string | null
          experience_years?: number | null
          gallery_urls?: string[] | null
          hourly_rate?: number | null
          id?: string
          is_available?: boolean | null
          is_verified?: boolean | null
          languages?: string[] | null
          location?: string | null
          profile_image_url?: string | null
          rating?: number | null
          specialties?: string[] | null
          title?: string
          total_reviews?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      likes: {
        Row: {
          created_at: string
          id: string
          post_id: string | null
          reel_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id?: string | null
          reel_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string | null
          reel_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_likes_post_id"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "travel_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_likes_reel_id"
            columns: ["reel_id"]
            isOneToOne: false
            referencedRelation: "travel_reels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_likes_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "travel_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_reel_id_fkey"
            columns: ["reel_id"]
            isOneToOne: false
            referencedRelation: "travel_reels"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          read: boolean | null
          recipient_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          read?: boolean | null
          recipient_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          read?: boolean | null
          recipient_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_messages_recipient_id"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "fk_messages_sender_id"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_user_id: string | null
          created_at: string
          id: string
          message: string
          post_id: string | null
          read: boolean | null
          reel_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_user_id?: string | null
          created_at?: string
          id?: string
          message: string
          post_id?: string | null
          read?: boolean | null
          reel_id?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          action_user_id?: string | null
          created_at?: string
          id?: string
          message?: string
          post_id?: string | null
          read?: boolean | null
          reel_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_notifications_action_user_id"
            columns: ["action_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "fk_notifications_post_id"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "travel_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_notifications_reel_id"
            columns: ["reel_id"]
            isOneToOne: false
            referencedRelation: "travel_reels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_notifications_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          followers_count: number | null
          following_count: number | null
          id: string
          interests: string[] | null
          location: string | null
          posts_count: number | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          followers_count?: number | null
          following_count?: number | null
          id?: string
          interests?: string[] | null
          location?: string | null
          posts_count?: number | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          followers_count?: number | null
          following_count?: number | null
          id?: string
          interests?: string[] | null
          location?: string | null
          posts_count?: number | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      stories: {
        Row: {
          caption: string | null
          content_type: string
          content_url: string
          created_at: string
          expires_at: string
          id: string
          user_id: string
          views_count: number | null
        }
        Insert: {
          caption?: string | null
          content_type: string
          content_url: string
          created_at?: string
          expires_at: string
          id?: string
          user_id: string
          views_count?: number | null
        }
        Update: {
          caption?: string | null
          content_type?: string
          content_url?: string
          created_at?: string
          expires_at?: string
          id?: string
          user_id?: string
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_stories_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      travel_posts: {
        Row: {
          comments_count: number | null
          content: string | null
          created_at: string
          id: string
          image_url: string | null
          likes_count: number | null
          location: string | null
          media_type: string | null
          media_urls: string[] | null
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          comments_count?: number | null
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          likes_count?: number | null
          location?: string | null
          media_type?: string | null
          media_urls?: string[] | null
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          comments_count?: number | null
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          likes_count?: number | null
          location?: string | null
          media_type?: string | null
          media_urls?: string[] | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_travel_posts_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      travel_reels: {
        Row: {
          created_at: string
          id: string
          likes_count: number | null
          location: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          user_id: string
          video_url: string
          views_count: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          likes_count?: number | null
          location?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          user_id: string
          video_url: string
          views_count?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          likes_count?: number | null
          location?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          video_url?: string
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_travel_reels_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      conversations: {
        Row: {
          last_message_at: string | null
          other_user_id: string | null
          unread_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: "traveler" | "guide" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["traveler", "guide", "admin"],
    },
  },
} as const
