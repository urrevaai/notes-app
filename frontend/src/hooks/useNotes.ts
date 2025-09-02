import { useState, useEffect } from 'react';
import { Note } from '../types/note';
import { NotesAPI } from '../services/api';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedNotes = await NotesAPI.getNotes();
      setNotes(fetchedNotes);
    } catch (err) {
      setError('Failed to load notes. Make sure the backend server is running.');
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (noteData: Omit<Note, 'id' | 'slug'>) => {
    try {
      const newNote = await NotesAPI.createNote(noteData);
      setNotes(prev => [newNote, ...prev]);
      return newNote;
    } catch (err) {
      setError('Failed to create note');
      throw err;
    }
  };

  const updateNote = async (id: number, noteData: Omit<Note, 'id' | 'slug'>) => {
    try {
      const updatedNote = await NotesAPI.updateNote(id, noteData);
      setNotes(prev => prev.map(note => note.id === id ? updatedNote : note));
      return updatedNote;
    } catch (err) {
      setError('Failed to update note');
      throw err;
    }
  };

  const deleteNote = async (id: number) => {
    try {
      await NotesAPI.deleteNote(id);
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (err) {
      setError('Failed to delete note');
      throw err;
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return {
    notes,
    loading,
    error,
    createNote,
    updateNote,
    deleteNote,
    refetch: fetchNotes,
  };
}