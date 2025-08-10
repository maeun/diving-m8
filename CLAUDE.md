# DivingM8 Project Guide

## Project Overview

**DivingM8** is a Next.js-based marketplace platform connecting diving enthusiasts with certified instructors and dive resorts. The platform enables users to discover, compare, and connect with diving professionals while providing business tools for instructors and resorts to manage their profiles and services.

### Core Value Proposition
- **For Consumers**: Discover and connect with certified diving instructors and resorts
- **For Instructors**: Showcase certifications, services, and build professional presence
- **For Resorts**: Promote facilities, packages, and attract diving tourists
- **For Platform**: Facilitate trusted connections in the diving community

## Technical Architecture

### Technology Stack
```
Frontend:  Next.js 15.4.1 + React 19.1.0 (App Router)
Language:  TypeScript (strict mode)
Styling:   Tailwind CSS v4 + Radix UI
Backend:   Firebase (Firestore, Auth, Storage)
Forms:     React Hook Form + Zod validation
State:     React Context API
```

### Project Structure
```
src/
├── app/               # Next.js App Router (pages & layouts)
│   ├── auth/         # Authentication flows
│   ├── dashboard/    # User dashboards by role
│   ├── instructor/   # Instructor-specific pages
│   ├── resort/       # Resort-specific pages
│   ├── search/       # Search & discovery
│   └── profile/      # Profile management
├── components/       # Reusable UI components
│   ├── auth/         # Authentication components
│   ├── layout/       # Layout & navigation
│   ├── profile/      # Profile management
│   ├── search/       # Search functionality
│   └── ui/           # Base UI components
├── contexts/         # React Context providers
├── lib/              # Core utilities & configs
├── services/         # Business logic & APIs
├── types/            # TypeScript definitions
└── utils/            # Helper functions
```

## User Roles & Permissions

### Consumer (Default)
- **Capabilities**: Browse, search, save, inquire
- **Profile**: Basic profile with preferences
- **Features**: Search filters, saved items, inquiry history

### Instructor (Verified)
- **Capabilities**: Professional profile, service listings, inquiry management
- **Verification Required**: Certifications, insurance, business license
- **Profile Features**: Gallery, certifications, specialties, pricing
- **Analytics**: Views, saves, inquiries, conversion rates

### Resort (Verified)  
- **Capabilities**: Business profile, package listings, facility showcase
- **Verification Required**: Business license, facility permits
- **Profile Features**: Location, facilities, packages, amenities
- **Booking Integration**: Future feature for direct bookings

### Admin
- **Capabilities**: User management, verification approval, platform oversight
- **Tools**: Dashboard, analytics, content moderation
- **Responsibilities**: Quality control, dispute resolution

## Key Features & Implementation Status

### ✅ Implemented
- **Authentication System**: Kakao login integration (mock implementation)
- **Multi-role User System**: Consumer/Instructor/Resort/Admin roles
- **Profile Management**: Comprehensive profile forms with media upload
- **Search & Discovery**: Filter-based search system
- **Verification Workflow**: Document upload and approval process
- **Firebase Integration**: Firestore, Auth, Storage with emulator support

### 🚧 In Development
- **Real Authentication**: Replace mock with Firebase Auth
- **Media Management**: Image optimization and CDN integration
- **Analytics Dashboard**: User engagement and business metrics
- **Inquiry System**: Direct messaging between users

### 📋 Planned Features
- **Payment Integration**: Subscription tiers, transaction fees
- **Booking System**: Direct booking for services/packages
- **Review System**: User reviews and ratings
- **Mobile App**: React Native implementation
- **Multilingual Support**: i18n for global expansion

## Data Models

### Core Entities

#### User
```typescript
interface User {
  id: string;
  email: string;
  displayName: string;
  userType: 'consumer' | 'instructor' | 'resort' | 'admin';
  isApproved: boolean;
  isActive: boolean;
  provider: 'kakao' | 'email' | 'google';
}
```

#### InstructorProfile
```typescript
interface InstructorProfile {
  name: string;
  bio: string;
  certifications: Certification[];
  specialties: string[];
  services: Service[];
  gallery: Media[];
  stats: ProfileStats;
}
```

#### ResortProfile
```typescript
interface ResortProfile {
  name: string;
  location: GeoPoint;
  facilities: string[];
  packages: Package[];
  gallery: Media[];
  stats: ProfileStats;
}
```

## Development Guidelines

### Code Standards
- **TypeScript**: Strict mode, comprehensive type definitions
- **ESLint**: Next.js recommended rules
- **Formatting**: Prettier with consistent configuration
- **Components**: Functional components with hooks
- **Styling**: Tailwind utility classes, component variants

