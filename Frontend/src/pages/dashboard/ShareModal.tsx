import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Linkedin, Link, MessageCircle, Mail } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  postContent: string;
  postId: string;
  language: string;
}

export default function ShareModal({ isOpen, onClose, postContent, postId, language }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const postUrl = `${window.location.origin}/post/${postId}`;
  const shareText = postContent.substring(0, 100) + (postContent.length > 100 ? '...' : '');

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      toast({
        title: language === 'hi' ? 'लिंक कॉपी हो गया' : 'Link copied',
        description: language === 'hi' ? 'पोस्ट का लिंक क्लिपबोर्ड में कॉपी हो गया' : 'Post link copied to clipboard'
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: language === 'hi' ? 'त्रुटि' : 'Error',
        description: language === 'hi' ? 'लिंक कॉपी नहीं हो सका' : 'Could not copy link',
        variant: 'destructive'
      });
    }
  };

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}&quote=${encodeURIComponent(shareText)}`
    },
    {
      name: 'Twitter',
      icon: Twitter, 
      color: 'text-blue-400',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(postUrl)}&hashtags=कृषि,agriculture,farming`
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'text-blue-700',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'text-green-600',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + postUrl)}`
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'text-gray-600',
      url: `mailto:?subject=${encodeURIComponent('कृषि-ग्राम से महत्वपूर्ण पोस्ट')}&body=${encodeURIComponent(shareText + '\n\n' + postUrl)}`
    }
  ];

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {language === 'hi' ? 'पोस्ट साझा करें' : 'Share Post'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Copy Link Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {language === 'hi' ? 'लिंक कॉपी करें' : 'Copy Link'}
            </label>
            <div className="flex gap-2">
              <Input 
                value={postUrl}
                readOnly
                className="flex-1 text-sm"
              />
              <Button 
                onClick={handleCopyLink}
                variant={copied ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
              >
                <Link className="h-4 w-4 mr-1" />
                {copied ? (language === 'hi' ? 'कॉपी हो गया' : 'Copied') : (language === 'hi' ? 'कॉपी' : 'Copy')}
              </Button>
            </div>
          </div>
          
          {/* Social Media Share Options */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {language === 'hi' ? 'सोशल मीडिया पर साझा करें' : 'Share on Social Media'}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((option) => (
                <Button
                  key={option.name}
                  onClick={() => handleShare(option.url)}
                  variant="outline"
                  className="flex items-center gap-2 justify-start h-12"
                >
                  <option.icon className={`h-5 w-5 ${option.color}`} />
                  <span className="text-sm">{option.name}</span>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Post Preview */}
          <div className="bg-muted rounded-lg p-3">
            <p className="text-sm text-muted-foreground mb-1">
              {language === 'hi' ? 'पोस्ट पूर्वावलोकन:' : 'Post preview:'}
            </p>
            <p className="text-sm line-clamp-3">{shareText}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}