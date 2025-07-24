'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardSkeleton } from '@/components/ui/card-skeleton';
import { DefaultAvatar } from '@/components/ui/default-avatar';
import {
  MapPin,
  Wifi,
  Car,
  Utensils,
  Waves,
  Camera,
  Video,
  Globe,
  Instagram,
  Facebook,
  Youtube,
  ExternalLink,
  MessageCircle,
  Heart,
  Share2,
  CheckCircle,
  XCircle,
  DollarSign,
  Twitter,
  Music,
  Eye,
} from 'lucide-react';
import { ResortProfile } from '@/types';
import { Timestamp } from 'firebase/firestore';

interface ResortProfileViewProps {
  resortId: string;
}

// Mock data - in real app, this would come from Firebase
const mockResortData: ResortProfile = {
  id: '1',
  userId: 'resort1',
  name: 'Paradise Diving Resort',
  description:
    'Experience world-class diving at our luxury resort located in the heart of the Maldives. With pristine coral reefs just steps from your villa, crystal-clear waters, and abundant marine life, Paradise Diving Resort offers the ultimate underwater adventure. Our resort features modern amenities, expert dive guides, and packages suitable for all skill levels.',
  location: {
    latitude: 4.1755,
    longitude: 73.5093,
  },
  address: 'North Malé Atoll, Maldives',
  facilities: [
    'PADI Dive Center',
    'Equipment Rental',
    'Nitrox Station',
    'Underwater Photography Studio',
    'Spa & Wellness Center',
    'Infinity Pool',
    'Beach Bar & Restaurant',
    'WiFi Throughout Resort',
    'Airport Transfer',
    'Laundry Service',
  ],
  services: [
    {
      name: 'Equipment Rental',
      description: 'Full range of diving equipment available for rent',
      isIncluded: false,
    },
    {
      name: 'Dive Guide Services',
      description: 'Professional dive guides for all excursions',
      isIncluded: true,
    },
    {
      name: 'Nitrox Fills',
      description: 'Enriched air nitrox available',
      isIncluded: false,
    },
    {
      name: 'Underwater Photography',
      description: 'Professional underwater photography services',
      isIncluded: false,
    },
    {
      name: 'Airport Transfers',
      description: 'Round-trip transfers from Malé Airport',
      isIncluded: true,
    },
    {
      name: 'All Meals',
      description: 'Breakfast, lunch, and dinner included',
      isIncluded: true,
    },
  ],
  packages: [
    {
      name: 'Beginner Diver Package',
      description:
        'Perfect for new divers with Open Water certification course and guided dives',
      price: 1200,
      currency: 'USD',
      duration: '5 days / 4 nights',
      inclusions: [
        '4 nights accommodation',
        'All meals',
        'PADI Open Water course',
        '6 guided dives',
        'Equipment rental',
        'Airport transfers',
      ],
      exclusions: [
        'International flights',
        'Alcoholic beverages',
        'Spa treatments',
        'Underwater photography',
      ],
    },
    {
      name: 'Advanced Diver Package',
      description:
        'For certified divers seeking adventure with night dives and wreck exploration',
      price: 1800,
      currency: 'USD',
      duration: '7 days / 6 nights',
      inclusions: [
        '6 nights accommodation',
        'All meals',
        '12 guided dives',
        '2 night dives',
        'Wreck dive excursion',
        'Equipment rental',
        'Nitrox certification',
        'Airport transfers',
      ],
      exclusions: [
        'International flights',
        'Alcoholic beverages',
        'Spa treatments',
      ],
    },
    {
      name: 'Photography Enthusiast Package',
      description:
        'Specialized package for underwater photographers with equipment and guidance',
      price: 2500,
      currency: 'USD',
      duration: '10 days / 9 nights',
      inclusions: [
        '9 nights accommodation',
        'All meals',
        '18 guided photo dives',
        'Underwater camera rental',
        'Photography workshop',
        'Photo editing session',
        'Equipment rental',
        'Airport transfers',
      ],
      exclusions: [
        'International flights',
        'Personal camera equipment',
        'Alcoholic beverages',
      ],
    },
  ],
  gallery: [
    {
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
      type: 'image',
      caption: 'Resort overview with crystal clear waters',
      order: 0,
    },
    {
      url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600',
      type: 'image',
      caption: 'Luxury overwater villas',
      order: 1,
    },
    {
      url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
      type: 'image',
      caption: 'Vibrant coral reef diving',
      order: 2,
    },
    {
      url: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600',
      type: 'image',
      caption: 'Marine life encounters',
      order: 3,
    },
    {
      url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600',
      type: 'image',
      caption: 'Professional dive instruction',
      order: 4,
    },
    {
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
      type: 'image',
      caption: 'Sunset dining experience',
      order: 5,
    },
  ],
  socialLinks: {
    instagram: 'https://instagram.com/paradisedivingresort',
    facebook: 'https://facebook.com/paradisedivingresort',
    youtube: 'https://youtube.com/c/paradisedivingresort',
    website: 'https://paradisedivingresort.com',
    twitter: 'https://twitter.com/paradisediving',
    tiktok: 'https://tiktok.com/@paradisedivingresort',
  },
  stats: {
    views: 3420,
    saves: 156,
    inquiries: 67,
  },
  isApproved: true,
  isActive: true,
  createdAt: Timestamp.fromDate(new Date('2019-06-01')),
  updatedAt: Timestamp.fromDate(new Date('2024-01-15')),
};

