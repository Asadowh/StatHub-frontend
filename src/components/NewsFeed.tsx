import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ThumbsUp, MessageCircle } from "lucide-react";

interface NewsItemProps {
  title: string;
  timestamp: string;
  likes?: number;
  comments?: number;
  category?: string;
}

const NewsItem = ({ title, timestamp, likes = 0, comments = 0, category = "Team News" }: NewsItemProps) => {
  return (
    <Card className="gradient-card border-2 border-primary/20 p-5 hover:border-primary/40 transition-all cursor-pointer group">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">
              {category}
            </Badge>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <Clock className="w-3 h-3" />
              <span>{timestamp}</span>
            </div>
          </div>
          
          <p className="text-foreground font-medium group-hover:text-primary transition-colors leading-relaxed">
            {title}
          </p>
          
          <div className="flex items-center gap-4 mt-3">
            <button className="flex items-center gap-1 text-muted-foreground hover:text-accent transition-colors">
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm">{likes}</span>
            </button>
            <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{comments}</span>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const NewsFeed = () => {
  const newsItems = [
    {
      title: "Ali got a girl's number at the concert last night! The legend strikes again 🎯",
      timestamp: "2 hours ago",
      likes: 47,
      comments: 12,
      category: "Off the Pitch"
    },
    {
      title: "Marcus scored his first hat-trick in training today. Coach is impressed! ⚽⚽⚽",
      timestamp: "5 hours ago",
      likes: 89,
      comments: 23,
      category: "Training"
    },
    {
      title: "Team dinner got wild - Someone ordered 15 pizzas and we still ran out 🍕",
      timestamp: "1 day ago",
      likes: 156,
      comments: 34,
      category: "Team Life"
    },
    {
      title: "Jake's new celebration dance went viral on TikTok! 1M views already 🕺",
      timestamp: "2 days ago",
      likes: 203,
      comments: 45,
      category: "Social Media"
    },
    {
      title: "Pre-match ritual: Team decided to watch Rocky IV for good luck. It worked last time!",
      timestamp: "3 days ago",
      likes: 78,
      comments: 19,
      category: "Team Traditions"
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
      
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {newsItems.map((item, index) => (
          <NewsItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};
