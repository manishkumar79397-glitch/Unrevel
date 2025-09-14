-- Create user roles enum
CREATE TYPE user_role AS ENUM ('traveler', 'guide', 'admin');

-- Add role column to profiles table
ALTER TABLE profiles ADD COLUMN role user_role DEFAULT 'traveler';

-- Create guides table for professional guide profiles
CREATE TABLE guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  experience_years INTEGER DEFAULT 0,
  languages TEXT[] DEFAULT '{}',
  specialties TEXT[] DEFAULT '{}', -- historical, adventure, food, cultural, etc.
  hourly_rate DECIMAL(10,2),
  daily_rate DECIMAL(10,2),
  rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  location TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  profile_image_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create guide availability table
CREATE TABLE guide_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guide_id UUID NOT NULL REFERENCES guides(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  is_available BOOLEAN DEFAULT true,
  time_slots JSONB DEFAULT '[]', -- Array of time slots like [{"start": "09:00", "end": "17:00", "available": true}]
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(guide_id, date)
);

-- Create bookings table
CREATE TABLE guide_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  traveler_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  guide_id UUID NOT NULL REFERENCES guides(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  duration_hours INTEGER,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  special_requests TEXT,
  traveler_count INTEGER DEFAULT 1,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create guide reviews table
CREATE TABLE guide_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES guide_bookings(id) ON DELETE CASCADE,
  traveler_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  guide_id UUID NOT NULL REFERENCES guides(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(booking_id) -- One review per booking
);

-- Enable RLS on all new tables
ALTER TABLE guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE guide_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE guide_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE guide_reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for guides table
CREATE POLICY "Anyone can view guides" ON guides FOR SELECT USING (true);
CREATE POLICY "Guides can create their own profile" ON guides FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Guides can update their own profile" ON guides FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Guides can delete their own profile" ON guides FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for guide_availability table
CREATE POLICY "Anyone can view guide availability" ON guide_availability FOR SELECT USING (true);
CREATE POLICY "Guides can manage their availability" ON guide_availability FOR ALL USING (
  auth.uid() = (SELECT user_id FROM guides WHERE id = guide_id)
);

-- RLS Policies for guide_bookings table
CREATE POLICY "Users can view their own bookings" ON guide_bookings FOR SELECT USING (
  auth.uid() = traveler_id OR auth.uid() = (SELECT user_id FROM guides WHERE id = guide_id)
);
CREATE POLICY "Travelers can create bookings" ON guide_bookings FOR INSERT WITH CHECK (auth.uid() = traveler_id);
CREATE POLICY "Booking participants can update bookings" ON guide_bookings FOR UPDATE USING (
  auth.uid() = traveler_id OR auth.uid() = (SELECT user_id FROM guides WHERE id = guide_id)
);

-- RLS Policies for guide_reviews table
CREATE POLICY "Anyone can view reviews" ON guide_reviews FOR SELECT USING (true);
CREATE POLICY "Travelers can create reviews for their bookings" ON guide_reviews FOR INSERT WITH CHECK (
  auth.uid() = traveler_id AND 
  EXISTS (
    SELECT 1 FROM guide_bookings 
    WHERE id = booking_id AND traveler_id = auth.uid() AND status = 'completed'
  )
);
CREATE POLICY "Travelers can update their own reviews" ON guide_reviews FOR UPDATE USING (auth.uid() = traveler_id);

-- Create triggers for updated_at columns
CREATE TRIGGER update_guides_updated_at
  BEFORE UPDATE ON guides
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_guide_bookings_updated_at
  BEFORE UPDATE ON guide_bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to update guide rating when reviews are added/updated
CREATE OR REPLACE FUNCTION update_guide_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE guides 
  SET 
    rating = (
      SELECT ROUND(AVG(rating)::numeric, 2)
      FROM guide_reviews 
      WHERE guide_id = COALESCE(NEW.guide_id, OLD.guide_id)
    ),
    total_reviews = (
      SELECT COUNT(*)
      FROM guide_reviews 
      WHERE guide_id = COALESCE(NEW.guide_id, OLD.guide_id)
    )
  WHERE id = COALESCE(NEW.guide_id, OLD.guide_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating guide ratings
CREATE TRIGGER update_guide_rating_on_review_insert
  AFTER INSERT ON guide_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_guide_rating();

CREATE TRIGGER update_guide_rating_on_review_update
  AFTER UPDATE ON guide_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_guide_rating();

CREATE TRIGGER update_guide_rating_on_review_delete
  AFTER DELETE ON guide_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_guide_rating();