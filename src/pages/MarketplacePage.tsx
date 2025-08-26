import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/product/ProductCard';
import {
  Search,
  Filter,
  Grid3X3,
  List,
  SlidersHorizontal,
  MapPin,
  Star,
  DollarSign,
  Package,
  TrendingUp
} from 'lucide-react';

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevant');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - will be replaced with API calls
  const categories = [
    { id: 'all', name: 'All Categories', count: 1200 },
    { id: 'electronics', name: 'Electronics', count: 250 },
    { id: 'fashion', name: 'Fashion', count: 180 },
    { id: 'home', name: 'Home & Garden', count: 340 },
    { id: 'food', name: 'Food & Beverage', count: 120 },
    { id: 'health', name: 'Health & Beauty', count: 95 },
    { id: 'sports', name: 'Sports & Fitness', count: 160 },
    { id: 'books', name: 'Books & Media', count: 85 }
  ];

  const sortOptions = [
    { id: 'relevant', name: 'Most Relevant' },
    { id: 'newest', name: 'Newest First' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'popular', name: 'Most Popular' }
  ];

  const products = [
    {
      id: '1',
      name: 'Premium Ethiopian Coffee Blend',
      description: 'Single-origin coffee beans with rich chocolate and citrus notes, expertly roasted for the perfect cup.',
      price: 24.99,
      originalPrice: 29.99,
      currency: 'USD',
      images: ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop'],
      rating: 4.9,
      reviewCount: 89,
      category: 'Coffee',
      businessName: 'Artisan Coffee Roasters',
      businessId: '1',
      location: 'San Francisco, CA',
      inStock: true,
      isNew: true,
      discount: 17
    },
    {
      id: '2',
      name: 'Smart Plant Monitoring System',
      description: 'IoT device that tracks soil moisture, light levels, and plant health with mobile app integration.',
      price: 79.99,
      currency: 'USD',
      images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop'],
      rating: 4.6,
      reviewCount: 156,
      category: 'Smart Garden',
      businessName: 'Green Thumb Gardens',
      businessId: '2',
      location: 'Berkeley, CA',
      inStock: true,
      isFeatured: true
    },
    {
      id: '3',
      name: 'Wireless Charging Pad Pro',
      description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicators.',
      price: 49.99,
      originalPrice: 69.99,
      currency: 'USD',
      images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop'],
      rating: 4.5,
      reviewCount: 234,
      category: 'Electronics',
      businessName: 'Tech Repair Hub',
      businessId: '3',
      location: 'Palo Alto, CA',
      inStock: true,
      discount: 29
    },
    {
      id: '4',
      name: 'Handcrafted Ceramic Mug Set',
      description: 'Beautiful set of 4 ceramic mugs, handcrafted by local artisans. Perfect for coffee or tea lovers.',
      price: 32.99,
      currency: 'USD',
      images: ['https://madeinwashington.com/cdn/shop/products/3-09270-kj-pottery-white-and-smoke-mug.jpg?v=1680044722&width=800'],
      rating: 4.8,
      reviewCount: 67,
      category: 'Home Decor',
      businessName: 'Pottery Studio SF',
      businessId: '4',
      location: 'San Francisco, CA',
      inStock: true,
      isNew: true
    },
    {
      id: '5',
      name: 'Organic Face Serum',
      description: 'Natural anti-aging serum with vitamin C and hyaluronic acid. Cruelty-free and eco-friendly packaging.',
      price: 45.00,
      currency: 'USD',
      images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop'],
      rating: 4.7,
      reviewCount: 123,
      category: 'Beauty',
      businessName: 'Pure Beauty Co.',
      businessId: '5',
      location: 'Oakland, CA',
      inStock: false
    },
    {
      id: '6',
      name: 'Vintage Leather Messenger Bag',
      description: 'Genuine leather messenger bag with vintage styling. Perfect for work or casual use.',
      price: 89.99,
      originalPrice: 120.00,
      currency: 'USD',
      images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'],
      rating: 4.6,
      reviewCount: 198,
      category: 'Fashion',
      businessName: 'Leather Works Studio',
      businessId: '6',
      location: 'San Jose, CA',
      inStock: true,
      discount: 25
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           product.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Marketplace</h1>
              <p className="text-muted-foreground text-lg">
                Discover amazing products from local businesses
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative max-w-md lg:max-w-lg">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              {/* Categories */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Package className="h-4 w-4 mr-2" />
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{category.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {category.count}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Price Range */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Price Range
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${priceRange[0]} - ${priceRange[1]}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rating Filter */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Star className="h-4 w-4 mr-2" />
                    Rating
                  </h3>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span>& Up</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} of {products.length} products
                  {searchQuery && (
                    <span> for "{searchQuery}"</span>
                  )}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>

                {/* View Mode */}
                <div className="flex border border-input rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            {filteredProducts.length === 0 ? (
              <Card className="p-12 text-center">
                <CardContent>
                  <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or browse all categories.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? 'grid [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))] gap-6'
                  : 'space-y-4'
              }>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant={viewMode === 'list' ? 'compact' : 'default'}
                  />
                ))}
              </div>
            )}

            {/* Load More */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;