import React from 'react';
import { FileText, Plus } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  onCreateNote: () => void;
}

export function EmptyState({ onCreateNote }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <FileText className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No notes yet</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Get started by creating your first note. Capture your thoughts, ideas, and important information.
      </p>
      <Button onClick={onCreateNote}>
        <Plus className="w-4 h-4" />
        Create Your First Note
      </Button>
    </div>
  );
}