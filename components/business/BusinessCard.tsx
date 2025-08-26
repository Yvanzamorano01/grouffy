"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  MessageCircle,
  ExternalLink,
  Heart,
  Share2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BusinessCardProps {
  business: {
    id: string;
    name: string;
    description: string;
    category: string;
    rating: number;
    reviewCount: number;
    location: string;
    image: string;
    isOpen: boolean;
    followers: number;
    isVerified: boolean;
    socialMedia: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
    };
  };
  variant?: 'default' | 'compact';
}

const BusinessCard = ({ business, variant = 'default' }: BusinessCardProps) => {
  const {
    id,
    name,
    description,
    category,
    rating,
    reviewCount,
    location,
    image,
    isOpen,
    followers,
    isVerified,
    socialMedia
  } = business;

  if (variant === 'compact') {
    return (
      <Card className="group overflow-hidden bg-gradient-to-br from-card to-card/50 border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-32 object-cover"
          />
          <div className="absolute top-2 right-2 flex space-x-1">
            {isVerified && (
              <Badge variant="secondary" className="bg-success text-success-foreground">
                Verified
              </Badge>
            )}
            <Badge variant={isOpen ? 'default' : 'secondary'}>
              {isOpen ? 'Open' : 'Closed'}
            </Badge>
          </div>
        </div>
        <CardContent className="p-3">
          <h3 className="font-semibold text-sm truncate">{name}</h3>
          <p className="text-xs text-muted-foreground mb-2">{category}</p>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{rating}</span>
              <span className="text-muted-foreground">({reviewCount})</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{followers}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden bg-gradient-to-br from-card to-card/50 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          {isVerified && (
            <Badge className="bg-success text-success-foreground shadow-lg">
              ✓ Verified
            </Badge>
          )}
          <Badge 
            variant={isOpen ? 'default' : 'secondary'}
            className={cn(
              "shadow-lg",
              isOpen ? "bg-success text-success-foreground" : ""
            )}
          >
            <Clock className="h-3 w-3 mr-1" />
            {isOpen ? 'Open Now' : 'Closed'}
          </Badge>
        </div>
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-background/80 text-foreground shadow-lg">
            {category}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-1">
              {name}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{rating}</span>
                <span>({reviewCount} reviews)</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{followers} followers</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-4">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>

        {/* Social Media Links */}
        {Object.keys(socialMedia).length > 0 && (
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-xs text-muted-foreground">Social:</span>
            {socialMedia.instagram && (
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <ExternalLink className="h-3 w-3" />
              </Button>
            )}
            {socialMedia.facebook && (
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <ExternalLink className="h-3 w-3" />
              </Button>
            )}
            {socialMedia.twitter && (
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <ExternalLink className="h-3 w-3" />
              </Button>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0 flex space-x-2">
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <Link  href={`/business/${id}`}>
            View Profile
          </Link>
        </Button>
        <Button variant="default" size="sm" className="flex-1">
          <MessageCircle className="h-4 w-4 mr-2" />
          Chat
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BusinessCard;