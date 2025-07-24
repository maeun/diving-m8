'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import {
  User,
  Camera,
  Save,
  X,
  Loader2,
  MapPin,
  Mail,
  Phone,
  FileText,
} from 'lucide-react';
import { UserProfile } from '@/types';

interface ProfileEditFormProps {
  profile: UserProfile;
  onSave: (updatedProfile: Partial<UserProfile>) => void;
  onCancel: () => void;
}

export function ProfileEditForm({
  profile,
  onSave,
  onCancel,
}: ProfileEditFormProps) {
  const { updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: profile.displayName,
    bio: profile.bio || '',
    phoneNumber: profile.phoneNumber || '',
    location: {
      city: profile.location?.city || '',
      country: profile.location?.country || '',
    },
  });
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In real app, upload image to Firebase Storage first
      let profilePictureUrl = profile.profilePicture;
      if (profileImageFile) {
        // Simulate image upload
        await new Promise((resolve) => setTimeout(resolve, 1000));
        profilePictureUrl = profileImagePreview || undefined; // In real app, this would be the uploaded URL
      }

      const updatedProfile: Partial<UserProfile> = {
        displayName: formData.displayName,
        bio: formData.bio,
        phoneNumber: formData.phoneNumber,
        location:
          formData.location.city || formData.location.country
            ? formData.location
            : undefined,
        profilePicture: profilePictureUrl,
      };

      await updateUserProfile(updatedProfile);
      onSave(updatedProfile);
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      alert('프로필 업데이트에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          프로필 편집
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={profileImagePreview || profile.profilePicture}
                  alt={profile.displayName}
                />
                <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                  {profile.displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <Camera className="h-4 w-4" />
              </label>
              <input
                id="profile-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <p className="text-sm text-gray-600 text-center">
              프로필 사진을 클릭하여 변경하세요
            </p>
          </div>

          {/* Display Name */}
          <div className="space-y-2">
            <Label htmlFor="displayName" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              이름
            </Label>
            <Input
              id="displayName"
              value={formData.displayName}
              onChange={(e) => handleInputChange('displayName', e.target.value)}
              placeholder="이름을 입력하세요"
              required
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              자기소개
            </Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="자신을 소개해주세요..."
              rows={4}
            />
            <p className="text-sm text-gray-500">{formData.bio.length}/500자</p>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              전화번호
            </Label>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="전화번호를 입력하세요"
              type="tel"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              위치
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city" className="text-sm text-gray-600">
                  도시
                </Label>
                <Input
                  id="city"
                  value={formData.location.city}
                  onChange={(e) =>
                    handleInputChange('location.city', e.target.value)
                  }
                  placeholder="도시"
                />
              </div>
              <div>
                <Label htmlFor="country" className="text-sm text-gray-600">
                  국가
                </Label>
                <Input
                  id="country"
                  value={formData.location.country}
                  onChange={(e) =>
                    handleInputChange('location.country', e.target.value)
                  }
                  placeholder="국가"
                />
              </div>
            </div>
          </div>

          {/* Email (Read-only) */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              이메일
            </Label>
            <div className="flex items-center gap-2">
              <Input value={profile.email} disabled className="bg-gray-50" />
              <Badge variant="secondary">카카오 연동</Badge>
            </div>
            <p className="text-sm text-gray-500">
              이메일은 카카오 계정과 연동되어 변경할 수 없습니다.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  저장 중...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  저장하기
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
              className="flex-1"
            >
              <X className="h-4 w-4 mr-2" />
              취소
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
