import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ThumbsUp, MessageCircle } from "lucide-react";
import concertPic from "@/assets/concert-pic.jpg";
import news2 from "@/assets/news-2.png";
import news3 from "@/assets/news-3.png";
import news4 from "@/assets/news-4.png";
import news5 from "@/assets/news-5.png";

interface NewsItemProps {
  title: string;
  description: string;
  timestamp: string;
  likes?: number;
  comments?: number;
  category?: string;
  imageUrl?: string;
}

const NewsItem = ({ title, description, timestamp, likes = 0, comments = 0, category = "Team News", imageUrl }: NewsItemProps) => {
  return (
    <Card className="gradient-card border-2 border-primary/20 overflow-hidden hover:border-primary/40 transition-all cursor-pointer group">
      {imageUrl && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">
            {category}
          </Badge>
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Clock className="w-3 h-3" />
            <span>{timestamp}</span>
          </div>
        </div>
        
        <h3 className="text-foreground font-bold text-lg group-hover:text-primary transition-colors mb-2">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {description}
        </p>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-muted-foreground hover:text-accent transition-colors">
            <ThumbsUp className="w-4 h-4" />
            <span className="text-sm font-semibold">{likes}</span>
          </button>
          <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-semibold">{comments}</span>
          </button>
        </div>
      </div>
    </Card>
  );
};

export const NewsFeed = () => {
  const newsItems = [
    {
      title: "Ali's Concert Success! 🎯",
      description: "Ali bagged a girl at the concert last night with my help - coaches don't play! The wingman of the century strikes again. The whole squad knows who the real MVP is off the pitch.",
      timestamp: "2 hours ago",
      likes: 47,
      comments: 12,
      category: "Off the Pitch",
      imageUrl: concertPic
    },
    {
      title: "Marcus Scores Hat-Trick! ⚽⚽⚽",
      description: "Marcus scored his first hat-trick in training today and coach is seriously impressed! Three incredible goals in 15 minutes. The striker is on fire and ready for the weekend match.",
      timestamp: "5 hours ago",
      likes: 89,
      comments: 23,
      category: "Training",
      imageUrl: news2
    },
    {
      title: "Pizza Party Chaos! 🍕",
      description: "Team dinner got absolutely wild last night. Someone ordered 15 large pizzas and we STILL ran out! The whole squad was starving after that intense practice session.",
      timestamp: "1 day ago",
      likes: 156,
      comments: 34,
      category: "Team Life",
      imageUrl: news3
    },
    {
      title: "Jake Goes Viral! 🕺",
      description: "Jake's new celebration dance has taken TikTok by storm with over 1 million views already! The whole team is trying to learn it for the next match. Prepare for stadium-wide dance-offs!",
      timestamp: "2 days ago",
      likes: 203,
      comments: 45,
      category: "Social Media",
      imageUrl: news4
    },
    {
      title: "Rocky IV Pre-Match Ritual 🥊",
      description: "Team tradition continues! We're watching Rocky IV before tomorrow's big match. It worked last time and the energy was incredible. If it ain't broke, don't fix it!",
      timestamp: "3 days ago",
      likes: 78,
      comments: 19,
      category: "Team Traditions",
      imageUrl: news5
    }
  ];

  return (
    <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground text-glow flex items-center gap-2">
          📰 Team News
          <Badge className="bg-accent text-accent-foreground">NEW</Badge>
        </h2>
      </div>
      
      <div className="space-y-4">
        {newsItems.map((item, index) => (
          <NewsItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};
