import { z } from 'zod';

// Base validation schemas
export const mediaSchema = z.object({
  url: z.string().url('Invalid URL'),
  type: z.enum(['image', 'video']),
  caption: z.string().optional(),
  order: z.number().min(0),
});

export const socialLinksSchema = z.object({
  instagram: z
    .string()
    .url('Invalid Instagram URL')
    .optional()
    .or(z.literal('')),
  facebook: z.string().url('Invalid Facebook URL').optional().or(z.literal('')),
  youtube: z.string().url('Invalid YouTube URL').optional().or(z.literal('')),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  twitter: z.string().url('Invalid Twitter URL').optional().or(z.literal('')),
  tiktok: z.string().url('Invalid TikTok URL').optional().or(z.literal('')),
});

export const locationSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

// Base profile schema (shared fields)
export const baseProfileSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  bio: z
    .string()
    .min(10, 'Bio must be at least 10 characters')
    .max(1000, 'Bio must be less than 1000 characters'),
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must be less than 200 characters'),
  location: locationSchema,
  socialLinks: socialLinksSchema,
  gallery: z.array(mediaSchema).max(10, 'Maximum 10 media items allowed'),
});

// Certification schema
export const certificationSchema = z.object({
  name: z.string().min(2, 'Certification name is required'),
  organization: z.string().min(2, 'Organization is required'),
  level: z.string().min(1, 'Level is required'),
  issueDate: z.date(),
  certificateUrl: z
    .string()
    .url('Invalid certificate URL')
    .optional()
    .or(z.literal('')),
});

// Service schema
export const serviceSchema = z.object({
  name: z.string().min(2, 'Service name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0, 'Price must be positive'),
  currency: z.string().length(3, 'Currency must be 3 characters (e.g., USD)'),
  duration: z.string().min(1, 'Duration is required'),
  maxParticipants: z.number().min(1).optional(),
});

// Instructor profile schema
export const instructorProfileSchema = baseProfileSchema.extend({
  certifications: z
    .array(certificationSchema)
    .min(1, 'At least one certification is required'),
  experience: z
    .number()
    .min(0, 'Experience must be positive')
    .max(50, 'Experience must be realistic'),
  specialties: z.array(z.string()).min(1, 'At least one specialty is required'),
  languages: z.array(z.string()).min(1, 'At least one language is required'),
  services: z.array(serviceSchema).min(1, 'At least one service is required'),
});

// Resort service schema
export const resortServiceSchema = z.object({
  name: z.string().min(2, 'Service name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  isIncluded: z.boolean(),
});

// Package schema
export const packageSchema = z.object({
  name: z.string().min(2, 'Package name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0, 'Price must be positive'),
  currency: z.string().length(3, 'Currency must be 3 characters (e.g., USD)'),
  duration: z.string().min(1, 'Duration is required'),
  inclusions: z.array(z.string()).min(1, 'At least one inclusion is required'),
  exclusions: z.array(z.string()),
});

// Resort profile schema
export const resortProfileSchema = baseProfileSchema.extend({
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description must be less than 2000 characters'),
  facilities: z.array(z.string()).min(1, 'At least one facility is required'),
  services: z
    .array(resortServiceSchema)
    .min(1, 'At least one service is required'),
  packages: z.array(packageSchema).min(1, 'At least one package is required'),
});

// Form step validation schemas for multi-step forms
export const instructorStep1Schema = z.object({
  name: baseProfileSchema.shape.name,
  bio: baseProfileSchema.shape.bio,
  address: baseProfileSchema.shape.address,
  location: baseProfileSchema.shape.location,
});

export const instructorStep2Schema = z.object({
  certifications: instructorProfileSchema.shape.certifications,
  experience: instructorProfileSchema.shape.experience,
  specialties: instructorProfileSchema.shape.specialties,
  languages: instructorProfileSchema.shape.languages,
});

export const instructorStep3Schema = z.object({
  services: instructorProfileSchema.shape.services,
});

export const instructorStep4Schema = z.object({
  socialLinks: baseProfileSchema.shape.socialLinks,
  gallery: baseProfileSchema.shape.gallery,
});

export const resortStep1Schema = z.object({
  name: baseProfileSchema.shape.name,
  description: resortProfileSchema.shape.description,
  address: baseProfileSchema.shape.address,
  location: baseProfileSchema.shape.location,
});

export const resortStep2Schema = z.object({
  facilities: resortProfileSchema.shape.facilities,
  services: resortProfileSchema.shape.services,
});

export const resortStep3Schema = z.object({
  packages: resortProfileSchema.shape.packages,
});

export const resortStep4Schema = z.object({
  socialLinks: baseProfileSchema.shape.socialLinks,
  gallery: baseProfileSchema.shape.gallery,
});

// Export types
export type MediaFormData = z.infer<typeof mediaSchema>;
export type SocialLinksFormData = z.infer<typeof socialLinksSchema>;
export type LocationFormData = z.infer<typeof locationSchema>;
export type BaseProfileFormData = z.infer<typeof baseProfileSchema>;
export type CertificationFormData = z.infer<typeof certificationSchema>;
export type ServiceFormData = z.infer<typeof serviceSchema>;
export type InstructorProfileFormData = z.infer<typeof instructorProfileSchema>;
export type ResortServiceFormData = z.infer<typeof resortServiceSchema>;
export type PackageFormData = z.infer<typeof packageSchema>;
export type ResortProfileFormData = z.infer<typeof resortProfileSchema>;
