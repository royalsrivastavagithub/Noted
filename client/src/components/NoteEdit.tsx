import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "../redux/notesSlice";
import { RootState } from "../redux/store";

interface Note {
  _id: string;
  title: string;
  content: string;
}

interface NoteEditProps {
  note: Note;
  setViewState: React.Dispatch<
    React.SetStateAction<"default" | "viewing" | "editing" | "adding">
  >;
}

export default function NoteEdit({ note, setViewState }: NoteEditProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.info.token);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 100) {
      setTitle(e.target.value);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 1000) {
      setContent(e.target.value);
    }
  };

  const handleSave = async () => {
    if (title && content) {
      setIsSaving(true);
      setError("");

      try {
        // Update the note via PUT request
        const response = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/notes/update/${note._id}`,
          {
            title,
            content,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          // Exit editing mode
          setViewState("default");

          // Fetch updated notes and update Redux
          const notesResponse = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/notes`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          dispatch(setNotes(notesResponse.data.notes));
        }
      } catch (err: unknown) {
        setError("Failed to save note. Please try again.");
        if (err instanceof Error) {
          console.error(err.message);
        }
      } finally {
        setIsSaving(false);
      }
    }
  };
  function handleDefault() {
    setViewState("default");
  }
  return (
    <div className="note-edit-container flex flex-col h-full space-y-4 bg-blue-100 p-6 rounded-xl shadow-md dark:bg-black">
      {/* Title input */}
      <div className="input-group">
        <div className="relative">
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Edit note title"
            maxLength={100}
            className="w-full p-3 pr-20 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-black dark:text-white dark:border-blue-900"
          />
          <p className="absolute right-2 bottom-2 text-sm text-blue-600 dark:text-blue-400">
            {title.length}/100
          </p>
        </div>
      </div>

      {/* Content input */}
      <div className="relative flex-grow flex flex-col">
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          placeholder="Edit note content"
          maxLength={1000}
          className="w-full h-full p-3 pr-20 pb-8 border border-blue-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-black dark:text-white dark:border-blue-900"
        />
        <p className="absolute right-2 bottom-2 text-sm text-blue-600 dark:text-blue-400">
          {content.length}/1000
        </p>
      </div>
      <div className="flex gap-4">
        {/* Save button */}
        <button
          
          onClick={handleDefault}
          disabled={isSaving}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 dark:bg-red-800 dark:hover:bg-red-700"
        >
          {"Cancel"}
        </button>
        <button
          onClick={handleSave}
          disabled={!title || !content || isSaving}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-800 dark:hover:bg-blue-700"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
      {/* Error message */}
      {error && (
        <p className="text-red-600 dark:text-red-400 text-sm mt-2">{error}</p>
      )}
    </div>
  );
}
