'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProfileEditForm } from './ProfileEditForm';
import {
  User,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Edit,
  Eye,
  Heart,
  MessageCircle,
  Globe,
  Shield,
} from 'lucide-react';
import { UserProfile } from '@/types';

interface ProfileOverviewProps {
  profile: UserProfile;
}

export function ProfileOverview({ profile }: ProfileOverviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(profile);

  const handleSaveProfile = (updatedProfile: Partial<UserProfile>) => {
    setCurrentProfile((prev) => ({ ...prev, ...updatedProfile }));
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <ProfileEditForm
        profile={currentProfile}
        onSave={handleSaveProfile}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              기본 정보
            </CardTitle>
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="sm"
            >
              <Edit className="h-4 w-4 mr-2" />
              편집
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={currentProfile.profilePicture}
                  alt={currentProfile.displayName}
                />
                <AvatarFallback className="text-xl bg-blue-100 text-blue-600">
                  {currentProfile.displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Profile Details */}
            <div className="flex-grow space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {currentProfile.displayName}
                </h3>
                {currentProfile.bio && (
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    {currentProfile.bio}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{currentProfile.email}</span>
                  <Badge variant="secondary" className="text-xs">
                    카카오
                  </Badge>
                </div>

                {/* Phone */}
                {currentProfile.phoneNumber && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">
                      {currentProfile.phoneNumber}
                    </span>
                  </div>
                )}

                {/* Location */}
                {currentProfile.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">
                      {currentProfile.location.city},{' '}
                      {currentProfile.location.country}
                    </span>
                  </div>
                )}

                {/* Join Date */}
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">
                    가입일:{' '}
                    {currentProfile.createdAt.toDate().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-blue-600" />
            활동 통계
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">
                {currentProfile.stats.savedItems}
              </div>
              <div className="text-sm text-gray-600">저장된 항목</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <MessageCircle className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {currentProfile.stats.inquiriesSent}
              </div>
              <div className="text-sm text-gray-600">문의 발송</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Eye className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {currentProfile.stats.profileViews}
              </div>
              <div className="text-sm text-gray-600">프로필 조회</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">
                {currentProfile.stats.accountAge}
              </div>
              <div className="text-sm text-gray-600">활동 일수</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Settings Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            계정 설정
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Preferences */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">기본 설정</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">언어</span>
                  <Badge variant="outline">
                    {currentProfile.preferences.language === 'ko'
                      ? '한국어'
                      : 'English'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">통화</span>
                  <Badge variant="outline">
                    {currentProfile.preferences.currency}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">프로필 공개</span>
                  <Badge
                    variant={
                      currentProfile.preferences.privacy.profileVisibility ===
                      'public'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {currentProfile.preferences.privacy.profileVisibility ===
                    'public'
                      ? '공개'
                      : '비공개'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Privacy */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">개인정보 설정</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">이메일 공개</span>
                  <Badge
                    variant={
                      currentProfile.preferences.privacy.showEmail
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {currentProfile.preferences.privacy.showEmail
                      ? '공개'
                      : '비공개'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">전화번호 공개</span>
                  <Badge
                    variant={
                      currentProfile.preferences.privacy.showPhone
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {currentProfile.preferences.privacy.showPhone
                      ? '공개'
                      : '비공개'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">직접 연락 허용</span>
                  <Badge
                    variant={
                      currentProfile.preferences.privacy.allowDirectContact
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {currentProfile.preferences.privacy.allowDirectContact
                      ? '허용'
                      : '차단'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
