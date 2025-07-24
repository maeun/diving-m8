import { Timestamp } from 'firebase/firestore';

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  userType: 'consumer' | 'instructor' | 'resort' | 'admin';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isApproved: boolean;
  isActive: boolean;
  // Kakao login specific fields
  kakaoId?: string;
  provider?: 'kakao' | 'email' | 'google';
}

export interface Certification {
  name: string;
  organization: string; // PADI, SSI, etc.
  level: string;
  issueDate: Timestamp;
  certificateUrl?: string;
}

export interface Service {
  name: string;
  description: string;
  price: number;
  currency: string;
  duration: string;
  maxParticipants?: number;
}

export interface Media {
  url: string;
  type: 'image' | 'video';
  caption?: string;
  order: number;
}

export interface InstructorProfile {
  id: string;
  userId: string;
  name: string;
  bio: string;
  location: {
    latitude: number;
    longitude: number;
  };
  address: string;
  certifications: Certification[];
  experience: number; // years
  specialties: string[];
  languages: string[];
  services: Service[];
  gallery: Media[];
  socialLinks: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    website?: string;
    twitter?: string;
    tiktok?: string;
  };
  stats: {
    views: number;
    saves: number;
    inquiries: number;
  };
  isApproved: boolean;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ResortService {
  name: string;
  description: string;
  isIncluded: boolean;
}

export interface Package {
  name: string;
  description: string;
  price: number;
  currency: string;
  duration: string;
  inclusions: string[];
  exclusions: string[];
}

export interface ResortProfile {
  id: string;
  userId: string;
  name: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
  };
  address: string;
  facilities: string[];
  services: ResortService[];
  packages: Package[];
  gallery: Media[];
  socialLinks: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    website?: string;
    twitter?: string;
    tiktok?: string;
  };
  stats: {
    views: number;
    saves: number;
    inquiries: number;
  };
  isApproved: boolean;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface SavedItem {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'instructor' | 'resort';
  savedAt: Timestamp;
}

export interface Inquiry {
  id: string;
  fromUserId: string;
  toUserId: string;
  toProfileId: string;
  toProfileType: 'instructor' | 'resort';
  message: string;
  status: 'pending' | 'read' | 'replied' | 'closed';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// User Profile Management Types
export interface UserProfile {
  id: string;
  userId: string;
  displayName: string;
  email: string;
  phoneNumber?: string;
  profilePicture?: string;
  bio?: string;
  location?: {
    city: string;
    country: string;
  };
  preferences: UserPreferences;
  stats: UserStats;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface UserPreferences {
  language: string;
  currency: string;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  marketing: boolean;
  inquiryUpdates: boolean;
  newListings: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private';
  showEmail: boolean;
  showPhone: boolean;
  allowDirectContact: boolean;
}

export interface UserStats {
  savedItems: number;
  inquiriesSent: number;
  profileViews: number;
  accountAge: number; // days since registration
}

export interface UserActivity {
  id: string;
  userId: string;
  type:
    | 'profile_view'
    | 'inquiry_sent'
    | 'item_saved'
    | 'search_performed'
    | 'profile_updated';
  targetId?: string;
  targetType?: 'instructor' | 'resort';
  metadata?: Record<string, any>;
  timestamp: Timestamp;
}

// Kakao Login Types
export interface KakaoUser {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
    profile_image?: string;
    thumbnail_image?: string;
  };
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile_image_needs_agreement: boolean;
    profile: {
      nickname: string;
      thumbnail_image_url?: string;
      profile_image_url?: string;
    };
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    email?: string;
    has_phone_number: boolean;
    phone_number_needs_agreement: boolean;
    phone_number?: string;
  };
}
