import React from 'react';
import { FileText, Plus } from 'lucide-react';
import { Button } from './Button';

interface HeaderProps {
  onCreateNote: () => void;
}

export function Header({ onCreateNote }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Notes</h1>
          </div>
          
          <Button onClick={onCreateNote}>
            <Plus className="w-4 h-4" />
            New Note
          </Button>
        </div>
      </div>
    </header>
  );
}