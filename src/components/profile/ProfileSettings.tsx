'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Settings,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Mail,
  Smartphone,
  Globe,
  User,
  Trash2,
  Save,
  X,
} from 'lucide-react';

interface NotificationSettings {
  email: boolean;
  push: boolean;
  marketing: boolean;
  inquiryUpdates: boolean;
  profileViews: boolean;
  newFeatures: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private';
  showEmail: boolean;
  showPhone: boolean;
  allowDirectContact: boolean;
  showActivityHistory: boolean;
  allowAnalytics: boolean;
}

interface ProfileSettingsProps {
  userId: string;
}

export function ProfileSettings({ userId }: ProfileSettingsProps) {
  const [activeTab, setActiveTab] = useState<
    'notifications' | 'privacy' | 'account' | 'danger'
  >('notifications');
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: true,
    marketing: false,
    inquiryUpdates: true,
    profileViews: true,
    newFeatures: true,
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowDirectContact: true,
    showActivityHistory: true,
    allowAnalytics: true,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleNotificationChange = (
    key: keyof NotificationSettings,
    value: boolean
  ) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePrivacyChange = (key: keyof PrivacySettings, value: any) => {
    setPrivacy((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // In real app, save to Firebase
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Settings saved:', { notifications, privacy });
      alert('설정이 저장되었습니다.');
    } catch (error) {
      console.error('Settings save failed:', error);
      alert('설정 저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('새 비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    setLoading(true);
    try {
      // In real app, update password in Firebase Auth
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Password changed');
      alert('비밀번호가 변경되었습니다.');
      setShowPasswordChange(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Password change failed:', error);
      alert('비밀번호 변경에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleAccountDeletion = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    setLoading(true);
    try {
      // In real app, delete user account from Firebase
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Account deleted');
      alert('계정이 삭제되었습니다.');
      // Redirect to logout
    } catch (error) {
      console.error('Account deletion failed:', error);
      alert('계정 삭제에 실패했습니다.');
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const tabs = [
    { id: 'notifications', label: '알림 설정', icon: Bell },
    { id: 'privacy', label: '개인정보 보호', icon: Shield },
    { id: 'account', label: '계정 관리', icon: User },
    { id: 'danger', label: '위험 영역', icon: Trash2 },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              알림 설정
            </CardTitle>
            <p className="text-sm text-gray-600">
              다양한 알림 유형을 관리하여 중요한 업데이트를 놓치지 마세요
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <Label className="text-sm font-medium">이메일 알림</Label>
                    <p className="text-xs text-gray-500">
                      중요한 업데이트를 이메일로 받습니다
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked: boolean) =>
                    handleNotificationChange('email', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-gray-500" />
                  <div>
                    <Label className="text-sm font-medium">푸시 알림</Label>
                    <p className="text-xs text-gray-500">
                      브라우저 푸시 알림을 받습니다
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked: boolean) =>
                    handleNotificationChange('push', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <div>
                    <Label className="text-sm font-medium">마케팅 알림</Label>
                    <p className="text-xs text-gray-500">
                      새로운 서비스와 프로모션 정보
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={(checked: boolean) =>
                    handleNotificationChange('marketing', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <Label className="text-sm font-medium">문의 업데이트</Label>
                    <p className="text-xs text-gray-500">
                      보낸 문의에 대한 답변 알림
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications.inquiryUpdates}
                  onCheckedChange={(checked: boolean) =>
                    handleNotificationChange('inquiryUpdates', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-gray-500" />
                  <div>
                    <Label className="text-sm font-medium">
                      프로필 조회 알림
                    </Label>
                    <p className="text-xs text-gray-500">
                      내 프로필을 조회한 사용자 알림
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications.profileViews}
                  onCheckedChange={(checked: boolean) =>
                    handleNotificationChange('profileViews', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-gray-500" />
                  <div>
                    <Label className="text-sm font-medium">
                      새로운 기능 알림
                    </Label>
                    <p className="text-xs text-gray-500">
                      플랫폼의 새로운 기능과 업데이트
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications.newFeatures}
                  onCheckedChange={(checked: boolean) =>
                    handleNotificationChange('newFeatures', checked)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Privacy Tab */}
      {activeTab === 'privacy' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              개인정보 보호
            </CardTitle>
            <p className="text-sm text-gray-600">
              개인정보 공개 범위와 연락처 설정을 관리하세요
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">프로필 공개 설정</Label>
                <Select
                  value={privacy.profileVisibility}
                  onValueChange={(value: 'public' | 'private') =>
                    handlePrivacyChange('profileVisibility', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">공개</SelectItem>
                    <SelectItem value="private">비공개</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  {privacy.profileVisibility === 'public'
                    ? '모든 사용자가 내 프로필을 볼 수 있습니다'
                    : '나만 내 프로필을 볼 수 있습니다'}
                </p>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <Label className="text-sm font-medium">
                      이메일 주소 공개
                    </Label>
                    <p className="text-xs text-gray-500">
                      다른 사용자에게 이메일 주소를 보여줍니다
                    </p>
                  </div>
                </div>
                <Switch
                  checked={privacy.showEmail}
                  onCheckedChange={(checked: boolean) =>
                    handlePrivacyChange('showEmail', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-gray-500" />
                  <div>
                    <Label className="text-sm font-medium">전화번호 공개</Label>
                    <p className="text-xs text-gray-500">
                      다른 사용자에게 전화번호를 보여줍니다
                    </p>
                  </div>
                </div>
                <Switch
                  checked={privacy.showPhone}
                  onCheckedChange={(checked: boolean) =>
                    handlePrivacyChange('showPhone', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <Label className="text-sm font-medium">
                      직접 연락 허용
                    </Label>
                    <p className="text-xs text-gray-500">
                      다른 사용자가 직접 연락할 수 있도록 허용
                    </p>
                  </div>
                </div>
                <Switch
                  checked={privacy.allowDirectContact}
                  onCheckedChange={(checked: boolean) =>
                    handlePrivacyChange('allowDirectContact', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-gray-500" />
                  <div>
                    <Label className="text-sm font-medium">
                      활동 내역 공개
                    </Label>
                    <p className="text-xs text-gray-500">
                      내 활동 내역을 다른 사용자에게 보여줍니다
                    </p>
                  </div>
                </div>
                <Switch
                  checked={privacy.showActivityHistory}
                  onCheckedChange={(checked: boolean) =>
                    handlePrivacyChange('showActivityHistory', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-gray-500" />
                  <div>
                    <Label className="text-sm font-medium">
                      분석 데이터 허용
                    </Label>
                    <p className="text-xs text-gray-500">
                      서비스 개선을 위한 익명 분석 데이터 수집
                    </p>
                  </div>
                </div>
                <Switch
                  checked={privacy.allowAnalytics}
                  onCheckedChange={(checked: boolean) =>
                    handlePrivacyChange('allowAnalytics', checked)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Account Tab */}
      {activeTab === 'account' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-purple-600" />
              계정 관리
            </CardTitle>
            <p className="text-sm text-gray-600">
              계정 정보와 보안 설정을 관리하세요
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">비밀번호 변경</h3>
                {!showPasswordChange ? (
                  <Button
                    variant="outline"
                    onClick={() => setShowPasswordChange(true)}
                  >
                    비밀번호 변경
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="currentPassword">현재 비밀번호</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          setPasswordData((prev) => ({
                            ...prev,
                            currentPassword: e.target.value,
                          }))
                        }
                        placeholder="현재 비밀번호를 입력하세요"
                      />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">새 비밀번호</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData((prev) => ({
                            ...prev,
                            newPassword: e.target.value,
                          }))
                        }
                        placeholder="새 비밀번호를 입력하세요"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                          }))
                        }
                        placeholder="새 비밀번호를 다시 입력하세요"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={handlePasswordChange}
                        disabled={loading}
                        className="flex-1"
                      >
                        {loading ? '변경 중...' : '비밀번호 변경'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowPasswordChange(false);
                          setPasswordData({
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: '',
                          });
                        }}
                      >
                        취소
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">계정 정보</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">계정 생성일:</span>
                    <span>2024년 1월 15일</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">마지막 로그인:</span>
                    <span>2024년 7월 19일</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">계정 상태:</span>
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800"
                    >
                      활성
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Danger Zone Tab */}
      {activeTab === 'danger' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              위험 영역
            </CardTitle>
            <p className="text-sm text-gray-600">
              주의: 이 작업들은 되돌릴 수 없습니다
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 border-2 border-red-200 rounded-lg bg-red-50">
              <h3 className="font-medium text-red-800 mb-2">계정 삭제</h3>
              <p className="text-sm text-red-700 mb-4">
                계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수
                없습니다.
              </p>
              {!showDeleteConfirm ? (
                <Button variant="destructive" onClick={handleAccountDeletion}>
                  계정 삭제
                </Button>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-red-700 font-medium">
                    정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수
                    없습니다.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      onClick={handleAccountDeletion}
                      disabled={loading}
                    >
                      {loading ? '삭제 중...' : '확인 - 계정 삭제'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      취소
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Save Button */}
      {activeTab !== 'danger' && (
        <div className="flex justify-end">
          <Button
            onClick={handleSaveSettings}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {loading ? '저장 중...' : '설정 저장'}
          </Button>
        </div>
      )}
    </div>
  );
}
