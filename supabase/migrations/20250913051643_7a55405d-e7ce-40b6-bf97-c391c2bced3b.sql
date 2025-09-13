-- Create function to update likes count for posts
CREATE OR REPLACE FUNCTION public.update_post_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.post_id IS NOT NULL THEN
    -- Increment likes count when a like is added to a post
    UPDATE public.travel_posts 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' AND OLD.post_id IS NOT NULL THEN
    -- Decrement likes count when a like is removed from a post
    UPDATE public.travel_posts 
    SET likes_count = GREATEST(likes_count - 1, 0)
    WHERE id = OLD.post_id;
  END IF;
  
  IF TG_OP = 'INSERT' AND NEW.reel_id IS NOT NULL THEN
    -- Increment likes count when a like is added to a reel
    UPDATE public.travel_reels 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.reel_id;
  ELSIF TG_OP = 'DELETE' AND OLD.reel_id IS NOT NULL THEN
    -- Decrement likes count when a like is removed from a reel
    UPDATE public.travel_reels 
    SET likes_count = GREATEST(likes_count - 1, 0)
    WHERE id = OLD.reel_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic likes count updates
CREATE TRIGGER update_likes_count_trigger
  AFTER INSERT OR DELETE ON public.likes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_post_likes_count();

-- Update existing likes counts to ensure they're accurate
UPDATE public.travel_posts 
SET likes_count = (
  SELECT COUNT(*) 
  FROM public.likes 
  WHERE post_id = travel_posts.id
);

UPDATE public.travel_reels 
SET likes_count = (
  SELECT COUNT(*) 
  FROM public.likes 
  WHERE reel_id = travel_reels.id
);