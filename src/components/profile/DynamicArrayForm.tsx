'use client';

import React from 'react';
import { UseFieldArrayReturn, Control, FieldValues } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface DynamicArrayFormProps<T extends FieldValues = any> {
  title: string;
  description?: string;
  fieldArray: UseFieldArrayReturn<T>;
  renderItem: (
    index: number,
    remove: (index: number) => void
  ) => React.ReactNode;
  addButtonText?: string;
  minItems?: number;
  maxItems?: number;
  emptyMessage?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function DynamicArrayForm<T extends FieldValues = any>({
  title,
  description,
  fieldArray,
  renderItem,
  addButtonText = 'Add Item',
  minItems = 0,
  maxItems = 10,
  emptyMessage = 'No items added yet.',
  icon: Icon,
}: DynamicArrayFormProps<T>) {
  const { fields, append, remove } = fieldArray;

  const handleAdd = () => {
    if (fields.length >= maxItems) {
      alert(`Maximum ${maxItems} items allowed`);
      return;
    }
    // Create empty object - the specific structure will be handled by the parent
    append({} as any);
  };

  const handleRemove = (index: number) => {
    if (fields.length <= minItems) {
      alert(`Minimum ${minItems} items required`);
      return;
    }
    remove(index);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5" />}
          {title}
        </CardTitle>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items List */}
        {fields.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>{emptyMessage}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="relative">
                {/* Item Content */}
                <div className="border rounded-lg p-4 space-y-4">
                  {/* Item Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">
                        Item {index + 1}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemove(index)}
                      disabled={fields.length <= minItems}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Item Form */}
                  {renderItem(index, handleRemove)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleAdd}
          disabled={fields.length >= maxItems}
          className="w-full flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {addButtonText}
        </Button>

        {/* Item Count */}
        <div className="flex justify-between text-sm text-gray-500">
          <span>
            {fields.length} of {maxItems} items
          </span>
          {minItems > 0 && <span>Minimum {minItems} required</span>}
        </div>
      </CardContent>
    </Card>
  );
}
