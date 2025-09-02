import uuid
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware

# --- App Initialization ---
app = FastAPI(
    title="Simple Notes API",
    description="A simple API for creating, reading, updating, and deleting notes.",
    version="1.0.0"
)

# --- CORS Middleware ---
# This allows the React frontend (running on a different port) to communicate with the backend.
# You can override allowed origins via env var ALLOWED_ORIGINS (comma-separated)
default_origins = [
    "http://localhost:3000",
    "http://localhost:5173", # Default Vite port
    "http://localhost:5174",
]
env_origins = os.getenv("ALLOWED_ORIGINS", "").strip()
origins = [o.strip() for o in env_origins.split(",") if o.strip()] if env_origins else default_origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- In-Memory Database ---
# For this simple example, we use a dictionary to store notes.
# In a real application, you would use a proper database like PostgreSQL or SQLite.
db = {}

# --- Pydantic Models (Data Validation) ---
class NoteBase(BaseModel):
    title: str
    content: str

class NoteCreate(NoteBase):
    pass

class Note(NoteBase):
    id: str

# --- API Endpoints ---

@app.get("/", tags=["Root"])
def read_root():
    """A simple root endpoint to confirm the API is running."""
    return {"message": "Welcome to the Simple Notes API!"}

@app.get("/health", tags=["Root"])
def health_check():
    """Simple health check endpoint for frontends/readiness probes."""
    return {"status": "ok"}

@app.post("/notes/", response_model=Note, status_code=201, tags=["Notes"])
async def create_note(note: NoteCreate):
    """
    Create a new note.
    - Generates a unique ID for the note.
    - Stores it in the in-memory database.
    - Returns the created note.
    """
    note_id = str(uuid.uuid4())
    new_note = Note(id=note_id, title=note.title, content=note.content)
    db[note_id] = new_note
    return new_note

@app.get("/notes/", response_model=List[Note], tags=["Notes"])
async def get_all_notes():
    """
    Retrieve all notes from the database.
    """
    return list(db.values())

@app.get("/notes/{note_id}", response_model=Note, tags=["Notes"])
async def get_note_by_id(note_id: str):
    """
    Retrieve a single note by its ID.
    - Raises a 404 error if the note is not found.
    """
    if note_id not in db:
        raise HTTPException(status_code=404, detail="Note not found")
    return db[note_id]

@app.put("/notes/{note_id}", response_model=Note, tags=["Notes"])
async def update_note(note_id: str, note_update: NoteCreate):
    """
    Update an existing note's title and content.
    - Raises a 404 error if the note is not found.
    """
    if note_id not in db:
        raise HTTPException(status_code=404, detail="Note not found")
    
    updated_note = Note(id=note_id, title=note_update.title, content=note_update.content)
    db[note_id] = updated_note
    return updated_note

@app.delete("/notes/{note_id}", tags=["Notes"])
async def delete_note(note_id: str):
    """
    Delete a note by its ID.
    - Raises a 404 error if the note is not found.
    - Returns a JSON confirmation on success.
    """
    if note_id not in db:
        raise HTTPException(status_code=404, detail="Note not found")
    del db[note_id]
    return {"deleted": True, "id": note_id}
