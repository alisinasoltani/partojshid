'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { UseFormReturn } from 'react-hook-form';

interface InlineEditProps {
  name: string;
  value: string;
  form: UseFormReturn<any>;
  onSave: (name: string, value: string) => void;
}

export default function InlineEdit({ name, value, form, onSave }: InlineEditProps) {
  const [editing, setEditing] = useState(false);

  const handleBlur = () => {
    setEditing(false);
    const newValue = form.getValues(name);
    if (newValue !== value) {
      onSave(name, newValue);
    }
  };

  if (editing) {
    return (
      <Input
        {...form.register(name)}
        onBlur={handleBlur}
        autoFocus
        className="w-full border-0 p-1 h-fit irsans_med"
      />
    );
  }

  return (
    <span onClick={() => setEditing(true)} className="cursor-pointer hover:bg-gray-100 p-1 irsans_med">
      {value || '—'}
    </span>
  );
}