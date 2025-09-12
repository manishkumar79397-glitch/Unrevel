-- Create notification trigger functions
CREATE OR REPLACE FUNCTION public.create_like_notification()
RETURNS TRIGGER AS $$
BEGIN
  -- Don't create notification if user likes their own content
  IF NEW.user_id = (
    SELECT user_id FROM public.travel_posts WHERE id = NEW.post_id
    UNION ALL
    SELECT user_id FROM public.travel_reels WHERE id = NEW.reel_id
  ) THEN
    RETURN NEW;
  END IF;

  -- Create notification for post like
  IF NEW.post_id IS NOT NULL THEN
    INSERT INTO public.notifications (user_id, type, title, message, action_user_id, post_id)
    SELECT 
      tp.user_id,
      'like',
      'New like on your post',
      p.display_name || ' liked your post "' || tp.title || '"',
      NEW.user_id,
      NEW.post_id
    FROM public.travel_posts tp
    JOIN public.profiles p ON p.user_id = NEW.user_id
    WHERE tp.id = NEW.post_id;
  END IF;

  -- Create notification for reel like
  IF NEW.reel_id IS NOT NULL THEN
    INSERT INTO public.notifications (user_id, type, title, message, action_user_id, reel_id)
    SELECT 
      tr.user_id,
      'like',
      'New like on your reel',
      p.display_name || ' liked your reel "' || tr.title || '"',
      NEW.user_id,
      NEW.reel_id
    FROM public.travel_reels tr
    JOIN public.profiles p ON p.user_id = NEW.user_id
    WHERE tr.id = NEW.reel_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.create_comment_notification()
RETURNS TRIGGER AS $$
BEGIN
  -- Don't create notification if user comments on their own content
  IF NEW.user_id = (
    SELECT user_id FROM public.travel_posts WHERE id = NEW.post_id
    UNION ALL
    SELECT user_id FROM public.travel_reels WHERE id = NEW.reel_id
  ) THEN
    RETURN NEW;
  END IF;

  -- Create notification for post comment
  IF NEW.post_id IS NOT NULL THEN
    INSERT INTO public.notifications (user_id, type, title, message, action_user_id, post_id)
    SELECT 
      tp.user_id,
      'comment',
      'New comment on your post',
      p.display_name || ' commented on your post "' || tp.title || '"',
      NEW.user_id,
      NEW.post_id
    FROM public.travel_posts tp
    JOIN public.profiles p ON p.user_id = NEW.user_id
    WHERE tp.id = NEW.post_id;
  END IF;

  -- Create notification for reel comment
  IF NEW.reel_id IS NOT NULL THEN
    INSERT INTO public.notifications (user_id, type, title, message, action_user_id, reel_id)
    SELECT 
      tr.user_id,
      'comment',
      'New comment on your reel',
      p.display_name || ' commented on your reel "' || tr.title || '"',
      NEW.user_id,
      NEW.reel_id
    FROM public.travel_reels tr
    JOIN public.profiles p ON p.user_id = NEW.user_id
    WHERE tr.id = NEW.reel_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.create_follow_notification()
RETURNS TRIGGER AS $$
BEGIN
  -- Don't create notification if user follows themselves
  IF NEW.follower_id = NEW.following_id THEN
    RETURN NEW;
  END IF;

  INSERT INTO public.notifications (user_id, type, title, message, action_user_id)
  SELECT 
    NEW.following_id,
    'follow',
    'New follower',
    p.display_name || ' started following you',
    NEW.follower_id
  FROM public.profiles p
  WHERE p.user_id = NEW.follower_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create triggers for automatic notifications
CREATE TRIGGER trigger_like_notification
  AFTER INSERT ON public.likes
  FOR EACH ROW
  EXECUTE FUNCTION public.create_like_notification();

CREATE TRIGGER trigger_comment_notification
  AFTER INSERT ON public.comments
  FOR EACH ROW
  EXECUTE FUNCTION public.create_comment_notification();

CREATE TRIGGER trigger_follow_notification
  AFTER INSERT ON public.follows
  FOR EACH ROW
  EXECUTE FUNCTION public.create_follow_notification();

-- Add realtime publication for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.stories;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.likes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.follows;
ALTER PUBLICATION supabase_realtime ADD TABLE public.travel_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.travel_reels;