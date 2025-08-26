"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BusinessCard from "@/components/business/BusinessCard";
import ProductCard from "@/components/product/ProductCard";
import {
  Search,
  TrendingUp,
  Users,
  ShoppingBag,
  MessageCircle,
  Star,
  ArrowRight,
  Zap,
  
  Shield,
  Globe,
} from "lucide-react";

const heroImage = "/assets/hero-image.png";

/* -------------------- animations helpers -------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function useCountUp(to: number, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.floor(p * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return val;
}

function AnimatedStat({ value }: { value: string }) {
  // "25,000+" | "2M+" | "4.8"
  const m = value.match(/^([0-9,.]+)([KM]?)(\+)?$/i);
  if (!m) return <>{value}</>;
  const base = parseFloat(m[1].replace(/,/g, ""));
  const multiplier =
    m[2]?.toUpperCase() === "M" ? 1_000_000 : m[2]?.toUpperCase() === "K" ? 1_000 : 1;
  const target = Math.round(base * multiplier);
  const n = useCountUp(target);
  const formatted = Intl.NumberFormat().format(n);
  return (
    <>
      {formatted}
      {m[2] ? (n >= target ? m[2].toUpperCase() : "") : ""}
      {m[3] ? "+" : ""}
    </>
  );
}

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - replace via API
  const featuredBusinesses = [
    {
      id: "1",
      name: "Artisan Coffee Roasters",
      description: "Premium coffee beans roasted daily with passion and expertise.",
      category: "Food & Beverage",
      rating: 4.8,
      reviewCount: 324,
      location: "Downtown, San Francisco",
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
      isOpen: true,
      followers: 1250,
      isVerified: true,
      socialMedia: { instagram: "artisan_coffee", facebook: "artisancoffee" },
    },
    {
      id: "2",
      name: "Green Thumb Gardens",
      description: "Sustainable gardening supplies and expert landscaping services.",
      category: "Home & Garden",
      rating: 4.9,
      reviewCount: 187,
      location: "Berkeley, CA",
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
      isOpen: true,
      followers: 890,
      isVerified: true,
      socialMedia: { instagram: "greenthumbgardens" },
    },
    {
      id: "3",
      name: "Tech Repair Hub",
      description: "Fast and reliable electronics repair for all your devices.",
      category: "Electronics",
      rating: 4.7,
      reviewCount: 445,
      location: "Palo Alto, CA",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      isOpen: false,
      followers: 2100,
      isVerified: true,
      socialMedia: { facebook: "techrepairhub", twitter: "techrepairhub" },
    },
  ];

  const featuredProducts = [
    {
      id: "1",
      name: "Premium Ethiopian Blend",
      description: "Single-origin coffee with notes of chocolate and citrus.",
      price: 24.99,
      originalPrice: 29.99,
      currency: "USD",
      images: [
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
      ],
      rating: 4.9,
      reviewCount: 89,
      category: "Coffee",
      businessName: "Artisan Coffee Roasters",
      businessId: "1",
      location: "San Francisco, CA",
      inStock: true,
      isNew: true,
      discount: 17,
    },
    {
      id: "2",
      name: "Smart Plant Monitor",
      description: "IoT device that monitors soil moisture and plant health.",
      price: 79.99,
      currency: "USD",
      images: [
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      ],
      rating: 4.6,
      reviewCount: 156,
      category: "Smart Garden",
      businessName: "Green Thumb Gardens",
      businessId: "2",
      location: "Berkeley, CA",
      inStock: true,
      isFeatured: true,
    },
  ];

  const stats = [
    { icon: Users, label: "Active Businesses", value: "25,000+" },
    { icon: ShoppingBag, label: "Products Listed", value: "500,000+" },
    { icon: MessageCircle, label: "Messages Exchanged", value: "2M+" },
    { icon: Star, label: "Average Rating", value: "4.8" },
  ];

  const features = [
    {
      icon: Search,
      title: "Smart Discovery",
      description:
        "Find exactly what you need with our AI-powered search and recommendation engine.",
    },
    {
      icon: MessageCircle,
      title: "Direct Communication",
      description:
        "Chat directly with business owners and get personalized service and support.",
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description:
        "Shop with confidence using our secure payment system and buyer protection.",
    },
    {
      icon: Globe,
      title: "Local & Global",
      description:
        "Connect with businesses in your neighborhood or discover unique finds worldwide.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>

        {/* animated blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-10 -left-5 h-56 w-56 rounded-full bg-primary/30 blur-3xl animate-blob"></div>
          <div className="animation-delay-2s absolute -bottom-10 -right-5 h-56 w-56 rounded-full bg-secondary/30 blur-3xl animate-blob"></div>
          <div className="animation-delay-4s absolute top-[30%] right-[20%] h-56 w-56 rounded-full bg-accent/30 blur-3xl animate-blob"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-accent text-accent-foreground">
                  <Zap className="mr-1 h-3 w-3" />
                  New Platform Launch
                </Badge>
                <motion.h1
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
                >
                  Connect. Discover.
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {" "}
                    Shop Local.
                  </span>
                </motion.h1>
                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  className="max-w-lg text-xl text-muted-foreground"
                >
                  Grouffy brings businesses and customers together in a vibrant social
                  marketplace. Discover local gems, connect directly with sellers, and
                  shop with confidence.
                </motion.p>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search businesses, products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background/80 px-4 py-4 pl-12 text-lg shadow-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button size="sm" className="absolute right-2 top-1/2 -translate-y-1/2" variant="hero">
                  Search
                </Button>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="btn-shine text-lg px-8" variant="hero" asChild>
                  <Link href="/marketplace">
                    Explore Marketplace
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                  <Link href="/business">List Your Business</Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 pt-8 md:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="mb-2 flex justify-center">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      <AnimatedStat value={stat.value} />
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <motion.img
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                src={heroImage}
                alt="Grouffy marketplace connecting businesses and customers"
                className="h-[500px] w-full rounded-2xl object-cover shadow-2xl"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-muted/30 py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Why Choose <span className="text-primary">Grouffy</span>?
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
              We're revolutionizing how businesses and customers connect, making
              commerce more personal and community-driven.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-card to-card/50 border-0 p-6 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-primary/10 p-3">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Businesses */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Featured Businesses</h2>
              <p className="text-xl text-muted-foreground">
                Discover verified local businesses in your area
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/businesses">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-muted/30 py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Trending Products</h2>
              <p className="text-xl text-muted-foreground">
                Popular items from local businesses
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/marketplace">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-gradient-to-r from-primary to-secondary py-20"
      >
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Ready to Join the Community?
            </h2>
            <p className="text-white/90 text-xl">
              Whether you're a business owner or a customer, Grouffy has something for
              you. Join thousands of others already connecting and growing together.
            </p>
            <div className="flex flex-col justify-center gap-4 pt-6 sm:flex-row">
              <Button size="lg" variant="secondary" className="px-8 text-lg" asChild>
                <Link href="/signup">Sign Up Free</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white px-8 text-lg text-black hover:bg-white hover:text-primary"
                asChild
              >
                <Link href="/business">List Your Business</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
