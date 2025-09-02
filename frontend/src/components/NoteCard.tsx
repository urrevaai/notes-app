import React from 'react';
import { Note } from '../types/note';
import { Edit3, Trash2, Share2, ExternalLink } from 'lucide-react';
import { Button } from './Button';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
  onShare: (note: Note) => void;
}

export function NoteCard({ note, onEdit, onDelete, onShare }: NoteCardProps) {
  const truncatedContent = note.content.length > 150 
    ? `${note.content.substring(0, 150)}...` 
    : note.content;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {note.title}
        </h3>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare(note)}
            className="p-2"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(note)}
            className="p-2"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => note.id && onDelete(note.id)}
            className="p-2 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
        {truncatedContent}
      </p>
      
      {note.slug && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400">ID: {note.slug}</span>
          <a
            href={`${window.location.origin}/share/${note.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 text-sm"
          >
            <ExternalLink className="w-3 h-3" />
            Share
          </a>
        </div>
      )}
    </div>
  );
}