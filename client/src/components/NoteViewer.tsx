import { Note } from "@/redux/notesSlice";

interface NoteViewerProps {
  note: Note | null;
}

export default function NoteViewer({ note }: NoteViewerProps) {
  if (!note) return <p>No note selected.</p>;

  return (
    <div className="note-viewer-container flex flex-col h-full space-y-4 bg-blue-100 p-6 rounded-xl shadow-md dark:bg-black">
      {/* Title section */}
      <div className="input-group">
        <div className="relative">
          <p className="text-blue-600 dark:text-blue-400 text-lg font-medium mb-2">
            Title:
          </p>
          <div className="border border-blue-300 dark:border-blue-900 p-4 rounded-md">
            <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
              {note.title}
            </h2>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="input-group">
        <div className="relative flex-grow flex flex-col">
          <p className="text-blue-600 dark:text-blue-400 text-lg font-medium mb-2">
            Content:
          </p>
          <div className="border border-blue-300 dark:border-blue-900 p-4 rounded-md">
            <p className="text-gray-800 dark:text-gray-300 text-lg">{note.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
