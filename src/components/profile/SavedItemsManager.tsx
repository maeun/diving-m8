'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DefaultAvatar } from '@/components/ui/default-avatar';
import {
  Heart,
  Search,
  Filter,
  Calendar,
  MapPin,
  Eye,
  Trash2,
  ExternalLink,
  SortAsc,
} from 'lucide-react';
import { SavedItem, InstructorProfile, ResortProfile } from '@/types';

interface SavedItemsManagerProps {
  userId: string;
}

// Mock data - in real app, this would come from Firebase
const mockSavedItems: (SavedItem & {
  profile: InstructorProfile | ResortProfile;
})[] = [
  {
    id: '1',
    userId: 'user1',
    itemId: 'instructor1',
    itemType: 'instructor',
    savedAt: new Date('2024-01-10') as any,
    profile: {
      id: 'instructor1',
      userId: 'instructor_user1',
      name: 'Sarah Johnson',
      bio: 'Passionate diving instructor with over 8 years of experience.',
      location: { latitude: 37.7749, longitude: -122.4194 },
      address: 'Monterey Bay, California, USA',
      certifications: [],
      experience: 8,
      specialties: ['Underwater Photography', 'Night Diving'],
      languages: ['English', 'Spanish'],
      services: [
        {
          name: 'Open Water Certification',
          description: 'Complete PADI Open Water certification course',
          price: 450,
          currency: 'USD',
          duration: '3-4 days',
          maxParticipants: 4,
        },
      ],
      gallery: [],
      socialLinks: {},
      stats: { views: 1250, saves: 89, inquiries: 23 },
      isApproved: true,
      isActive: true,
      createdAt: new Date('2020-01-15') as any,
      updatedAt: new Date('2024-01-15') as any,
    } as InstructorProfile,
  },
  {
    id: '2',
    userId: 'user1',
    itemId: 'resort1',
    itemType: 'resort',
    savedAt: new Date('2024-01-08') as any,
    profile: {
      id: 'resort1',
      userId: 'resort_user1',
      name: 'Paradise Diving Resort',
      description: 'Experience world-class diving at our luxury resort.',
      location: { latitude: 4.1755, longitude: 73.5093 },
      address: 'North Malé Atoll, Maldives',
      facilities: ['PADI Dive Center', 'Equipment Rental', 'Nitrox Station'],
      services: [],
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
      ],
      gallery: [],
      socialLinks: {},
      stats: { views: 3420, saves: 156, inquiries: 67 },
      isApproved: true,
      isActive: true,
      createdAt: new Date('2019-06-01') as any,
      updatedAt: new Date('2024-01-15') as any,
    } as ResortProfile,
  },
  {
    id: '3',
    userId: 'user1',
    itemId: 'instructor2',
    itemType: 'instructor',
    savedAt: new Date('2024-01-05') as any,
    profile: {
      id: 'instructor2',
      userId: 'instructor_user2',
      name: 'Mike Rodriguez',
      bio: 'Technical diving specialist with 12 years of experience.',
      location: { latitude: 25.7617, longitude: -80.1918 },
      address: 'Miami, Florida, USA',
      certifications: [],
      experience: 12,
      specialties: ['Technical Diving', 'Cave Diving'],
      languages: ['English', 'Spanish'],
      services: [
        {
          name: 'Technical Diving Course',
          description: 'Advanced technical diving training',
          price: 800,
          currency: 'USD',
          duration: '5 days',
          maxParticipants: 3,
        },
      ],
      gallery: [],
      socialLinks: {},
      stats: { views: 890, saves: 67, inquiries: 15 },
      isApproved: true,
      isActive: true,
      createdAt: new Date('2019-05-10') as any,
      updatedAt: new Date('2024-01-10') as any,
    } as InstructorProfile,
  },
];

export function SavedItemsManager({ userId }: SavedItemsManagerProps) {
  const [savedItems, setSavedItems] = useState<
    (SavedItem & { profile: InstructorProfile | ResortProfile })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'instructor' | 'resort'>(
    'all'
  );
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'type'>('date');

  useEffect(() => {
    // Simulate API call
    const fetchSavedItems = async () => {
      setLoading(true);
      // In real app: const items = await getSavedItems(userId);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSavedItems(mockSavedItems);
      setLoading(false);
    };

    fetchSavedItems();
  }, [userId]);

  const handleRemoveItem = async (itemId: string) => {
    if (confirm('이 항목을 저장 목록에서 제거하시겠습니까?')) {
      try {
        // In real app: await removeSavedItem(itemId);
        setSavedItems((prev) => prev.filter((item) => item.id !== itemId));
      } catch (error) {
        console.error('항목 제거 실패:', error);
        alert('항목 제거에 실패했습니다.');
      }
    }
  };

  // Filter and sort items
  const filteredAndSortedItems = savedItems
    .filter((item) => {
      const matchesSearch =
        item.profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ('bio' in item.profile ? item.profile.bio : item.profile.description)
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesFilter =
        filterType === 'all' || item.itemType === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
        case 'name':
          return a.profile.name.localeCompare(b.profile.name);
        case 'type':
          return a.itemType.localeCompare(b.itemType);
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            저장된 항목
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex gap-4 p-4 border rounded-lg">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            저장된 항목 ({filteredAndSortedItems.length})
          </CardTitle>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-48"
              />
            </div>

            {/* Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">전체</option>
              <option value="instructor">강사</option>
              <option value="resort">리조트</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="date">저장일순</option>
              <option value="name">이름순</option>
              <option value="type">유형순</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredAndSortedItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery || filterType !== 'all'
                ? '검색 결과가 없습니다'
                : '저장된 항목이 없습니다'}
            </h3>
            <p className="text-gray-600">
              {searchQuery || filterType !== 'all'
                ? '다른 검색어나 필터를 시도해보세요'
                : '관심 있는 강사나 리조트를 저장해보세요'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedItems.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <DefaultAvatar
                      type={item.itemType}
                      name={item.profile.name}
                      size="md"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {item.profile.name}
                          </h3>
                          <Badge
                            variant={
                              item.itemType === 'instructor'
                                ? 'default'
                                : 'secondary'
                            }
                            className="text-xs"
                          >
                            {item.itemType === 'instructor' ? '강사' : '리조트'}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">
                            {item.profile.address}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {'bio' in item.profile
                            ? item.profile.bio
                            : item.profile.description}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              저장일:{' '}
                              {new Date(item.savedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>
                              조회수 {item.profile.stats.views.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link
                          href={`/${item.itemType}/${item.itemId}`}
                          className="inline-flex"
                        >
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            보기
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
