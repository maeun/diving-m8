'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserProfile, KakaoUser } from '@/types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithKakao: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Mock user data for development
const mockUser: User = {
  id: 'user1',
  email: 'kim.diver@example.com',
  displayName: '김다이버',
  photoURL:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  phoneNumber: '+82-10-1234-5678',
  userType: 'consumer',
  createdAt: new Date('2024-01-01') as any,
  updatedAt: new Date('2024-01-15') as any,
  isApproved: true,
  isActive: true,
  kakaoId: '12345678',
  provider: 'kakao',
};

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

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuthState = async () => {
      setLoading(true);

      // In real app, check for existing session/token
      const existingUser = localStorage.getItem('diving_mate_user');
      if (existingUser) {
        setUser(mockUser);
        setUserProfile(mockUserProfile);
      }

      setLoading(false);
    };

    checkAuthState();
  }, []);

  const signInWithKakao = async () => {
    try {
      setLoading(true);

      // In real app, this would integrate with Kakao SDK
      // For now, we'll simulate the login process

      // Simulate Kakao login API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful login
      setUser(mockUser);
      setUserProfile(mockUserProfile);

      // Store user session
      localStorage.setItem('diving_mate_user', JSON.stringify(mockUser));

      console.log('카카오 로그인 성공');
    } catch (error) {
      console.error('카카오 로그인 실패:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);

      // In real app, this would call Kakao logout API
      await new Promise((resolve) => setTimeout(resolve, 500));

      setUser(null);
      setUserProfile(null);

      // Clear stored session
      localStorage.removeItem('diving_mate_user');

      console.log('로그아웃 성공');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (profileUpdates: Partial<UserProfile>) => {
    try {
      if (!userProfile) return;

      setLoading(true);

      // In real app, this would call Firebase/API to update profile
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedProfile = {
        ...userProfile,
        ...profileUpdates,
        updatedAt: new Date() as any,
      };

      setUserProfile(updatedProfile);

      console.log('프로필 업데이트 성공');
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signInWithKakao,
    signOut,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Kakao SDK integration utilities
export const initializeKakao = () => {
  if (
    typeof window !== 'undefined' &&
    window.Kakao &&
    !window.Kakao.isInitialized()
  ) {
    // In real app, use your actual Kakao app key
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
  }
};

export const kakaoLogin = async (): Promise<KakaoUser> => {
  return new Promise((resolve, reject) => {
    if (!window.Kakao) {
      reject(new Error('Kakao SDK not loaded'));
      return;
    }

    window.Kakao.Auth.login({
      success: (authObj: any) => {
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (user: KakaoUser) => {
            resolve(user);
          },
          fail: (error: any) => {
            reject(error);
          },
        });
      },
      fail: (error: any) => {
        reject(error);
      },
    });
  });
};

// Extend Window interface for Kakao SDK
declare global {
  interface Window {
    Kakao: any;
  }
}
