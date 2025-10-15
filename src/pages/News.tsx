import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Laugh } from "lucide-react";
import concertPic from "@/assets/concert-pic.jpg";
import ronaldoAvatar from "@/assets/ronaldo-avatar.png";

interface NewsPost {
  id: number;
  author: string;
  avatar?: string;
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  category: string;
}

const newsPosts: NewsPost[] = [
  {
    id: 1,
    author: "Ali Rahman",
    timestamp: "2 hours ago",
    content: "Ali scored a hat trick and then tripped over the ball during celebration 🏆😂 Classic Ali moment!",
    likes: 24,
    comments: 8,
    category: "Funny"
  },
  {
    id: 2,
    author: "Team Coach",
    timestamp: "5 hours ago",
    content: "Coach forgot the water bottles again 💧😅 We had to share one bottle between 11 players. Never forget hydration day!",
    likes: 31,
    comments: 12,
    category: "Team Life"
  },
  {
    id: 3,
    author: "Parviz Mammadov",
    timestamp: "1 day ago",
    content: "Parviz finally got a clean sheet after 9 matches 🧤👏 The drought is over! Celebration time!",
    likes: 45,
    comments: 15,
    category: "Achievement"
  },
  {
    id: 4,
    author: "Sami Ali",
    avatar: ronaldoAvatar,
    timestamp: "2 days ago",
    content: "Got a girl's number at the concert last night 🎸😂 Who says football players can't have game off the field?",
    image: concertPic,
    likes: 67,
    comments: 23,
    category: "Social"
  },
  {
    id: 5,
    author: "Rashad Huseynov",
    timestamp: "3 days ago",
    content: "Rashad showed up to practice in slippers because he 'forgot' it was training day 🩴😂 Fashion icon or just lazy?",
    likes: 38,
    comments: 11,
    category: "Funny"
  },
  {
    id: 6,
    author: "Team Captain",
    timestamp: "4 days ago",
    content: "Post-game team dinner turned into a karaoke competition. Goalkeeper can't sing to save his life but gets 10/10 for effort 🎤😅",
    likes: 52,
    comments: 19,
    category: "Team Life"
  },
];

const News = () => {
  const getCategoryColor = (category: string) => {
    switch(category) {
      case "Funny": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      case "Achievement": return "bg-primary/20 text-primary border-primary/30";
      case "Social": return "bg-purple-500/20 text-purple-500 border-purple-500/30";
      case "Team Life": return "bg-blue-500/20 text-blue-500 border-blue-500/30";
      default: return "";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold mb-2">Team News Feed</h1>
          <p className="text-muted-foreground">
            Stay updated with the latest happenings, laughs, and moments from the team 🎉
          </p>
        </div>

        {/* News Feed */}
        <div className="space-y-6">
          {newsPosts.map((post) => (
            <Card
              key={post.id}
              className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 animate-fade-in"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border-2 border-border">
                    {post.avatar ? (
                      <AvatarImage src={post.avatar} alt={post.author} />
                    ) : (
                      <AvatarFallback className="bg-muted text-sm">
                        {post.author.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="font-semibold">{post.author}</p>
                    <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                  </div>
                </div>
                <Badge className={getCategoryColor(post.category)}>
                  {post.category}
                </Badge>
              </div>

              {/* Post Content */}
              <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

              {/* Post Image */}
              {post.image && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={post.image} 
                    alt="Post" 
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center gap-6 pt-4 border-t border-border/50">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
                  <Heart className="w-5 h-5 group-hover:fill-primary" />
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Laugh className="w-5 h-5" />
                  <span className="text-sm font-medium">React</span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
