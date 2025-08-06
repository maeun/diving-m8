'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Image, Video, Move } from 'lucide-react';
import { MediaFormData } from '@/lib/validations';
import {
  uploadGalleryImage,
  validateImageFile,
  resizeImage,
} from '@/services/imageService';

interface MediaUploadProps {
  media: MediaFormData[];
  onChange: (media: MediaFormData[]) => void;
  instructorId: string; // Firebase Storage 경로용
  maxItems?: number;
  acceptedTypes?: string[];
  className?: string;
}

export function MediaUpload({
  media,
  onChange,
  maxItems = 10,
  acceptedTypes = ['image/*', 'video/*'],
  className = '',
}: MediaUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    if (media.length + files.length > maxItems) {
      alert(`Maximum ${maxItems} media items allowed`);
      return;
    }

    setUploading(true);

    try {
      const newMediaItems: MediaFormData[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const isVideo = file.type.startsWith('video/');
        const isImage = file.type.startsWith('image/');

        if (!isVideo && !isImage) {
          continue;
        }

        let finalUrl: string;

        if (isImage) {
          // Validate image file
          const validation = validateImageFile(file);
          if (!validation.isValid) {
            alert(`Invalid file ${file.name}: ${validation.error}`);
            continue;
          }

          try {
            // Resize image before upload
            const resizedFile = await resizeImage(file, 800, 600, 0.8);

            // Upload to Firebase Storage
            finalUrl = await uploadGalleryImage(resizedFile, instructorId);
            console.log(`✅ Uploaded ${file.name} to Firebase Storage`);
          } catch (uploadError) {
            console.error('Failed to upload to Firebase Storage:', uploadError);
            // Fallback to object URL for preview
            finalUrl = URL.createObjectURL(file);
            console.log(`⚠️ Using object URL as fallback for ${file.name}`);
          }
        } else {
          // For videos, use object URL (Firebase Storage video upload can be added later)
          finalUrl = URL.createObjectURL(file);
        }

        newMediaItems.push({
          url: finalUrl,
          type: isVideo ? 'video' : 'image',
          caption: '',
          order: media.length + newMediaItems.length,
        });
      }

      onChange([...media, ...newMediaItems]);
    } catch (error) {
      console.error('Error uploading media:', error);
      alert('Error uploading media. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const removeMedia = (index: number) => {
    const newMedia = media.filter((_, i) => i !== index);
    // Reorder remaining items
    const reorderedMedia = newMedia.map((item, i) => ({ ...item, order: i }));
    onChange(reorderedMedia);
  };

  const updateCaption = (index: number, caption: string) => {
    const newMedia = [...media];
    newMedia[index] = { ...newMedia[index], caption };
    onChange(newMedia);
  };

  const moveMedia = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= media.length) return;

    const newMedia = [...media];
    const [movedItem] = newMedia.splice(fromIndex, 1);
    newMedia.splice(toIndex, 0, movedItem);

    // Update order
    const reorderedMedia = newMedia.map((item, i) => ({ ...item, order: i }));
    onChange(reorderedMedia);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <div className="space-y-2">
          <p className="text-lg font-medium">
            Drop files here or click to upload
          </p>
          <p className="text-sm text-gray-500">
            Supports images and videos (max {maxItems} items)
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || media.length >= maxItems}
          >
            {uploading ? 'Uploading...' : 'Choose Files'}
          </Button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Media Grid */}
      {media.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {media.map((item, index) => (
            <Card key={index} className="relative group">
              <CardContent className="p-4">
                {/* Media Preview */}
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3">
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.caption || `Media ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                      controls
                    />
                  )}

                  {/* Media Type Badge */}
                  <Badge
                    variant="secondary"
                    className="absolute top-2 left-2 flex items-center gap-1"
                  >
                    {item.type === 'image' ? (
                      <Image className="h-3 w-3" />
                    ) : (
                      <Video className="h-3 w-3" />
                    )}
                    {item.type}
                  </Badge>

                  {/* Remove Button */}
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeMedia(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Caption Input */}
                <div className="space-y-2">
                  <Label htmlFor={`caption-${index}`} className="text-sm">
                    Caption (optional)
                  </Label>
                  <Input
                    id={`caption-${index}`}
                    value={item.caption || ''}
                    onChange={(e) => updateCaption(index, e.target.value)}
                    placeholder="Add a caption..."
                    className="text-sm"
                  />
                </div>

                {/* Move Controls */}
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-500">
                    Position {index + 1} of {media.length}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => moveMedia(index, index - 1)}
                      disabled={index === 0}
                      className="h-8 w-8 p-0"
                    >
                      <Move className="h-3 w-3 rotate-180" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => moveMedia(index, index + 1)}
                      disabled={index === media.length - 1}
                      className="h-8 w-8 p-0"
                    >
                      <Move className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Media Count */}
      {media.length > 0 && (
        <p className="text-sm text-gray-500 text-center">
          {media.length} of {maxItems} media items
        </p>
      )}
    </div>
  );
}
