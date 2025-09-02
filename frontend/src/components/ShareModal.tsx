import React, { useState } from 'react';
import { Note } from '../types/note';
import { X, Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from './Button';

interface ShareModalProps {
  note: Note;
  onClose: () => void;
}

export function ShareModal({ note, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  
  const shareUrl = `${window.location.origin}/share/${note.slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleOpenShare = () => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Share Note</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <h3 className="font-medium text-gray-900 mb-2">{note.title}</h3>
            <p className="text-gray-600 text-sm">
              Share this note with others using the link below. Anyone with this link can view the note.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 bg-transparent border-none text-sm text-gray-700 focus:outline-none"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="p-2"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleOpenShare}
              className="flex-1"
            >
              <ExternalLink className="w-4 h-4" />
              Open Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}