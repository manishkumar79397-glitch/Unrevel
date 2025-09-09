import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface TravelPost {
  id: string;
  user_id: string;
  title: string;
  content: string;
  image_url: string;
  location: string;
  tags: string[];
  likes_count: number;
  comments_count: number;
  created_at: string;
  profiles: {
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

export interface TravelReel {
  id: string;
  user_id: string;
  title: string;
  video_url: string;
  thumbnail_url: string;
  location: string;
  likes_count: number;
  views_count: number;
  created_at: string;
  profiles: {
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

export interface UserProfile {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  bio: string;
  avatar_url: string;
  location: string;
  followers_count: number;
  following_count: number;
  posts_count: number;
  interests: string[];
}

export const useTravelPosts = () => {
  return useQuery({
    queryKey: ["travel-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("travel_posts")
        .select(`
          *,
          profiles (
            username,
            display_name,
            avatar_url
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as any;
    },
  });
};

export const useTravelReels = () => {
  return useQuery({
    queryKey: ["travel-reels"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("travel_reels")
        .select(`
          *,
          profiles (
            username,
            display_name,
            avatar_url
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as any;
    },
  });
};

export const useUserProfile = (userId?: string) => {
  const { user } = useAuth();
  const targetUserId = userId || user?.id;

  return useQuery({
    queryKey: ["user-profile", targetUserId],
    queryFn: async () => {
      if (!targetUserId) return null;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", targetUserId)
        .single();

      if (error) throw error;
      return data as UserProfile;
    },
    enabled: !!targetUserId,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (postData: Omit<TravelPost, "id" | "user_id" | "created_at" | "profiles" | "likes_count" | "comments_count">) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("travel_posts")
        .insert({
          ...postData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travel-posts"] });
    },
  });
};

export const useCreateReel = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (reelData: Omit<TravelReel, "id" | "user_id" | "created_at" | "profiles" | "likes_count" | "views_count">) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("travel_reels")
        .insert({
          ...reelData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travel-reels"] });
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ postId, isLiked }: { postId: string; isLiked: boolean }) => {
      if (!user) throw new Error("User not authenticated");

      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from("likes")
          .delete()
          .eq("user_id", user.id)
          .eq("post_id", postId);
        if (error) throw error;
      } else {
        // Like
        const { error } = await supabase
          .from("likes")
          .insert({
            user_id: user.id,
            post_id: postId,
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travel-posts"] });
    },
  });
};