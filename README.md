# Notes App

A full-stack notes application built with React (TypeScript) frontend and FastAPI backend. Create, edit, delete, and share notes with a clean and modern interface.

## Features

- 📝 Create, edit, and delete notes
- 🔍 Search notes by title or content
- 🔗 Share notes via unique URLs
- 📱 Responsive design with Tailwind CSS
- ⚡ Fast and lightweight
- 🎨 Modern UI with smooth animations

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **FastAPI** with Python
- **Pydantic** for data validation
- **Uvicorn** as ASGI server
- **CORS** middleware for cross-origin requests

## Project Structure

```
Notes/
├── backend/
│   └── main.py              # FastAPI backend server
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service layer
│   │   ├── types/          # TypeScript type definitions
│   │   └── App.tsx         # Main application component
│   ├── package.json        # Frontend dependencies
│   └── vite.config.ts      # Vite configuration
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Notes
   ```

2. **Set up the Backend**
   ```bash
   # Install Python dependencies
   pip install -r requirements.txt
   
   # Start the backend server
   cd backend
   python main.py
   ```
   The backend will be available at `http://localhost:8000`

3. **Set up the Frontend**
   ```bash
   # Install Node.js dependencies
   cd frontend
   npm install
   
   # Start the development server
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

### API Documentation

Once the backend is running, you can access the interactive API documentation at:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## Usage

1. **Create a Note**: Click the "New Note" button to create a new note
2. **Edit a Note**: Click on any existing note to edit it
3. **Delete a Note**: Click the delete button on a note card
4. **Search Notes**: Use the search bar to find notes by title or content
5. **Share Notes**: Click the share button to get a shareable link

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check
- `GET /notes/` - Get all notes
- `POST /notes/` - Create a new note
- `GET /notes/{note_id}` - Get a specific note
- `PUT /notes/{note_id}` - Update a note
- `DELETE /notes/{note_id}` - Delete a note

## Development

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd backend
python main.py       # Start development server
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Database persistence (PostgreSQL/SQLite)
- [ ] Note categories and tags
- [ ] Rich text editor
- [ ] File attachments
- [ ] Note export/import
- [ ] Dark mode
- [ ] Mobile app
