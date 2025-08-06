'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardSkeleton } from '@/components/ui/card-skeleton';
import {
  User,
  Settings,
  Heart,
  MessageCircle,
  Eye,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Edit,
  Shield,
  Bell,
  Globe,
  Building2,
} from 'lucide-react';
import { UserProfile, SavedItem, UserActivity } from '@/types';

interface UserProfileViewProps {
  userId: string;
}

// Mock data - in real app, this would come from Firebase
const mockUserProfile: UserProfile = {
  id: '1',
  userId: 'user1',
  displayName: '김다이버',
  email: 'kim.diver@example.com',
  phoneNumber: '+82-10-1234-5678',
  profilePicture:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  bio: '다이빙을 사랑하는 초보 다이버입니다. 새로운 다이빙 스팟을 찾고 있어요!',
  location: {
    city: '서울',
    country: '대한민국',
  },
  preferences: {
    language: 'ko',
    currency: 'KRW',
    notifications: {
      email: true,
      push: true,
      marketing: false,
      inquiryUpdates: true,
      newListings: true,
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      allowDirectContact: true,
    },
  },
  stats: {
    savedItems: 12,
    inquiriesSent: 5,
    profileViews: 89,
    accountAge: 45,
  },
  createdAt: new Date('2024-01-01') as any,
  updatedAt: new Date('2024-01-15') as any,
};

const mockSavedItems: SavedItem[] = [
  {
    id: '1',
    userId: 'user1',
    itemId: 'instructor1',
    itemType: 'instructor',
    savedAt: new Date('2024-01-10') as any,
  },
  {
    id: '2',
    userId: 'user1',
    itemId: 'resort1',
    itemType: 'resort',
    savedAt: new Date('2024-01-08') as any,
  },
];

const mockActivities: UserActivity[] = [
  {
    id: '1',
    userId: 'user1',
    type: 'item_saved',
    targetId: 'instructor1',
    targetType: 'instructor',
    metadata: { instructorName: 'Sarah Johnson' },
    timestamp: new Date('2024-01-10') as any,
  },
  {
    id: '2',
    userId: 'user1',
    type: 'inquiry_sent',
    targetId: 'resort1',
    targetType: 'resort',
    metadata: { resortName: 'Paradise Diving Resort' },
    timestamp: new Date('2024-01-09') as any,
  },
];

