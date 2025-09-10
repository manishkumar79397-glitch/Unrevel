-- Create sample profiles and posts for demo purposes
INSERT INTO public.profiles (user_id, username, display_name, bio, location, avatar_url, followers_count, following_count, posts_count, interests) VALUES 
('00000000-0000-0000-0000-000000000001', 'alex_explorer', 'Alex Johnson', 'Digital nomad exploring the world one adventure at a time 🌍 | Photography enthusiast | Mountain lover', 'Currently in Bali, Indonesia', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face', 2847, 956, 187, ARRAY['Mountain Hiking', 'Photography', 'Solo Travel', 'Street Food', 'Scuba Diving']);

INSERT INTO public.profiles (user_id, username, display_name, bio, location, avatar_url, followers_count, following_count, posts_count, interests) VALUES 
('00000000-0000-0000-0000-000000000002', 'wanderlust_sara', 'Sara Chen', 'Adventure seeker | Cultural explorer | Food enthusiast 🍜 Sharing stories from around the globe', 'Tokyo, Japan', 'https://images.unsplash.com/photo-1494790108755-2616b1e6a44a?w=100&h=100&fit=crop&crop=face', 3521, 1204, 243, ARRAY['Cultural Travel', 'Food Photography', 'City Exploration', 'Art Museums']);

INSERT INTO public.profiles (user_id, username, display_name, bio, location, avatar_url, followers_count, following_count, posts_count, interests) VALUES 
('00000000-0000-0000-0000-000000000003', 'mountain_mike', 'Mike Rodriguez', 'Professional mountaineer | Nature photographer | Sustainability advocate 🏔️', 'Denver, Colorado', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', 5120, 892, 156, ARRAY['Mountain Climbing', 'Nature Photography', 'Hiking', 'Environmental Travel']);

-- Create sample travel posts
INSERT INTO public.travel_posts (user_id, title, content, image_url, location, tags, likes_count, comments_count) VALUES 
('00000000-0000-0000-0000-000000000001', 'Sunrise at Mount Batur, Bali', 'What an incredible morning! Woke up at 3 AM to hike Mount Batur and catch this breathtaking sunrise. The 2-hour trek was totally worth it for this view over Lake Batur. The colors in the sky were absolutely magical! 🌅', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', 'Mount Batur, Bali', ARRAY['sunrise', 'hiking', 'bali', 'volcano', 'adventure'], 234, 18);

INSERT INTO public.travel_posts (user_id, title, content, image_url, location, tags, likes_count, comments_count) VALUES 
('00000000-0000-0000-0000-000000000002', 'Street Food Heaven in Shibuya', 'Spent the entire evening exploring the food stalls in Shibuya. This incredible ramen from a tiny local shop was the highlight of my night! The broth was so rich and flavorful. Tokyo never fails to amaze me with its culinary adventures! 🍜', 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&h=600&fit=crop', 'Shibuya, Tokyo', ARRAY['food', 'tokyo', 'ramen', 'street food', 'japan'], 156, 24);

INSERT INTO public.travel_posts (user_id, title, content, image_url, location, tags, likes_count, comments_count) VALUES 
('00000000-0000-0000-0000-000000000003', 'Epic Trail Run in Rocky Mountain National Park', 'Just completed a 15-mile trail run through some of the most stunning landscapes in Colorado. The altitude definitely challenged me, but the views of snow-capped peaks made every step worth it! Nothing beats the feeling of being surrounded by nature.', 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop', 'Rocky Mountain National Park, Colorado', ARRAY['trail running', 'mountains', 'colorado', 'nature', 'fitness'], 189, 12);

INSERT INTO public.travel_posts (user_id, title, content, image_url, location, tags, likes_count, comments_count) VALUES 
('00000000-0000-0000-0000-000000000001', 'Hidden Beach Paradise in Nusa Penida', 'Discovered this secluded beach after a challenging hike down the cliffs. Crystal clear turquoise water and not a soul in sight! Sometimes the best adventures are the ones that require a little extra effort to reach. Paradise found! 🏖️', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop', 'Nusa Penida, Indonesia', ARRAY['beach', 'hidden gem', 'indonesia', 'paradise', 'adventure'], 312, 31);

INSERT INTO public.travel_posts (user_id, title, content, image_url, location, tags, likes_count, comments_count) VALUES 
('00000000-0000-0000-0000-000000000002', 'Traditional Tea Ceremony in Kyoto', 'Had the most peaceful afternoon learning the art of traditional Japanese tea ceremony in a beautiful temple garden in Kyoto. The mindfulness and precision required was incredibly meditative. These cultural experiences are what travel is all about! 🍵', 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&h=600&fit=crop', 'Kyoto, Japan', ARRAY['culture', 'tea ceremony', 'kyoto', 'tradition', 'meditation'], 198, 22);

-- Create sample travel reels
INSERT INTO public.travel_reels (user_id, title, video_url, thumbnail_url, location, likes_count, views_count) VALUES 
('00000000-0000-0000-0000-000000000001', 'Epic Drone Shot of Rice Terraces', 'https://example.com/video1.mp4', 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=400&h=600&fit=crop', 'Jatiluwih, Bali', 445, 12340);

INSERT INTO public.travel_reels (user_id, title, video_url, thumbnail_url, location, likes_count, views_count) VALUES 
('00000000-0000-0000-0000-000000000003', 'Sunrise Timelapse from Summit', 'https://example.com/video2.mp4', 'https://images.unsplash.com/photo-1464822759844-d150cb8faffe?w=400&h=600&fit=crop', 'Mount Elbert, Colorado', 267, 8920);

INSERT INTO public.travel_reels (user_id, title, video_url, thumbnail_url, location, likes_count, views_count) VALUES 
('00000000-0000-0000-0000-000000000002', 'Tokyo Street Walking Tour', 'https://example.com/video3.mp4', 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=600&fit=crop', 'Harajuku, Tokyo', 534, 15670);