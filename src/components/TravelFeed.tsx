import { TravelPost } from "./TravelPost";

// Dummy travel posts data
const dummyPosts = [
  {
    id: "1",
    author: {
      name: "Sarah Chen",
      username: "wanderlust_sarah",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    location: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=600&fit=crop",
    caption: "Watching the most incredible sunset over the Aegean Sea! The blue and white architecture here is absolutely stunning 🌅",
    likes: 1247,
    comments: 89,
    isLiked: true,
    tags: ["sunset", "greece", "architecture", "ocean"],
    timeAgo: "2h"
  },
  {
    id: "2",
    author: {
      name: "Marco Rodriguez",
      username: "marco_travels",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    location: "Banff National Park, Canada",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
    caption: "Hiking through the Canadian Rockies never gets old. This view from Lake Louise took my breath away! Perfect weather for a solo adventure ⛰️",
    likes: 892,
    comments: 56,
    isLiked: false,
    tags: ["hiking", "mountains", "canada", "solo", "nature"],
    timeAgo: "4h"
  },
  {
    id: "3",
    author: {
      name: "Emma Thompson",
      username: "foodie_explorer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    location: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=600&fit=crop",
    caption: "Street food tour in Shibuya was incredible! This ramen bowl was pure perfection. Already planning my next foodie adventure 🍜",
    likes: 2134,
    comments: 167,
    isLiked: true,
    tags: ["food", "ramen", "tokyo", "streetfood", "japan"],
    timeAgo: "8h"
  },
  {
    id: "4",
    author: {
      name: "Jake Wilson",
      username: "adventure_jake",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    location: "Machu Picchu, Peru",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&h=600&fit=crop",
    caption: "Finally made it to Machu Picchu after 4 days on the Inca Trail! The ancient engineering here is mind-blowing. Worth every step! 🏔️",
    likes: 3456,
    comments: 234,
    isLiked: false,
    tags: ["incatrail", "hiking", "peru", "ancient", "adventure"],
    timeAgo: "1d"
  },
  {
    id: "5",
    author: {
      name: "Lisa Park",
      username: "beach_wanderer",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
    },
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=600&h=600&fit=crop",
    caption: "Crystal clear waters and overwater bungalows - living the dream in paradise! Already missing this slice of heaven 🏝️",
    likes: 5623,
    comments: 445,
    isLiked: true,
    tags: ["maldives", "paradise", "beach", "overwater", "tropical"],
    timeAgo: "2d"
  }
];

export function TravelFeed() {
  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {dummyPosts.map((post, index) => (
        <div 
          key={post.id} 
          className="animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <TravelPost {...post} />
        </div>
      ))}
    </div>
  );
}