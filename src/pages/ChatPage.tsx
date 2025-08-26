import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import {
  Search,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Image,
  File,
  Plus,
  Users,
  MessageCircle,
  Star,
  Archive,
  Settings
} from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
  fileUrl?: string;
  fileName?: string;
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  isGroup: boolean;
  type: 'business' | 'customer';
}

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAttachments, setShowAttachments] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data - will be replaced with API calls
  const chats: Chat[] = [
    {
      id: '1',
      name: 'Artisan Coffee Roasters',
      avatar: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&h=100&fit=crop',
      lastMessage: 'Thanks for your inquiry! Our Ethiopian blend is available.',
      lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
      unreadCount: 2,
      isOnline: true,
      isGroup: false,
      type: 'business'
    },
    {
      id: '2',
      name: 'Green Thumb Gardens',
      avatar: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&h=100&fit=crop',
      lastMessage: 'Perfect! We can schedule the consultation for next week.',
      lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
      unreadCount: 0,
      isOnline: false,
      isGroup: false,
      type: 'business'
    },
    {
      id: '3',
      name: 'Bay Area Marketplace',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3847ae2e4281?w=100&h=100&fit=crop',
      lastMessage: 'Sarah: Has anyone tried the new coffee shop downtown?',
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 5,
      isOnline: true,
      isGroup: true,
      type: 'customer'
    },
    {
      id: '4',
      name: 'Tech Repair Hub',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop',
      lastMessage: 'Your laptop repair is complete! Ready for pickup.',
      lastMessageTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
      unreadCount: 1,
      isOnline: true,
      isGroup: false,
      type: 'business'
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      senderId: 'business',
      text: 'Hello! Thanks for your interest in our Ethiopian coffee blend.',
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
      type: 'text'
    },
    {
      id: '2',
      senderId: 'me',
      text: 'Hi! I was wondering about the flavor profile and pricing.',
      timestamp: new Date(Date.now() - 18 * 60 * 1000),
      type: 'text'
    },
    {
      id: '3',
      senderId: 'business',
      text: 'Our Ethiopian blend has notes of chocolate and citrus with a smooth finish. It\'s $24.99 for a 12oz bag, but we have a 15% discount running this week!',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      type: 'text'
    },
    {
      id: '4',
      senderId: 'me',
      text: 'That sounds perfect! Can you tell me more about the roasting process?',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      type: 'text'
    },
    {
      id: '5',
      senderId: 'business',
      text: 'Absolutely! We roast our beans in small batches daily to ensure freshness. Each batch is carefully monitored to bring out the unique characteristics of the beans.',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type: 'text'
    }
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return;

    // Mock sending message - replace with actual API call
    console.log('Sending message:', message, 'to chat:', selectedChat);
    setMessage('');
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString();
  };

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-80 border-r bg-muted/30 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Messages</h1>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`w-full p-4 flex items-center space-x-3 hover:bg-muted/50 transition-colors border-b ${
                selectedChat === chat.id ? 'bg-primary/10' : ''
              }`}
            >
              <div className="relative">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {chat.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background"></div>
                )}
              </div>
              
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm truncate">{chat.name}</span>
                    {chat.type === 'business' && (
                      <Badge variant="secondary" className="text-xs">
                        Business
                      </Badge>
                    )}
                    {chat.isGroup && (
                      <Users className="h-3 w-3 text-muted-foreground" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(chat.lastMessageTime)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate flex-1">
                    {chat.lastMessage}
                  </p>
                  {chat.unreadCount > 0 && (
                    <Badge className="bg-primary text-primary-foreground text-xs ml-2">
                      {chat.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* New Chat Button */}
        <div className="p-4 border-t">
          <Button className="w-full" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New Conversation
          </Button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-background flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={chats.find(c => c.id === selectedChat)?.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {chats.find(c => c.id === selectedChat)?.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
                  )}
                </div>
                <div>
                  <h2 className="font-semibold">{chats.find(c => c.id === selectedChat)?.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {chats.find(c => c.id === selectedChat)?.isOnline ? 'Online' : 'Last seen recently'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.senderId === 'me'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.senderId === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {formatMessageTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              {showAttachments && (
                <div className="mb-3 flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Image className="h-4 w-4 mr-2" />
                    Photo
                  </Button>
                  <Button variant="outline" size="sm">
                    <File className="h-4 w-4 mr-2" />
                    Document
                  </Button>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAttachments(!showAttachments)}
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
                
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                  >
                    <Smile className="h-5 w-5" />
                  </Button>
                </div>
                
                <Button onClick={handleSendMessage} disabled={!message.trim()}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">
                Choose a conversation from the sidebar to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;