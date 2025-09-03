import { Note, APIResponse } from '../types/note';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
export class NotesAPI {
  static async createNote(note: Omit<Note, 'id' | 'slug'>): Promise<Note> {
    const response = await fetch(`${API_BASE}/notes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    if (!response.ok) throw new Error('Failed to create note');
    return response.json();
  }

  static async getNotes(): Promise<Note[]> {
    const response = await fetch(`${API_BASE}/notes/`);
    if (!response.ok) throw new Error('Failed to fetch notes');
    return response.json();
  }

  static async getNote(id: number): Promise<Note> {
    const response = await fetch(`${API_BASE}/notes/${id}`);
    if (!response.ok) throw new Error('Failed to fetch note');
    return response.json();
  }

  static async updateNote(id: number, note: Omit<Note, 'id' | 'slug'>): Promise<Note> {
    const response = await fetch(`${API_BASE}/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    if (!response.ok) throw new Error('Failed to update note');
    return response.json();
  }

  static async deleteNote(id: number): Promise<APIResponse> {
    const response = await fetch(`${API_BASE}/notes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete note');
    return response.json();
  }

  static async getSharedNote(slug: string): Promise<Note> {
    const response = await fetch(`${API_BASE}/share/${slug}`);
    if (!response.ok) throw new Error('Shared note not found');
    return response.json();
  }
}
