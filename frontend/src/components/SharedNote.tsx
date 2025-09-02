import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Note } from '../types/note';
import { NotesAPI } from '../services/api';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { ArrowLeft, FileText } from 'lucide-react';

export function SharedNote() {
  const { slug } = useParams<{ slug: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedNote = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);
        const sharedNote = await NotesAPI.getSharedNote(slug);
        setNote(sharedNote);
      } catch (err) {
        setError('Note not found or no longer available.');
      } finally {
        setLoading(false);
      }
    };

    fetchSharedNote();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Loading shared note...</p>
        </div>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Note Not Found</h1>
          <p className="text-gray-600 mb-6">
            {error || 'The note you\'re looking for doesn\'t exist or has been removed.'}
          </p>
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Notes
          </Link>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              📤 This is a shared note. You're viewing a read-only version.
            </p>
          </div>
        </div>
        
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <header className="p-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {note.title}
            </h1>
          </header>
          
          <div className="p-8">
            <div className="prose prose-gray max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">
                {note.content}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}