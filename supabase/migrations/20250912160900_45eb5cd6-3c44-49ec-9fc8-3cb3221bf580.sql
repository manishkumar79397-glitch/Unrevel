-- Add missing foreign key constraints to link tables properly
ALTER TABLE public.travel_posts 
ADD CONSTRAINT fk_travel_posts_user_id 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

ALTER TABLE public.travel_reels 
ADD CONSTRAINT fk_travel_reels_user_id 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

ALTER TABLE public.comments 
ADD CONSTRAINT fk_comments_user_id 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

ALTER TABLE public.comments 
ADD CONSTRAINT fk_comments_post_id 
FOREIGN KEY (post_id) REFERENCES public.travel_posts(id) ON DELETE CASCADE;

ALTER TABLE public.comments 
ADD CONSTRAINT fk_comments_reel_id 
FOREIGN KEY (reel_id) REFERENCES public.travel_reels(id) ON DELETE CASCADE;

ALTER TABLE public.stories 
ADD CONSTRAINT fk_stories_user_id 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

ALTER TABLE public.notifications 
ADD CONSTRAINT fk_notifications_user_id 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

ALTER TABLE public.notifications 
ADD CONSTRAINT fk_notifications_action_user_id 
FOREIGN KEY (action_user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

ALTER TABLE public.notifications 
ADD CONSTRAINT fk_notifications_post_id 
FOREIGN KEY (post_id) REFERENCES public.travel_posts(id) ON DELETE CASCADE;

ALTER TABLE public.notifications 
ADD CONSTRAINT fk_notifications_reel_id 
FOREIGN KEY (reel_id) REFERENCES public.travel_reels(id) ON DELETE CASCADE;

ALTER TABLE public.messages 
ADD CONSTRAINT fk_messages_sender_id 
FOREIGN KEY (sender_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

ALTER TABLE public.messages 
ADD CONSTRAINT fk_messages_recipient_id 
FOREIGN KEY (recipient_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

ALTER TABLE public.likes 
ADD CONSTRAINT fk_likes_user_id 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

ALTER TABLE public.likes 
ADD CONSTRAINT fk_likes_post_id 
FOREIGN KEY (post_id) REFERENCES public.travel_posts(id) ON DELETE CASCADE;

ALTER TABLE public.likes 
ADD CONSTRAINT fk_likes_reel_id 
FOREIGN KEY (reel_id) REFERENCES public.travel_reels(id) ON DELETE CASCADE;

ALTER TABLE public.follows 
ADD CONSTRAINT fk_follows_follower_id 
FOREIGN KEY (follower_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

ALTER TABLE public.follows 
ADD CONSTRAINT fk_follows_following_id 
FOREIGN KEY (following_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;