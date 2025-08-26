"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  ShoppingCart, 
  Heart,
  Share2,
  MapPin,
  Eye
} from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    currency: string;
    images: string[];
    rating: number;
    reviewCount: number;
    category: string;
    businessName: string;
    businessId: string;
    location: string;
    inStock: boolean;
    isNew?: boolean;
    isFeatured?: boolean;
    discount?: number;
  };
  variant?: 'default' | 'compact';
}

const ProductCard = ({ product, variant = 'default' }: ProductCardProps) => {
  const {
    id,
    name,
    description,
    price,
    originalPrice,
    currency,
    images,
    rating,
    reviewCount,
    category,
    businessName,
    businessId,
    location,
    inStock,
    isNew,
    isFeatured,
    discount
  } = product;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  if (variant === 'compact') {
    return (
      <Card className="group overflow-hidden bg-gradient-to-br from-card to-card/50 border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="relative">
          <img
            src={images[0]}
            alt={name}
            className="w-full h-32 object-cover"
          />
          <div className="absolute top-2 right-2 flex flex-col space-y-1">
            {!inStock && (
              <Badge variant="destructive" className="text-xs">
                Out of Stock
              </Badge>
            )}
            {discount && (
              <Badge variant="secondary" className="bg-accent text-accent-foreground text-xs">
                -{discount}%
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="p-3">
          <h3 className="font-semibold text-sm truncate">{name}</h3>
          <p className="text-xs text-muted-foreground mb-2">{category}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <span className="font-bold text-primary">{formatPrice(price)}</span>
              {originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1 text-xs">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{rating}</span>
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
          src={images[0]}
          alt={name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {isNew && (
            <Badge className="bg-success text-success-foreground shadow-lg">
              New
            </Badge>
          )}
          {isFeatured && (
            <Badge className="bg-accent text-accent-foreground shadow-lg">
              Featured
            </Badge>
          )}
          {discount && (
            <Badge variant="secondary" className="bg-destructive text-destructive-foreground shadow-lg">
              -{discount}% OFF
            </Badge>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button variant="secondary" size="icon" className="h-8 w-8 bg-background/80 hover:bg-background">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" className="h-8 w-8 bg-background/80 hover:bg-background">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" className="h-8 w-8 bg-background/80 hover:bg-background" asChild>
            <Link  href={`/product/${id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Stock status */}
        {!inStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg px-4 py-2">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="mb-3">
          <Badge variant="outline" className="mb-2">
            {category}
          </Badge>
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
            {name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {description}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">
              {formatPrice(price)}
            </span>
            {originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating}</span>
            <span className="text-muted-foreground">({reviewCount})</span>
          </div>
        </div>

        {/* Business info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <Link 
             href={`/business/${businessId}`}
            className="font-medium hover:text-primary transition-colors"
          >
            by {businessName}
          </Link>
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          asChild
        >
          <Link  href={`/product/${id}`}>
            View Details
          </Link>
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="flex-1"
          disabled={!inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;