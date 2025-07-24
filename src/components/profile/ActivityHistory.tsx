'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  MessageCircle,
  Heart,
  Search,
  Eye,
  Edit,
  Calendar,
  Filter,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { UserActivity } from '@/types';

interface ActivityHistoryProps {
  userId: string;
}

// Mock data - in real app, this would come from Firebase
const mockActivities: UserActivity[] = [
  {
    id: '1',
    userId: 'user1',
    type: 'item_saved',
    targetId: 'instructor1',
    targetType: 'instructor',
    metadata: {
      instructorName: 'Sarah Johnson',
      location: 'Monterey Bay, California, USA',
    },
    timestamp: new Date('2024-01-10T14:30:00') as any,
  },
  {
    id: '2',
    userId: 'user1',
    type: 'inquiry_sent',
    targetId: 'resort1',
    targetType: 'resort',
    metadata: {
      resortName: 'Paradise Diving Resort',
      location: 'North Malé Atoll, Maldives',
      inquiryType: 'package_info',
    },
    timestamp: new Date('2024-01-09T10:15:00') as any,
  },
  {
    id: '3',
    userId: 'user1',
    type: 'search_performed',
    metadata: {
      searchQuery: '제주도 다이빙',
      resultCount: 12,
      searchType: 'instructor',
    },
    timestamp: new Date('2024-01-08T16:45:00') as any,
  },
  {
    id: '4',
    userId: 'user1',
    type: 'profile_view',
    targetId: 'instructor2',
    targetType: 'instructor',
    metadata: {
      instructorName: 'Mike Rodriguez',
      location: 'Miami, Florida, USA',
    },
    timestamp: new Date('2024-01-07T11:20:00') as any,
  },
  {
    id: '5',
    userId: 'user1',
    type: 'profile_updated',
    metadata: {
      updatedFields: ['bio', 'location'],
      previousBio: '다이빙 초보자입니다.',
      newBio: '다이빙을 사랑하는 초보 다이버입니다.',
    },
    timestamp: new Date('2024-01-06T09:30:00') as any,
  },
  {
    id: '6',
    userId: 'user1',
    type: 'item_saved',
    targetId: 'resort2',
    targetType: 'resort',
    metadata: {
      resortName: 'Blue Horizon Dive Resort',
      location: 'Ambergris Caye, Belize',
    },
    timestamp: new Date('2024-01-05T13:10:00') as any,
  },
];

const activityTypeConfig = {
  item_saved: {
    icon: Heart,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    label: '항목 저장',
  },
  inquiry_sent: {
    icon: MessageCircle,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    label: '문의 발송',
  },
  search_performed: {
    icon: Search,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: '검색 수행',
  },
  profile_view: {
    icon: Eye,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    label: '프로필 조회',
  },
  profile_updated: {
    icon: Edit,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    label: '프로필 수정',
  },
};

export function ActivityHistory({ userId }: ActivityHistoryProps) {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('all');

  useEffect(() => {
    // Simulate API call
    const fetchActivities = async () => {
      setLoading(true);
      // In real app: const activities = await getUserActivities(userId);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setActivities(mockActivities);
      setLoading(false);
    };

    fetchActivities();
  }, [userId]);

  // Filter activities
  const filteredActivities = activities.filter((activity) => {
    const matchesType = filterType === 'all' || activity.type === filterType;

    let matchesTime = true;
    if (timeRange !== 'all') {
      const now = new Date();
      const activityDate = activity.timestamp.toDate();
      const daysDiff = Math.floor(
        (now.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (timeRange === 'week') {
        matchesTime = daysDiff <= 7;
      } else if (timeRange === 'month') {
        matchesTime = daysDiff <= 30;
      }
    }

    return matchesType && matchesTime;
  });

  // Calculate activity stats
  const activityStats = {
    total: activities.length,
    thisWeek: activities.filter((a) => {
      const daysDiff = Math.floor(
        (new Date().getTime() - a.timestamp.toDate().getTime()) /
          (1000 * 60 * 60 * 24)
      );
      return daysDiff <= 7;
    }).length,
    byType: Object.keys(activityTypeConfig).reduce((acc, type) => {
      acc[type] = activities.filter((a) => a.type === type).length;
      return acc;
    }, {} as Record<string, number>),
  };

  const formatActivityDescription = (activity: UserActivity) => {
    const config = activityTypeConfig[activity.type];

    switch (activity.type) {
      case 'item_saved':
        return `${
          activity.metadata?.instructorName || activity.metadata?.resortName
        }을(를) 저장했습니다`;
      case 'inquiry_sent':
        return `${
          activity.metadata?.resortName || activity.metadata?.instructorName
        }에게 문의를 보냈습니다`;
      case 'search_performed':
        return `"${activity.metadata?.searchQuery}"로 검색했습니다 (${activity.metadata?.resultCount}개 결과)`;
      case 'profile_view':
        return `${activity.metadata?.instructorName}의 프로필을 조회했습니다`;
      case 'profile_updated':
        return `프로필을 업데이트했습니다 (${activity.metadata?.updatedFields?.join(
          ', '
        )})`;
      default:
        return '활동을 수행했습니다';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              활동 내역
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse flex gap-4 p-4 border rounded-lg"
                >
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Activity Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            활동 통계
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {activityStats.total}
              </div>
              <div className="text-sm text-gray-600">총 활동</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {activityStats.thisWeek}
              </div>
              <div className="text-sm text-gray-600">이번 주</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {activityStats.byType.item_saved || 0}
              </div>
              <div className="text-sm text-gray-600">저장</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {activityStats.byType.inquiry_sent || 0}
              </div>
              <div className="text-sm text-gray-600">문의</div>
            </div>
          </div>

          {/* Activity Type Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {Object.entries(activityStats.byType).map(([type, count]) => {
              const config =
                activityTypeConfig[type as keyof typeof activityTypeConfig];
              return (
                <div
                  key={type}
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                >
                  <config.icon className={`h-4 w-4 ${config.color}`} />
                  <span className="text-sm text-gray-600">{config.label}</span>
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {count}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Activity History */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              최근 활동 ({filteredActivities.length})
            </CardTitle>

            {/* Filters */}
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">모든 활동</option>
                <option value="item_saved">저장</option>
                <option value="inquiry_sent">문의</option>
                <option value="search_performed">검색</option>
                <option value="profile_view">조회</option>
                <option value="profile_updated">수정</option>
              </select>

              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">전체 기간</option>
                <option value="week">최근 1주일</option>
                <option value="month">최근 1개월</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredActivities.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                활동 내역이 없습니다
              </h3>
              <p className="text-gray-600">
                {filterType !== 'all' || timeRange !== 'all'
                  ? '선택한 조건에 맞는 활동이 없습니다'
                  : '아직 활동 내역이 없습니다'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredActivities.map((activity) => {
                const config = activityTypeConfig[activity.type];
                const Icon = config.icon;

                return (
                  <div
                    key={activity.id}
                    className="flex gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 ${config.bgColor} rounded-full flex items-center justify-center`}
                    >
                      <Icon className={`h-5 w-5 ${config.color}`} />
                    </div>

                    <div className="flex-grow">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {formatActivityDescription(activity)}
                          </p>
                          {activity.metadata?.location && (
                            <p className="text-xs text-gray-500 mt-1">
                              📍 {activity.metadata.location}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            {activity.timestamp.toDate().toLocaleString()}
                          </p>
                        </div>

                        <Badge variant="outline" className="text-xs">
                          {config.label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
