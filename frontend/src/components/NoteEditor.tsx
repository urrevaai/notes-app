import React, { useState, useEffect } from 'react';
import { Note } from '../types/note';
import { X, Save } from 'lucide-react';
import { Button } from './Button';
import { useDebounce } from '../hooks/useDebounce';

interface NoteEditorProps {
  note?: Note | null;
  onSave: (noteData: Omit<Note, 'id' | 'slug'>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export function NoteEditor({ note, onSave, onCancel, loading = false }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [hasChanges, setHasChanges] = useState(false);

  const debouncedTitle = useDebounce(title, 500);
  const debouncedContent = useDebounce(content, 500);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  useEffect(() => {
    if (note) {
      setHasChanges(debouncedTitle !== note.title || debouncedContent !== note.content);
    } else {
      setHasChanges(debouncedTitle.trim() !== '' || debouncedContent.trim() !== '');
    }
  }, [debouncedTitle, debouncedContent, note]);

  const handleSave = async () => {
    if (title.trim() === '' || content.trim() === '') return;
    
    try {
      await onSave({ title: title.trim(), content: content.trim() });
      if (!note) {
        setTitle('');
        setContent('');
      }
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {note ? 'Edit Note' : 'Create New Note'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="p-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="flex-1 p-6 overflow-hidden flex flex-col gap-4" onKeyDown={handleKeyDown}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
              autoFocus
            />
          </div>
          
          <div className="flex-1 flex flex-col">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note content here..."
              className="flex-1 min-h-[300px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {hasChanges && (
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                Unsaved changes
              </span>
            )}
            <span className="text-gray-400">Ctrl+S to save</span>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              loading={loading}
              disabled={title.trim() === '' || content.trim() === ''}
            >
              <Save className="w-4 h-4" />
              {note ? 'Update' : 'Create'} Note
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}