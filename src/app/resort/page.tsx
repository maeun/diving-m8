'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  SearchFilters,
  SearchFiltersState,
} from '@/components/search/SearchFilters';
import { SearchResults } from '@/components/search/SearchResults';
import { ResortProfile } from '@/types';
import { Timestamp } from 'firebase/firestore';

// Mock data - in real app, this would come from Firebase
const mockResorts: ResortProfile[] = [
  {
    id: '1',
    userId: 'resort1',
    name: 'Paradise Diving Resort',
    description:
      'Experience world-class diving at our luxury resort located in the heart of the Maldives. With pristine coral reefs just steps from your villa.',
    location: { latitude: 4.1755, longitude: 73.5093 },
    address: 'North Malé Atoll, Maldives',
    facilities: [
      'PADI Dive Center',
      'Equipment Rental',
      'Nitrox Station',
      'Spa & Wellness Center',
      'Infinity Pool',
      'Beach Bar & Restaurant',
    ],
    services: [
      {
        name: 'Equipment Rental',
        description: 'Full range of diving equipment',
        isIncluded: false,
      },
      {
        name: 'Dive Guide Services',
        description: 'Professional dive guides',
        isIncluded: true,
      },
    ],
    packages: [
      {
        name: 'Beginner Package',
        description: 'Perfect for new divers',
        price: 1200,
        currency: 'USD',
        duration: '5 days',
        inclusions: ['Accommodation', 'Meals'],
        exclusions: ['Flights'],
      },
      {
        name: 'Advanced Package',
        description: 'For certified divers',
        price: 1800,
        currency: 'USD',
        duration: '7 days',
        inclusions: ['Accommodation', 'Meals', 'Dives'],
        exclusions: ['Flights'],
      },
    ],
    gallery: [],
    socialLinks: { website: 'https://paradisedivingresort.com' },
    stats: { views: 3420, saves: 156, inquiries: 67 },
    isApproved: true,
    isActive: true,
    createdAt: Timestamp.fromDate(new Date('2019-06-01')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-15')),
  },
  {
    id: '2',
    userId: 'resort2',
    name: 'Blue Horizon Dive Resort',
    description:
      'Located on the beautiful coast of Belize, offering world-class diving experiences with the famous Blue Hole nearby.',
    location: { latitude: 16.7, longitude: -88.1 },
    address: 'Ambergris Caye, Belize',
    facilities: [
      'PADI 5-Star Dive Center',
      'Equipment Rental',
      'Nitrox Station',
      'Restaurant',
      'Bar',
      'WiFi',
    ],
    services: [
      {
        name: 'Blue Hole Trips',
        description: 'Trips to the famous Blue Hole',
        isIncluded: false,
      },
      {
        name: 'Reef Diving',
        description: 'Barrier reef diving',
        isIncluded: true,
      },
    ],
    packages: [
      {
        name: 'Blue Hole Explorer',
        description: 'Experience the famous Blue Hole',
        price: 2200,
        currency: 'USD',
        duration: '6 days',
        inclusions: ['Accommodation', 'Meals', 'Blue Hole Trip'],
        exclusions: ['Flights', 'Equipment'],
      },
      {
        name: 'Reef Discovery',
        description: 'Explore the barrier reef',
        price: 1500,
        currency: 'USD',
        duration: '5 days',
        inclusions: ['Accommodation', 'Meals', 'Reef Dives'],
        exclusions: ['Flights'],
      },
    ],
    gallery: [],
    socialLinks: { instagram: 'https://instagram.com/bluehorizondive' },
    stats: { views: 2890, saves: 134, inquiries: 52 },
    isApproved: true,
    isActive: true,
    createdAt: Timestamp.fromDate(new Date('2020-03-15')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-12')),
  },
  {
    id: '3',
    userId: 'resort3',
    name: 'Coral Garden Resort',
    description:
      'Eco-friendly resort in the Philippines focused on marine conservation and sustainable diving practices.',
    location: { latitude: 9.5, longitude: 123.3 },
    address: 'Bohol, Philippines',
    facilities: [
      'Eco Dive Center',
      'Marine Conservation Lab',
      'Organic Restaurant',
      'Solar Power',
      'Reef Restoration',
    ],
    services: [
      {
        name: 'Conservation Diving',
        description: 'Participate in reef restoration',
        isIncluded: true,
      },
      {
        name: 'Marine Biology Tours',
        description: 'Educational marine tours',
        isIncluded: true,
      },
    ],
    packages: [
      {
        name: 'Eco Warrior Package',
        description: 'Diving with conservation focus',
        price: 900,
        currency: 'USD',
        duration: '4 days',
        inclusions: ['Accommodation', 'Meals', 'Conservation Activities'],
        exclusions: ['Flights', 'Alcohol'],
      },
      {
        name: 'Marine Biologist Experience',
        description: 'Learn marine biology while diving',
        price: 1100,
        currency: 'USD',
        duration: '5 days',
        inclusions: ['Accommodation', 'Meals', 'Research Activities'],
        exclusions: ['Flights'],
      },
    ],
    gallery: [],
    socialLinks: {
      website: 'https://coralgardenresort.com',
      facebook: 'https://facebook.com/coralgardenresort',
    },
    stats: { views: 1750, saves: 98, inquiries: 34 },
    isApproved: true,
    isActive: true,
    createdAt: Timestamp.fromDate(new Date('2021-01-20')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-18')),
  },
];

export default function ResortsPage() {
  const [filters, setFilters] = useState<SearchFiltersState>({
    query: '',
    location: '',
    specialties: [],
    priceRange: [0, 5000],
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('views');
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort results
  const filteredResults = useMemo(() => {
    let results = [...mockResorts];

    // Apply filters
    if (filters.query) {
      results = results.filter(
        (resort) =>
          resort.name.toLowerCase().includes(filters.query.toLowerCase()) ||
          resort.description
            .toLowerCase()
            .includes(filters.query.toLowerCase()) ||
          resort.address.toLowerCase().includes(filters.query.toLowerCase())
      );
    }

    if (filters.location) {
      results = results.filter((resort) =>
        resort.address.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.specialties.length > 0) {
      results = results.filter((resort) =>
        filters.specialties.some((facility) =>
          resort.facilities.some((f) =>
            f.toLowerCase().includes(facility.toLowerCase())
          )
        )
      );
    }

    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000) {
      results = results.filter((resort) => {
        const minPrice = Math.min(...resort.packages.map((p) => p.price));
        return (
          minPrice >= filters.priceRange[0] && minPrice <= filters.priceRange[1]
        );
      });
    }

    // Apply sorting
    results.sort((a, b) => {
      switch (sortBy) {
        case 'views':
          return b.stats.views - a.stats.views;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return results;
  }, [filters, sortBy]);

  const handleSave = (resortId: string) => {
    setSavedItems((prev) =>
      prev.includes(resortId)
        ? prev.filter((id) => id !== resortId)
        : [...prev, resortId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            다이빙 리조트 찾기
          </h1>
          <p className="text-gray-600">
            멋진 다이빙 리조트를 찾아 다음 수중 모험을 계획해보세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              type="resort"
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <SearchResults
              type="resort"
              results={filteredResults}
              loading={loading}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onSave={handleSave}
              savedItems={savedItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
