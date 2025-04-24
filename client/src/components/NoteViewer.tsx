import { Note } from "@/redux/notesSlice";

interface NoteViewerProps {
  note: Note | null;
}

export default function NoteViewer({ note }: NoteViewerProps) {
  if (!note) return <p>No note selected.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
}
