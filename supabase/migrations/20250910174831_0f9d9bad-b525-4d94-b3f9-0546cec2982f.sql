-- Create demo posts with a system user approach
-- First create a system/demo user entry in profiles for demo content
-- Using a UUID that won't conflict with real auth users
INSERT INTO public.profiles (
  id,
  user_id, 
  username, 
  display_name, 
  bio, 
  location, 
  avatar_url, 
  followers_count, 
  following_count, 
  posts_count, 
  interests
) VALUES 
(
  'demo0001-0000-0000-0000-000000000001',
  'demo0001-0000-0000-0000-000000000001',
  'demo_traveler', 
  'Demo Traveler', 
  'Sample travel content for demonstration', 
  'Around the World', 
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
  0, 
  0, 
  0, 
  ARRAY['Photography', 'Adventure']
) ON CONFLICT (user_id) DO NOTHING;

-- Create sample travel posts for demo purposes  
INSERT INTO public.travel_posts (user_id, title, content, image_url, location, tags, likes_count, comments_count) VALUES 
('demo0001-0000-0000-0000-000000000001', 'Majestic Mountain Sunrise', 'Captured this breathtaking sunrise from the mountain peak after a challenging 4-hour hike. The golden hour light painting the landscape was absolutely magical! 🌅', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', 'Swiss Alps', ARRAY['sunrise', 'hiking', 'mountains', 'photography'], 45, 8),
('demo0001-0000-0000-0000-000000000001', 'Street Food Adventures', 'Exploring the vibrant street food scene! This incredible local dish was recommended by a friendly vendor - sometimes the best travel experiences come from following local advice! 🍜', 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&h=600&fit=crop', 'Bangkok, Thailand', ARRAY['food', 'street food', 'local culture', 'thailand'], 32, 12),
('demo0001-0000-0000-0000-000000000001', 'Hidden Paradise Beach', 'Found this secluded beach after following a winding coastal path. Crystal clear waters and complete tranquility - paradise exists! 🏖️', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop', 'Nusa Penida, Indonesia', ARRAY['beach', 'hidden gem', 'paradise', 'indonesia'], 67, 15),
('demo0001-0000-0000-0000-000000000001', 'Cultural Immersion', 'Participating in a traditional tea ceremony was such a peaceful and enlightening experience. Travel is about connecting with different cultures and traditions! 🍵', 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&h=600&fit=crop', 'Kyoto, Japan', ARRAY['culture', 'tea ceremony', 'tradition', 'japan'], 28, 6);

-- Create sample travel reels
INSERT INTO public.travel_reels (user_id, title, video_url, thumbnail_url, location, likes_count, views_count) VALUES 
('demo0001-0000-0000-0000-000000000001', 'Epic Mountain Vista', 'https://example.com/demo1.mp4', 'https://images.unsplash.com/photo-1464822759844-d150cb8faffe?w=400&h=600&fit=crop', 'Rocky Mountains', 89, 2340),
('demo0001-0000-0000-0000-000000000001', 'City Exploration', 'https://example.com/demo2.mp4', 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=600&fit=crop', 'Tokyo Streets', 156, 4720);