import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { Heart, Reply } from 'lucide-react';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
  likes: number;
}

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  currentUser: {
    id: string;
    name: string;
    avatar: string;
  };
  language: string;
}

export default function CommentModal({ isOpen, onClose, postId, currentUser, language }: CommentModalProps) {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'comment1',
      userId: 'user2',
      userName: 'प्रिया शर्मा',
      userAvatar: 'PS',
      content: 'बहुत बढ़िया जानकारी! मैं भी यह तकनीक आजमाऊंगी।',
      timestamp: new Date(2025, 3, 17, 10, 30),
      likes: 5
    },
    {
      id: 'comment2', 
      userId: 'user3',
      userName: 'मोहन पटेल',
      userAvatar: 'MP',
      content: 'क्या आप इसकी अधिक जानकारी साझा कर सकते हैं?',
      timestamp: new Date(2025, 3, 17, 11, 15),
      likes: 2
    }
  ]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: `comment${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content: newComment,
      timestamp: new Date(),
      likes: 0
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInMinutes = (now.getTime() - date.getTime()) / (1000 * 60);
    
    if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)} मिनट पहले`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} घंटे पहले`;
    } else {
      return date.toLocaleDateString('hi-IN');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {language === 'hi' ? 'टिप्पणियां' : 'Comments'} ({comments.length})
          </DialogTitle>
        </DialogHeader>
        
        {/* Add Comment Section */}
        <div className="border-b pb-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 agri-gradient rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-sm">{currentUser.avatar}</span>
            </div>
            <div className="flex-1">
              <Textarea
                placeholder={language === 'hi' ? 'अपनी टिप्पणी लिखें...' : 'Write your comment...'}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              <div className="flex justify-end mt-2">
                <Button 
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  size="sm"
                  className="agri-button-primary"
                >
                  {language === 'hi' ? 'टिप्पणी करें' : 'Comment'}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Comments List */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="w-8 h-8 agri-gradient rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-xs">{comment.userAvatar}</span>
              </div>
              <div className="flex-1">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{comment.userName}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(comment.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500 transition-colors">
                    <Heart className="h-3 w-3" />
                    {comment.likes > 0 && comment.likes}
                  </button>
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                    <Reply className="h-3 w-3" />
                    {language === 'hi' ? 'उत्तर' : 'Reply'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}