### File Naming Conventions
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Pages**: kebab-case (e.g., `instructor-profile.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase interfaces (e.g., `UserProfile`)

### Git Workflow
- **Branches**: `feature/`, `bugfix/`, `hotfix/` prefixes
- **Commits**: Conventional commits (feat, fix, docs, etc.)
- **PRs**: Required for main branch, include tests

## Production Readiness Checklist

### Security
- [ ] Remove demo Firebase configuration
- [ ] Implement proper authentication flows
- [ ] Add rate limiting for API endpoints
- [ ] Sanitize user inputs and validate uploads
- [ ] Configure CORS policies
- [ ] Implement proper session management

### Performance
- [ ] Remove console.log statements
- [ ] Implement image optimization
- [ ] Add lazy loading for components
- [ ] Configure CDN for static assets
- [ ] Implement code splitting
- [ ] Add caching strategies

### Testing
- [ ] Unit tests for business logic
- [ ] Integration tests for API endpoints
- [ ] E2E tests for critical user flows
- [ ] Performance testing
- [ ] Security testing

### Monitoring
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (Vercel Analytics)
- [ ] User analytics (Google Analytics)
- [ ] Server monitoring
- [ ] Database performance tracking

### Configuration
- [ ] Remove `ignoreDuringBuilds` and `ignoreBuildErrors`
- [ ] Configure environment variables
- [ ] Set up CI/CD pipeline
- [ ] Configure staging environment
- [ ] Set up database backups

## Business Logic & User Flows

### User Registration Flow
1. **Social Login**: Kakao OAuth integration
2. **Role Selection**: Choose user type (consumer/instructor/resort)
3. **Profile Setup**: Basic information and preferences
4. **Verification** (if business): Document submission and review
5. **Approval**: Admin review and account activation

### Search & Discovery Flow
1. **Landing Page**: Browse featured instructors/resorts
2. **Search Filters**: Location, specialties, price, ratings
3. **Results Display**: Card-based layout with key information
4. **Profile View**: Detailed profile with gallery and services
5. **Inquiry**: Contact form or direct messaging

### Business Profile Management
1. **Profile Creation**: Multi-step form with validation
2. **Media Upload**: Gallery management with Firebase Storage
3. **Service Listings**: Pricing, descriptions, availability
4. **Verification**: Document upload and status tracking
5. **Analytics**: Performance metrics and insights

## Firebase Configuration

### Collections Structure
```
users/              # User authentication data
userProfiles/       # Extended user information
instructorProfiles/ # Instructor business profiles
resortProfiles/     # Resort business profiles
verificationRequests/ # Business verification documents
inquiries/          # User-to-business messages
savedItems/         # User saved favorites
activities/         # User activity tracking
```

### Security Rules
- **User Data**: Owner read/write, admin read
- **Public Profiles**: Public read, owner write
- **Verification**: Owner submit, admin approve
- **Media**: Authenticated upload, public read

### Storage Structure
```
profiles/
  ├── avatars/      # User profile pictures
  ├── galleries/    # Business profile galleries
  └── documents/    # Verification documents
```

## API Design Patterns

### Service Layer Structure
```typescript
// services/instructorService.ts
export class InstructorService {
  async getInstructors(filters: SearchFilters): Promise<InstructorProfile[]>
  async getInstructorById(id: string): Promise<InstructorProfile>
  async updateProfile(id: string, data: Partial<InstructorProfile>): Promise<void>
  async uploadGalleryImage(file: File): Promise<string>
}
```

### Error Handling
- **Client Errors**: User-friendly messages with actionable guidance
- **Server Errors**: Logged with context, generic user messages
- **Network Errors**: Retry logic with exponential backoff
- **Validation Errors**: Field-specific feedback

## Deployment Strategy

### Environments
- **Development**: Local with Firebase emulators
- **Staging**: Vercel preview with Firebase dev project
- **Production**: Vercel production with Firebase prod project

### Build Process
1. **Type Check**: `tsc --noEmit`
2. **Lint**: `next lint`
3. **Test**: `npm test`
4. **Build**: `next build`
5. **Deploy**: Vercel automatic deployment

## Future Enhancements

### Phase 2: Advanced Features
- **Real-time Messaging**: Direct chat between users
- **Video Calls**: Consultation scheduling and conduct
- **Payment Processing**: Stripe integration for transactions
- **Advanced Search**: AI-powered recommendations
- **Mobile App**: React Native implementation

### Phase 3: Platform Scaling
- **Multi-region Support**: Global expansion
- **Advanced Analytics**: Business intelligence dashboard
- **API Marketplace**: Third-party integrations
- **White-label Solutions**: Customizable platform for dive shops

## Maintenance & Operations

### Regular Tasks
- **Security Updates**: Monthly dependency updates
- **Performance Review**: Quarterly performance audits  
- **User Feedback**: Continuous feature prioritization
- **Database Optimization**: Index management and query optimization

### Monitoring Metrics
- **User Engagement**: DAU, session duration, feature usage
- **Business Metrics**: Profile completion rates, inquiry conversion
- **Technical Metrics**: Page load times, error rates, uptime
- **Revenue Metrics**: Subscription conversions, transaction volume

## Support & Documentation

### User Support
- **Help Center**: FAQ and user guides
- **Contact Support**: Multi-channel support system
- **Community Forum**: User-generated content and peer support

### Developer Resources
- **API Documentation**: Comprehensive endpoint documentation  
- **Component Library**: Storybook documentation
- **Development Setup**: Local development guide
- **Contribution Guidelines**: Open source contribution guide

---

## Quick Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Firebase
```bash
firebase emulators:start    # Start local emulators
firebase deploy            # Deploy to production
firebase login             # Authenticate CLI
```

### Testing (To be implemented)
```bash
npm test            # Run unit tests
npm run test:e2e    # Run E2E tests
npm run test:watch  # Run tests in watch mode
```

---

*Last updated: 2025-08-09*  
*Version: 0.1.0-beta*