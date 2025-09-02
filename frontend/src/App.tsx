import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Note } from './types/note';
import { useNotes } from './hooks/useNotes';
import { Header } from './components/Header';
import { NoteCard } from './components/NoteCard';
import { NoteEditor } from './components/NoteEditor';
import { ShareModal } from './components/ShareModal';
import { SharedNote } from './components/SharedNote';
import { SearchBar } from './components/SearchBar';
import { EmptyState } from './components/EmptyState';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';

function NotesApp() {
  const { notes, loading, error, createNote, updateNote, deleteNote } = useNotes();
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [shareNote, setShareNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [saving, setSaving] = useState(false);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNote = () => {
    setEditingNote(null);
    setShowEditor(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setShowEditor(true);
  };

  const handleSaveNote = async (noteData: Omit<Note, 'id' | 'slug'>) => {
    setSaving(true);
    try {
      if (editingNote && editingNote.id) {
        await updateNote(editingNote.id, noteData);
      } else {
        await createNote(noteData);
      }
      setShowEditor(false);
      setEditingNote(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteNote = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote(id);
    }
  };

  const handleShareNote = (note: Note) => {
    setShareNote(note);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingNote(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreateNote={handleCreateNote} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} />
          </div>
        )}
        
        <div className="mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search notes by title or content..."
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <p className="text-gray-600">Loading notes...</p>
          </div>
        ) : filteredNotes.length === 0 ? (
          searchQuery ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No notes found matching "{searchQuery}"</p>
              <p className="text-gray-500">Try adjusting your search terms or create a new note.</p>
            </div>
          ) : (
            <EmptyState onCreateNote={handleCreateNote} />
          )
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
                onShare={handleShareNote}
              />
            ))}
          </div>
        )}
      </main>

      {showEditor && (
        <NoteEditor
          note={editingNote}
          onSave={handleSaveNote}
          onCancel={handleCloseEditor}
          loading={saving}
        />
      )}

      {shareNote && (
        <ShareModal
          note={shareNote}
          onClose={() => setShareNote(null)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotesApp />} />
        <Route path="/share/:slug" element={<SharedNote />} />
      </Routes>
    </Router>
  );
}

export default App;