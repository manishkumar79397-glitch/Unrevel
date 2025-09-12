-- Drop the security definer view and recreate without security definer
DROP VIEW public.conversations;

-- Create conversations view without security definer (uses invoker permissions)
CREATE VIEW public.conversations AS
SELECT 
  CASE 
    WHEN sender_id = auth.uid() THEN recipient_id 
    ELSE sender_id 
  END as other_user_id,
  MAX(created_at) as last_message_at,
  COUNT(*) FILTER (WHERE NOT read AND recipient_id = auth.uid()) as unread_count
FROM public.messages 
WHERE sender_id = auth.uid() OR recipient_id = auth.uid()
GROUP BY other_user_id;

-- Add triggers for automatic timestamp updates
CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON public.comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enhance travel_posts table to support multiple images
ALTER TABLE public.travel_posts 
ADD COLUMN media_urls TEXT[] DEFAULT NULL,
ADD COLUMN media_type TEXT DEFAULT 'image' CHECK (media_type IN ('image', 'video', 'carousel'));

-- Update travel_posts to use new media structure but keep backward compatibility
UPDATE public.travel_posts 
SET media_urls = ARRAY[image_url]
WHERE image_url IS NOT NULL AND media_urls IS NULL;

-- Create indexes for better performance
CREATE INDEX idx_comments_post_id ON public.comments(post_id);
CREATE INDEX idx_comments_reel_id ON public.comments(reel_id);
CREATE INDEX idx_comments_user_id ON public.comments(user_id);
CREATE INDEX idx_stories_user_id ON public.stories(user_id);
CREATE INDEX idx_stories_expires_at ON public.stories(expires_at);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(read);
CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON public.messages(recipient_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at);
CREATE INDEX idx_likes_post_id ON public.likes(post_id);
CREATE INDEX idx_likes_reel_id ON public.likes(reel_id);
CREATE INDEX idx_likes_user_id ON public.likes(user_id);
CREATE INDEX idx_follows_follower_id ON public.follows(follower_id);
CREATE INDEX idx_follows_following_id ON public.follows(following_id);

-- Enable realtime for all tables
ALTER TABLE public.comments REPLICA IDENTITY FULL;
ALTER TABLE public.stories REPLICA IDENTITY FULL;
ALTER TABLE public.notifications REPLICA IDENTITY FULL;
ALTER TABLE public.messages REPLICA IDENTITY FULL;
ALTER TABLE public.likes REPLICA IDENTITY FULL;
ALTER TABLE public.follows REPLICA IDENTITY FULL;
ALTER TABLE public.travel_posts REPLICA IDENTITY FULL;
ALTER TABLE public.travel_reels REPLICA IDENTITY FULL;