export function ResortProfileView({ resortId }: ResortProfileViewProps) {
  const [resort, setResort] = useState<ResortProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchResort = async () => {
      setLoading(true);
      // In real app: const resort = await getResortById(resortId);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading
      setResort(mockResortData);
      setLoading(false);
    };

    fetchResort();
  }, [resortId]);

  const handleSave = () => {
    setIsSaved(!isSaved);
    // In real app: save/unsave resort
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${resort?.name} - Diving Resort`,
        text: resort?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleContact = () => {
    // In real app: open contact modal or redirect to messaging
    alert('Contact feature would be implemented here');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <CardSkeleton />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <CardSkeleton />
              <CardSkeleton />
            </div>
            <div className="space-y-6">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!resort) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <h2 className="text-xl font-semibold mb-2">
              리조트를 찾을 수 없습니다
            </h2>
            <p className="text-gray-600">
              찾고 계신 리조트 프로필이 존재하지 않습니다.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        {/* Header Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Resort Image */}
              <div className="flex-shrink-0">
                <DefaultAvatar type="resort" name={resort.name} size="xl" />
              </div>

              {/* Basic Info */}
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {resort.name}
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{resort.address}</span>
                    </div>
                    {/* Spacing */}
                    <div className="h-3"></div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSave}
                      className={
                        isSaved ? 'text-red-600 border-red-600 bg-red-50' : ''
                      }
                    >
                      <Heart
                        className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`}
                      />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={handleContact}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      연락하기
                    </Button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 mt-4 leading-relaxed">
                  {resort.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Packages */}
            <Card>
              <CardHeader>
                <CardTitle>다이빙 패키지</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {resort.packages.map((pkg, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-xl">{pkg.name}</h3>
                        <p className="text-gray-600 mt-1">{pkg.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          ${pkg.price} {pkg.currency}
                        </div>
                        <div className="text-sm text-gray-500">
                          {pkg.duration}
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Inclusions */}
                      <div>
                        <h4 className="font-medium text-green-700 mb-2 flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" />
                          포함 사항
                        </h4>
                        <ul className="space-y-1">
                          {pkg.inclusions.map((inclusion, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-gray-600 flex items-start gap-2"
                            >
                              <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                              {inclusion}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Exclusions */}
                      <div>
                        <h4 className="font-medium text-red-700 mb-2 flex items-center gap-1">
                          <XCircle className="h-4 w-4" />
                          불포함 사항
                        </h4>
                        <ul className="space-y-1">
                          {pkg.exclusions.map((exclusion, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-gray-600 flex items-start gap-2"
                            >
                              <XCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                              {exclusion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Gallery */}
            <Card>
              <CardHeader>
                <CardTitle>갤러리</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resort.gallery.map((media, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={media.url}
                          alt={media.caption || `Gallery image ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Facilities */}
            <Card>
              <CardHeader>
                <CardTitle>시설</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {resort.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-2 p-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{facility}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle>서비스</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {resort.services.map((service, index) => (
                  <div key={index} className="flex items-start gap-3 p-2">
                    {service.isIncluded ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <DollarSign className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <h4 className="font-medium text-sm">{service.name}</h4>
                      <p className="text-xs text-gray-600">
                        {service.description}
                      </p>
                      <span className="text-xs text-gray-500">
                        {service.isIncluded ? '포함' : '추가 비용'}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>소셜 미디어</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {resort.socialLinks.website && (
                  <a
                    href={resort.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Globe className="h-5 w-5 text-gray-600" />
                    <span>Website</span>
                    <ExternalLink className="h-4 w-4 ml-auto text-gray-400" />
                  </a>
                )}
                {resort.socialLinks.instagram && (
                  <a
                    href={resort.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Instagram className="h-5 w-5 text-pink-600" />
                    <span>Instagram</span>
                    <ExternalLink className="h-4 w-4 ml-auto text-gray-400" />
                  </a>
                )}
                {resort.socialLinks.facebook && (
                  <a
                    href={resort.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Facebook className="h-5 w-5 text-blue-600" />
                    <span>Facebook</span>
                    <ExternalLink className="h-4 w-4 ml-auto text-gray-400" />
                  </a>
                )}
                {resort.socialLinks.youtube && (
                  <a
                    href={resort.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Youtube className="h-5 w-5 text-red-600" />
                    <span>YouTube</span>
                    <ExternalLink className="h-4 w-4 ml-auto text-gray-400" />
                  </a>
                )}
                {resort.socialLinks.twitter && (
                  <a
                    href={resort.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Twitter className="h-5 w-5 text-blue-500" />
                    <span>X (Twitter)</span>
                    <ExternalLink className="h-4 w-4 ml-auto text-gray-400" />
                  </a>
                )}
                {resort.socialLinks.tiktok && (
                  <a
                    href={resort.socialLinks.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Music className="h-5 w-5 text-black" />
                    <span>TikTok</span>
                    <ExternalLink className="h-4 w-4 ml-auto text-gray-400" />
                  </a>
                )}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>프로필 통계</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">조회수</span>
                  <span className="font-medium">
                    {resort.stats.views.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">저장수</span>
                  <span className="font-medium">{resort.stats.saves}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