export function UserProfileView({ userId }: UserProfileViewProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'saved' | 'activity' | 'verification' | 'settings'
  >('overview');

  useEffect(() => {
    // Simulate API call
    const fetchUserProfile = async () => {
      setLoading(true);
      // In real app: const profile = await getUserProfile(userId);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading
      setProfile(mockUserProfile);
      setSavedItems(mockSavedItems);
      setActivities(mockActivities);
      setLoading(false);
    };

    fetchUserProfile();
  }, [userId]);

  const handleEditProfile = () => {
    // In real app: navigate to profile edit page
    alert('프로필 편집 기능이 구현될 예정입니다');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
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

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <Card className="max-w-md mx-auto border-dashed border-2 border-blue-200">
          <CardContent className="text-center py-8">
            <User className="h-12 w-12 text-blue-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              프로필을 찾을 수 없습니다
            </h2>
            <p className="text-gray-600">사용자 프로필이 존재하지 않습니다.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        {/* Header Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={profile.profilePicture}
                    alt={profile.displayName}
                  />
                  <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                    {profile.displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Basic Info */}
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {profile.displayName}
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">
                        {profile.location?.city}, {profile.location?.country}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">
                        가입한 지 {profile.stats.accountAge}일
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={handleEditProfile}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    프로필 편집
                  </Button>
                </div>

                {/* Bio */}
                {profile.bio && (
                  <p className="text-gray-700 mt-4 leading-relaxed">
                    {profile.bio}
                  </p>
                )}

                {/* Contact Info */}
                <div className="flex flex-wrap gap-4 mt-4">
                  {profile.preferences.privacy.showEmail && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{profile.email}</span>
                    </div>
                  )}
                  {profile.preferences.privacy.showPhone &&
                    profile.phoneNumber && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{profile.phoneNumber}</span>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <Card>
          <CardContent className="p-0">
            <div className="flex border-b">
              {[
                { key: 'overview', label: '개요', icon: User },
                { key: 'saved', label: '저장된 항목', icon: Heart },
                { key: 'activity', label: '활동 내역', icon: MessageCircle },
                { key: 'verification', label: '인증', icon: Shield },
                { key: 'settings', label: '설정', icon: Settings },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === key
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'overview' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-600" />
                    활동 통계
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {profile.stats.savedItems}
                      </div>
                      <div className="text-sm text-gray-600">저장된 항목</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {profile.stats.inquiriesSent}
                      </div>
                      <div className="text-sm text-gray-600">문의 발송</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {profile.stats.profileViews}
                      </div>
                      <div className="text-sm text-gray-600">프로필 조회</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {profile.stats.accountAge}
                      </div>
                      <div className="text-sm text-gray-600">가입일수</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'saved' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    저장된 항목 ({savedItems.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {savedItems.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600">저장된 항목이 없습니다.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {savedItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div>
                            <Badge
                              variant={
                                item.itemType === 'instructor'
                                  ? 'default'
                                  : 'secondary'
                              }
                            >
                              {item.itemType === 'instructor'
                                ? '강사'
                                : '리조트'}
                            </Badge>
                            <p className="text-sm text-gray-600 mt-1">
                              저장일:{' '}
                              {new Date(item.savedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            보기
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === 'activity' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                    최근 활동
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {activities.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600">최근 활동이 없습니다.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {activities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-3 p-4 border rounded-lg"
                        >
                          <div className="flex-shrink-0 mt-1">
                            {activity.type === 'item_saved' && (
                              <Heart className="h-4 w-4 text-red-500" />
                            )}
                            {activity.type === 'inquiry_sent' && (
                              <MessageCircle className="h-4 w-4 text-blue-500" />
                            )}
                          </div>
                          <div className="flex-grow">
                            <p className="text-sm">
                              {activity.type === 'item_saved' &&
                                '항목을 저장했습니다'}
                              {activity.type === 'inquiry_sent' &&
                                '문의를 발송했습니다'}
                            </p>
                            {activity.metadata && (
                              <p className="text-xs text-gray-600 mt-1">
                                {activity.metadata.instructorName ||
                                  activity.metadata.resortName}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(activity.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === 'verification' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    인증 관리
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Current Status */}
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        인증되지 않은 계정
                      </h3>
                      <p className="text-gray-600 mb-6">
                        강사 또는 리조트 운영자로 활동하려면 인증이 필요합니다.
                      </p>
                    </div>

                    {/* Verification Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-6 hover:border-blue-300 transition-colors">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <User className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">강사 인증</h4>
                            <p className="text-sm text-gray-600">
                              다이빙 강사로 활동
                            </p>
                          </div>
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1 mb-4">
                          <li>• 다이빙 자격증 필요</li>
                          <li>• 학생 모집 및 교육 가능</li>
                          <li>• 프로필 우선 노출</li>
                        </ul>
                        <Button
                          className="w-full"
                          onClick={() =>
                            (window.location.href =
                              '/verification?type=instructor')
                          }
                        >
                          강사 인증 신청
                        </Button>
                      </div>

                      <div className="border rounded-lg p-6 hover:border-green-300 transition-colors">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                            <Building2 className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">리조트 인증</h4>
                            <p className="text-sm text-gray-600">
                              다이빙 리조트 운영
                            </p>
                          </div>
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1 mb-4">
                          <li>• 사업자등록증 필요</li>
                          <li>• 고객 예약 접수 가능</li>
                          <li>• 리조트 정보 등록</li>
                        </ul>
                        <Button
                          className="w-full bg-green-600 hover:bg-green-700"
                          onClick={() =>
                            (window.location.href = '/verification?type=resort')
                          }
                        >
                          리조트 인증 신청
                        </Button>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">
                        인증 혜택
                      </h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• 신뢰할 수 있는 전문가로 인정</li>
                        <li>• 검색 결과 상위 노출</li>
                        <li>• 전용 관리 도구 제공</li>
                        <li>• 고객 문의 우선 처리</li>
                        <li>• 마케팅 지원 및 프로모션 참여</li>
                      </ul>
                    </div>

                    {/* FAQ */}
                    <div className="space-y-3">
                      <h4 className="font-medium">자주 묻는 질문</h4>
                      <div className="space-y-2">
                        <details className="border rounded-lg">
                          <summary className="p-3 cursor-pointer hover:bg-gray-50">
                            인증에 얼마나 걸리나요?
                          </summary>
                          <div className="p-3 pt-0 text-sm text-gray-600">
                            일반적으로 서류 제출 후 1-3일 내에 검토가
                            완료됩니다.
                          </div>
                        </details>
                        <details className="border rounded-lg">
                          <summary className="p-3 cursor-pointer hover:bg-gray-50">
                            인증 비용이 있나요?
                          </summary>
                          <div className="p-3 pt-0 text-sm text-gray-600">
                            인증 자체는 무료입니다. 다만 서비스 이용 시 수수료가
                            발생할 수 있습니다.
                          </div>
                        </details>
                        <details className="border rounded-lg">
                          <summary className="p-3 cursor-pointer hover:bg-gray-50">
                            필요한 서류는 무엇인가요?
                          </summary>
                          <div className="p-3 pt-0 text-sm text-gray-600">
                            강사: 다이빙 자격증, 신분증, 보험증서(선택)
                            <br />
                            리조트: 사업자등록증, 보험증서, 시설 인증서(선택)
                          </div>
                        </details>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-blue-600" />
                      알림 설정
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(profile.preferences.notifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm">
                            {key === 'email' && '이메일 알림'}
                            {key === 'push' && '푸시 알림'}
                            {key === 'marketing' && '마케팅 알림'}
                            {key === 'inquiryUpdates' && '문의 업데이트'}
                            {key === 'newListings' && '새 등록 알림'}
                          </span>
                          <Badge variant={value ? 'default' : 'secondary'}>
                            {value ? '켜짐' : '꺼짐'}
                          </Badge>
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      개인정보 설정
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(profile.preferences.privacy).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm">
                            {key === 'profileVisibility' && '프로필 공개'}
                            {key === 'showEmail' && '이메일 공개'}
                            {key === 'showPhone' && '전화번호 공개'}
                            {key === 'allowDirectContact' && '직접 연락 허용'}
                          </span>
                          <Badge
                            variant={
                              value === true || value === 'public'
                                ? 'default'
                                : 'secondary'
                            }
                          >
                            {typeof value === 'boolean'
                              ? value
                                ? '허용'
                                : '차단'
                              : value}
                          </Badge>
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  프로필 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">언어</span>
                  <span className="font-medium">
                    {profile.preferences.language === 'ko'
                      ? '한국어'
                      : 'English'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">통화</span>
                  <span className="font-medium">
                    {profile.preferences.currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">프로필 상태</span>
                  <Badge
                    variant={
                      profile.preferences.privacy.profileVisibility === 'public'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {profile.preferences.privacy.profileVisibility === 'public'
                      ? '공개'
                      : '비공개'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle>계정 관리</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="h-4 w-4 mr-2" />
                  프로필 편집
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  계정 설정
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  개인정보 설정
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
