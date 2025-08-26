import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BusinessCard from '@/components/business/BusinessCard';
import {
  Search,
  MapPin,
  Filter,
  Grid3X3,
  List,
  Star,
  Clock,
  SlidersHorizontal,
  Building,
  Users,
  Verified
} from 'lucide-react';

const BusinessesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [onlyVerified, setOnlyVerified] = useState(false);

  // Mock data - will be replaced with API calls
  const categories = [
    { id: 'all', name: 'All Categories', count: 850 },
    { id: 'food', name: 'Food & Beverage', count: 180 },
    { id: 'retail', name: 'Retail & Shopping', count: 220 },
    { id: 'services', name: 'Professional Services', count: 140 },
    { id: 'health', name: 'Health & Wellness', count: 95 },
    { id: 'beauty', name: 'Beauty & Personal Care', count: 75 },
    { id: 'automotive', name: 'Automotive', count: 60 },
    { id: 'home', name: 'Home & Garden', count: 80 }
  ];

  const locations = [
    { id: 'all', name: 'All Locations', count: 850 },
    { id: 'sf', name: 'San Francisco', count: 320 },
    { id: 'oakland', name: 'Oakland', count: 180 },
    { id: 'berkeley', name: 'Berkeley', count: 120 },
    { id: 'palo-alto', name: 'Palo Alto', count: 90 },
    { id: 'san-jose', name: 'San Jose', count: 140 }
  ];

  const sortOptions = [
    { id: 'rating', name: 'Highest Rated' },
    { id: 'popular', name: 'Most Popular' },
    { id: 'newest', name: 'Newest First' },
    { id: 'nearest', name: 'Nearest to Me' },
    { id: 'alphabetical', name: 'A to Z' },
    { id: 'most-reviews', name: 'Most Reviews' }
  ];

  const businesses = [
    {
      id: '1',
      name: 'Artisan Coffee Roasters',
      description: 'Premium coffee beans roasted daily with passion and expertise. We source our beans directly from farmers and roast them to perfection.',
      category: 'Food & Beverage',
      rating: 4.8,
      reviewCount: 324,
      location: 'Downtown, San Francisco',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
      isOpen: true,
      followers: 1250,
      isVerified: true,
      socialMedia: { instagram: 'artisan_coffee', facebook: 'artisancoffee' }
    },
    {
      id: '2',
      name: 'Green Thumb Gardens',
      description: 'Sustainable gardening supplies and expert landscaping services. From seed to harvest, we help you grow.',
      category: 'Home & Garden',
      rating: 4.9,
      reviewCount: 187,
      location: 'Berkeley, CA',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      isOpen: true,
      followers: 890,
      isVerified: true,
      socialMedia: { instagram: 'greenthumbgardens' }
    },
    {
      id: '3',
      name: 'Tech Repair Hub',
      description: 'Fast and reliable electronics repair for all your devices. Phones, laptops, tablets - we fix them all.',
      category: 'Electronics',
      rating: 4.7,
      reviewCount: 445,
      location: 'Palo Alto, CA',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      isOpen: false,
      followers: 2100,
      isVerified: true,
      socialMedia: { facebook: 'techrepairhub', twitter: 'techrepairhub' }
    },
    {
      id: '4',
      name: 'Bella Vista Boutique',
      description: 'Curated fashion for the modern woman. Sustainable brands and timeless pieces that make you feel confident.',
      category: 'Fashion',
      rating: 4.6,
      reviewCount: 156,
      location: 'Union Square, San Francisco',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      isOpen: true,
      followers: 3200,
      isVerified: false,
      socialMedia: { instagram: 'bellavistaboutique', facebook: 'bellavistasf' }
    },
    {
      id: '5',
      name: 'Zen Wellness Spa',
      description: 'Holistic wellness treatments for mind, body, and soul. Experience tranquility in the heart of the city.',
      category: 'Health & Wellness',
      rating: 4.9,
      reviewCount: 298,
      location: 'Oakland, CA',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
      isOpen: true,
      followers: 1800,
      isVerified: true,
      socialMedia: { instagram: 'zenwellnessspa' }
    },
    {
      id: '6',
      name: 'Golden Gate Bakery',
      description: 'Fresh baked goods made daily with locally sourced ingredients. From croissants to custom cakes.',
      category: 'Food & Beverage',
      rating: 4.5,
      reviewCount: 567,
      location: 'Richmond District, San Francisco',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
      isOpen: true,
      followers: 2450,
      isVerified: true,
      socialMedia: { instagram: 'goldengatebakery', facebook: 'ggbakery' }
    }
  ];

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         business.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         business.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           business.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesLocation = locationFilter === 'all' || 
                           business.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesOpen = !onlyOpen || business.isOpen;
    const matchesVerified = !onlyVerified || business.isVerified;
    
    return matchesSearch && matchesCategory && matchesLocation && matchesOpen && matchesVerified;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Local Businesses</h1>
              <p className="text-muted-foreground text-lg">
                Connect with verified local businesses in your area
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative max-w-md lg:max-w-lg">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search businesses..."
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
              {/* Quick Filters */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Quick Filters</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={onlyOpen}
                        onChange={(e) => setOnlyOpen(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <Clock className="h-4 w-4 text-success" />
                      <span className="text-sm">Open Now</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={onlyVerified}
                        onChange={(e) => setOnlyVerified(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <Verified className="h-4 w-4 text-primary" />
                      <span className="text-sm">Verified Only</span>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Building className="h-4 w-4 mr-2" />
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

              {/* Locations */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Location
                  </h3>
                  <div className="space-y-2">
                    {locations.map((location) => (
                      <button
                        key={location.id}
                        onClick={() => setLocationFilter(location.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          locationFilter === location.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{location.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {location.count}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Rating Filter */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Star className="h-4 w-4 mr-2" />
                    Minimum Rating
                  </h3>
                  <div className="space-y-2">
                    {[5, 4, 3, 2].map((rating) => (
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
                  Showing {filteredBusinesses.length} of {businesses.length} businesses
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
            {filteredBusinesses.length === 0 ? (
              <Card className="p-12 text-center">
                <CardContent>
                  <Building className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No businesses found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or browse all categories.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {filteredBusinesses.map((business) => (
                  <BusinessCard
                    key={business.id}
                    business={business}
                    variant={viewMode === 'list' ? 'compact' : 'default'}
                  />
                ))}
              </div>
            )}

            {/* Load More */}
            {filteredBusinesses.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Businesses
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessesPage;